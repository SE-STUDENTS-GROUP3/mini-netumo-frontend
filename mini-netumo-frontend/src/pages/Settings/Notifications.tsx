// src/pages/Settings/Notifications.tsx
import { FiMail, FiSlack, FiBell, FiSave, FiAlertTriangle, FiShield } from 'react-icons/fi'
import { useState } from 'react'
import Button from '@/components/ui/Button'

// Define proper types for our settings
type EmailSettings = {
  enabled: boolean
  address: string
  downtimeAlerts: boolean
  expiryAlerts: boolean
}

type SlackSettings = {
  enabled: boolean
  webhookUrl: string
  channel: string
  downtimeAlerts: boolean
  expiryAlerts: boolean
}

type PushSettings = {
  enabled: boolean
  downtimeCriticalOnly: boolean
}

type AlertThresholds = {
  sslExpiryDays: number
  domainExpiryDays: number
  consecutiveFailures: number
}

type NotificationSettings = {
  email: EmailSettings
  slack: SlackSettings
  push: PushSettings
  alertThresholds: AlertThresholds
}

export default function Notifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      address: 'admin@netumo.com',
      downtimeAlerts: true,
      expiryAlerts: true,
    },
    slack: {
      enabled: false,
      webhookUrl: '',
      channel: '#alerts',
      downtimeAlerts: false,
      expiryAlerts: true,
    },
    push: {
      enabled: true,
      downtimeCriticalOnly: true,
    },
    alertThresholds: {
      sslExpiryDays: 14,
      domainExpiryDays: 30,
      consecutiveFailures: 2,
    },
  })

  // Properly typed toggle handler
  const handleToggle = <K extends keyof NotificationSettings>(
    type: K,
    field: keyof NotificationSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: !prev[type][field],
      },
    }))
  }

  // Properly typed input change handler
  const handleInputChange = <K extends keyof NotificationSettings>(
    type: K,
    field: keyof NotificationSettings[K],
    value: string | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <FiBell className="mr-2" /> Notification Settings
        </h1>
        {/* Updated Button with proper props */}
        <Button variant="primary">
          <div className="flex items-center">
            <FiSave className="mr-2" />
            Save Changes
          </div>
        </Button>
      </div>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center">
          <FiMail className="text-red-500 mr-2" />
          <h2 className="text-lg font-semibold">Email Notifications</h2>
          <label className="ml-auto relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.email.enabled}
              onChange={() => handleToggle('email', 'enabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        {settings.email.enabled && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={settings.email.address}
                onChange={(e) => handleInputChange('email', 'address', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiAlertTriangle className="text-yellow-500 mr-2" />
                <span>Downtime Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.email.downtimeAlerts}
                  onChange={() => handleToggle('email', 'downtimeAlerts')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiShield className="text-purple-500 mr-2" />
                <span>SSL/Domain Expiry Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.email.expiryAlerts}
                  onChange={() => handleToggle('email', 'expiryAlerts')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Slack/Discord Webhook */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center">
          <FiSlack className="text-purple-500 mr-2" />
          <h2 className="text-lg font-semibold">Slack Webhook</h2>
          <label className="ml-auto relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.slack.enabled}
              onChange={() => handleToggle('slack', 'enabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        {settings.slack.enabled && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <input
                type="url"
                placeholder="https://hooks.slack.com/services/..."
                value={settings.slack.webhookUrl}
                onChange={(e) => handleInputChange('slack', 'webhookUrl', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
              <input
                type="text"
                value={settings.slack.channel}
                onChange={(e) => handleInputChange('slack', 'channel', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Downtime Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.slack.downtimeAlerts}
                  onChange={() => handleToggle('slack', 'downtimeAlerts')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Alert Thresholds */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <FiAlertTriangle className="text-yellow-500 mr-2" />
            Alert Thresholds
          </h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SSL Expiry Alert (days in advance)
            </label>
            <input
              type="number"
              value={settings.alertThresholds.sslExpiryDays}
              onChange={(e) =>
                handleInputChange('alertThresholds', 'sslExpiryDays', parseInt(e.target.value) || 0)
              }
              className="w-full px-3 py-2 border rounded-md"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain Expiry Alert (days in advance)
            </label>
            <input
              type="number"
              value={settings.alertThresholds.domainExpiryDays}
              onChange={(e) =>
                handleInputChange(
                  'alertThresholds',
                  'domainExpiryDays',
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border rounded-md"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consecutive Failures Before Alert
            </label>
            <input
              type="number"
              value={settings.alertThresholds.consecutiveFailures}
              onChange={(e) =>
                handleInputChange(
                  'alertThresholds',
                  'consecutiveFailures',
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              max="5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
