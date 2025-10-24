module.exports = {
  'payneu-api': {
    input: './api-spec.json',
    // output: './api-client/payguppy-api.ts',
    output: {
      target: 'payneu-api.ts',
      client: 'swr',
      httpClient: 'fetch',
      baseUrl: 'https://api-production-d10d.up.railway.app'
    },
  },
};