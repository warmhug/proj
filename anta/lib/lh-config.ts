
// https://github.com/GoogleChrome/lighthouse/blob/v2.7.0/lighthouse-core/config/default.js
// https://github.com/GoogleChrome/lighthouse/blob/v2.7.0/docs/configuration.md
module.exports = {
  passes: [{
    recordTrace: true,
    pauseAfterLoadMs: 5250,
    networkQuietThresholdMs: 5250,
    cpuQuietThresholdMs: 5250,
    useThrottling: true,
    gatherers: [
      'url',
      'viewport',
      'viewport-dimensions',
      'runtime-exceptions',
      'chrome-console-messages',
      'image-usage',
      'dobetterweb/domstats',
      'dobetterweb/optimized-images',
      'dobetterweb/response-compression',
      'dobetterweb/tags-blocking-first-paint',
    ] as any,
  },
  {
    passName: 'redirectPass',
    useThrottling: false,
    // Just wait for onload
    networkQuietThresholdMs: 0,
    // Speed up the redirect pass by blocking stylesheets, fonts, and images
    blockedUrlPatterns: ['*.css', '*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.ttf', '*.woff', '*.woff2'],
    gatherers: [
      'http-redirect',
      'html-without-javascript',
    ],
  }],
  audits: [
    // 'service-worker', // pwa
    // 'works-offline', // pwa
    'is-on-https', // pwa
    'redirects-http', // pwa
    'errors-in-console', // best-practices
    'first-meaningful-paint', // perf
    'speed-index-metric', // perf
    'screenshot-thumbnails', // perf
    'estimated-input-latency', // perf
    'time-to-first-byte', // perf
    'first-interactive', // perf
    'consistently-interactive', // perf
    'user-timings', // perf
    'critical-request-chains', // perf
    'redirects', // perf
    'mainthread-work-breakdown', // perf
    'bootup-time', // perf
    'byte-efficiency/uses-long-cache-ttl', // perf
    'byte-efficiency/total-byte-weight', // perf
    'byte-efficiency/offscreen-images', // perf
    'byte-efficiency/uses-optimized-images', // perf
    'byte-efficiency/uses-request-compression', // perf
    'byte-efficiency/uses-responsive-images', // perf
    'dobetterweb/dom-size', // perf
    'dobetterweb/link-blocking-first-paint', // perf
    'dobetterweb/script-blocking-first-paint', // perf
  ],
  groups: {
    'perf-metric': {
      title: 'Metrics',
      description: 'These metrics encapsulate your app\'s performance across a number of dimensions.',
    },
    'perf-hint': {
      title: 'Opportunities',
      description: 'These are opportunities to speed up your application by optimizing the following resources.',
    },
    'perf-info': {
      title: 'Diagnostics',
      description: 'More information about the performance of your application.',
    },
  },
  categories: {
    'performance': {
      name: 'Performance',
      description: 'These encapsulate your app\'s current performance and opportunities to improve it.',
      audits: [
        {id: 'first-meaningful-paint', weight: 5, group: 'perf-metric'},
        {id: 'first-interactive', weight: 5, group: 'perf-metric'},
        {id: 'consistently-interactive', weight: 5, group: 'perf-metric'},
        {id: 'speed-index-metric', weight: 1, group: 'perf-metric'},
        {id: 'estimated-input-latency', weight: 1, group: 'perf-metric'},
        {id: 'link-blocking-first-paint', weight: 0, group: 'perf-hint'},
        {id: 'script-blocking-first-paint', weight: 0, group: 'perf-hint'},
        {id: 'uses-responsive-images', weight: 0, group: 'perf-hint'},
        {id: 'offscreen-images', weight: 0, group: 'perf-hint'},
        {id: 'uses-optimized-images', weight: 0, group: 'perf-hint'},
        // {id: 'uses-webp-images', weight: 0, group: 'perf-hint'},
        {id: 'uses-request-compression', weight: 0, group: 'perf-hint'},
        {id: 'time-to-first-byte', weight: 0, group: 'perf-hint'},
        {id: 'redirects', weight: 0, group: 'perf-hint'},
        {id: 'total-byte-weight', weight: 0, group: 'perf-info'},
        {id: 'uses-long-cache-ttl', weight: 0, group: 'perf-info'},
        {id: 'dom-size', weight: 0, group: 'perf-info'},
        {id: 'critical-request-chains', weight: 0, group: 'perf-info'},
        {id: 'user-timings', weight: 0, group: 'perf-info'},
        {id: 'bootup-time', weight: 0, group: 'perf-info'},
        {id: 'screenshot-thumbnails', weight: 0},
        {id: 'mainthread-work-breakdown', weight: 0, group: 'perf-info'},
      ],
    },
  },
};
