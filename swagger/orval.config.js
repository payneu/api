module.exports = {
  'payneu-api': {
    input: './api-spec.json',
    // output: './api-client/payguppy-api.ts',
    output: {
      target: 'payneu-api.ts',
      client: 'swr',
      httpClient: 'fetch',
      baseUrl: 'http://localhost:3000'
    },
  },
};