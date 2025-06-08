export const corsConfig = {
  credentials: true,

  origin: [
    // production
    'https://example.co.tz',
    /\.example\.co.tz$/,

    // local development
    'http://localhost',
    /^(http:\/\/localhost:)/,
  ],

  methods: ['POST', 'GET', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],

  allowedHeaders: [
    'Content-Type',
    'Origin',
    'Authorization',
    'X-Requested-With,',
  ],

  exposedHeaders: [
    'Cache-Control',
    'Content-Language',
    'Content-Type',
    'Expires',
    'Last-Modified',
    'Pragma',
    'Access-Control-Allow-Headers',
  ],

  preflightContinue: false,

  optionsSuccessStatus: 204,

  maxAge: 60 * 60 * 24,
};
