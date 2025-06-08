// domain-info.processor.ts
import { Process, Processor, InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainInfo } from '../entities/domain-info.entity';
import { Target } from '../entities/target.entity';
import { Job, Queue } from 'bull';
import * as tls from 'tls';
import { URL } from 'url';
import { DOMAIN_INFO_JOB, MONITOR_QUEUE } from 'src/modules/constants/queue';

export async function fetchDomainInfoFromUrl(rawUrl: string) {
  const { hostname } = new URL(rawUrl);

  const sslExpiryDate: Date | null = await new Promise((resolve) => {
    const socket = tls.connect(443, hostname, { servername: hostname }, () => {
      const cert = socket.getPeerCertificate();
      if (cert && cert.valid_to) {
        resolve(new Date(cert.valid_to));
      } else {
        resolve(null);
      }
      socket.end();
    });

    socket.on('error', () => resolve(null));
  });

  let domainExpiryDate: Date | null = null;
  let domainName = '';
  let registrantName = '';
  let domainStatus = '';
  let registrarUrl = '';
  let domainId = '';

  try {
    const whois = (await import('whois-json')) as unknown as (
      domain: string,
    ) => Promise<any>;

    const whoisData = await whois(hostname);

    console.log(`WHOIS raw data for ${hostname}:\n`, whoisData);

    // Normalize expiry
    const expiry =
      whoisData['Registry Expiry Date'] ||
      whoisData['registrarRegistrationExpirationDate'] ||
      whoisData['Expiry Date'] ||
      whoisData['expires'] ||
      whoisData['expire']; // for .tz domains

    if (expiry) {
      const safeExpiry: string | number | Date =
        typeof expiry === 'string' ||
        typeof expiry === 'number' ||
        expiry instanceof Date
          ? expiry
          : String(expiry);
      const parsed = new Date(safeExpiry);
      if (!isNaN(parsed.getTime())) {
        domainExpiryDate = parsed;
      }
    }

    // Normalize other fields
    domainName = whoisData['domainName'] || whoisData['domain'] || '';

    registrantName =
      whoisData['Registrant Name'] ||
      whoisData['registrantName'] ||
      whoisData['registrant'] ||
      '';

    domainStatus =
      whoisData['Domain Status'] ||
      whoisData['domainStatus'] ||
      whoisData['error'] ||
      '';

    registrarUrl =
      whoisData['Registrar URL'] ||
      whoisData['registrarUrl'] ||
      whoisData['registrar'] ||
      '';

    domainId = whoisData['Domain ID'] || whoisData['registryDomainId'] || '';
  } catch (error: any) {
    console.error(`WHOIS lookup failed for ${hostname}: ${error.message}`);
  }

  return {
    sslExpiryDate,
    domainExpiryDate,
    domainName,
    registrantName,
    domainStatus,
    registrarUrl,
    domainId,
  };
}

@Injectable()
@Processor(MONITOR_QUEUE)
export class DomainInfoProcessor {
  private readonly logger = new Logger(DomainInfoProcessor.name);

  constructor(
    @InjectRepository(Target) private targetRepo: Repository<Target>,
    @InjectRepository(DomainInfo)
    private domainInfoRepo: Repository<DomainInfo>,
    @InjectQueue(MONITOR_QUEUE) private readonly domainInfoQueue: Queue,
  ) {}

  onModuleInit() {
    void this.domainInfoQueue.add(DOMAIN_INFO_JOB.FETCH_AND_SAVE_RETRY, null, {
      jobId: DOMAIN_INFO_JOB.FETCH_AND_SAVE_RETRY,
      repeat: { every: 5 * 60 * 1000 },
    });
  }

  async processDomainInfo(data: Target) {
    this.logger.log(`Process domain info: ${JSON.stringify(data)}`);
    await this.domainInfoQueue.add(DOMAIN_INFO_JOB.FETCH_AND_SAVE, data);
  }

  @Process(DOMAIN_INFO_JOB.FETCH_AND_SAVE)
  async fetchDomainInfo(job: Job<Target>) {
    const target = Object.assign(new Target(), job.data);

    try {
      const info = await fetchDomainInfoFromUrl(target.url);

      const daysToSslExpiry = info.sslExpiryDate
        ? Math.floor(
            (info.sslExpiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
          )
        : undefined;

      const daysToDomainExpiry = info.domainExpiryDate
        ? Math.floor(
            (info.domainExpiryDate.getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          )
        : undefined;

      await this.domainInfoRepo.save({
        target: { id: target.id },
        sslExpiryDate: info.sslExpiryDate ?? undefined,
        domainExpiryDate: info.domainExpiryDate ?? undefined,
        daysToSslExpiry,
        daysToDomainExpiry,
        domainName: info.domainName,
        registrantName: info.registrantName,
        domainStatus: info.domainStatus,
        registrarUrl: info.registrarUrl,
        domainId: info.domainId,
      });

      target.domainInfoFound = true;
      await this.targetRepo.save(target);

      this.logger.verbose(`Saved domain info for ${target.url}`);
    } catch (error: any) {
      this.logger.error(`Failed for ${target.url}: ${error.message}`);
    }
  }

  @Process(DOMAIN_INFO_JOB.FETCH_AND_SAVE_RETRY)
  async retryFetchDomainInfo() {
    const targets = await this.targetRepo.find({
      where: { isActive: true, domainInfoFound: false },
    });

    for (const target of targets) {
      try {
        const info = await fetchDomainInfoFromUrl(target.url);

        const daysToSslExpiry = info.sslExpiryDate
          ? Math.floor(
              (info.sslExpiryDate.getTime() - Date.now()) /
                (1000 * 60 * 60 * 24),
            )
          : undefined;

        const daysToDomainExpiry = info.domainExpiryDate
          ? Math.floor(
              (info.domainExpiryDate.getTime() - Date.now()) /
                (1000 * 60 * 60 * 24),
            )
          : undefined;

        await this.domainInfoRepo.save({
          target: { id: target.id },
          sslExpiryDate: info.sslExpiryDate ?? undefined,
          domainExpiryDate: info.domainExpiryDate ?? undefined,
          daysToSslExpiry,
          daysToDomainExpiry,
          domainName: info.domainName,
          registrantName: info.registrantName,
          domainStatus: info.domainStatus,
          registrarUrl: info.registrarUrl,
          domainId: info.domainId,
        });

        target.domainInfoFound = true;
        await this.targetRepo.save(target);

        this.logger.verbose(` Saved domain info for ${target.url}`);
      } catch (error: any) {
        this.logger.error(`Failed for ${target.url}: ${error.message}`);
      }
    }
  }
}
