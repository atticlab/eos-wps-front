import ScatterJS from '@scatterjs/core';

export default {
  eos: ScatterJS.Network.fromJson({
    blockchain: 'eos',
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    host: 'jungle.atticlab.net',
    port: 8888,
    protocol: 'http',
    httpEndpoint: 'http://jungle.atticlab.net:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true,
  }),
  appName: 'WPS',
};
