import { Anchor } from 'ual-anchor';
import { Scatter } from 'ual-scatter';

const appName = 'WPS';

export default {
  networks: [{
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    rpcEndpoints: [{
      protocol: 'https',
      host: 'junglessl.atticlab.net',
      port: Number(443),
    }],
  }],
  authenticators: [
    {
      authenticator: Scatter,
      options: {
        appName,
      },
    },
    {
      authenticator: Anchor,
      options: {
        appName,
      },
    },
  ],
  appName,
};
