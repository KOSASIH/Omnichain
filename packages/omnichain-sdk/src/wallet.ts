import { ethers } from 'ethers';

export class Wallet {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Signer;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');
    this.signer = this.provider.getSigner();
  }

  async init(): Promise<void> {
    await this.signer.getAddress();
  }

  async createTransaction(from: string, to: string, amount: number): Promise<string> {
    const txCount = await this.provider.getTransactionCount(from);
    const tx = {
      from,
      to,
      value: ethers.utils.parseEther(amount.toString()),
      gas: '20000',
      gasPrice: ethers.utils.parseUnits('20', 'gwei'),
      nonce: txCount,
    };
    return this.signer.signTransaction(tx);
  }

  async signMessage(message: string): Promise<string> {
    return this.signer.signMessage(message);
  }

  async getAccountBalance(address: string): Promise<number> {
    return this.provider.getBalance(address);
  }
}
