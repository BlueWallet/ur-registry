// cbor registry types: https://github.com/BlockchainCommons/Research/blob/master/papers/bcr-2020-006-urtypes.md
// Map<name, tag>

export class RegistryType {
  constructor(private tag: number, private type: string) {}
  getTag = () => this.tag;
  getType = () => this.type;
}

export const RegistryTypes = {
  CRYPTO_HDKEY: new RegistryType(303, 'crypto-hdkey'),
  CRYPTO_KEYPATH: new RegistryType(304, 'crypto-keypath'),
  CRYPTO_COIN_INFO: new RegistryType(305, 'crypto-coin-info'),
  CRYPTO_OUTPUT: new RegistryType(308, 'crypto-output'),
};

