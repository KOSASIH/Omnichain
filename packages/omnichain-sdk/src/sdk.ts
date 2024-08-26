import { Wallet } from './wallet';
import { API } from './api';

export class SDK {
  private wallet: Wallet;
  private api: API;

  constructor(private readonly chainId: string, private readonly nodeUrl: string) {
    this.wallet = new Wallet();
    this.api = new API(nodeUrl);
  }

  async init(): Promise<void> {
    await this.wallet.init();
    await this.api.init();
  }

  async getBalance(address: string): Promise<number> {
    return this.api.getBalance(address);
  }

  async sendTransaction(from: string, to: string, amount: number): Promise<string> {
    const tx = await this.wallet.createTransaction(from, to, amount);
    return this.api.sendTransaction(tx);
  }

  async getTransactionStatus(txId: string): Promise<string> {
    return this.api.getTransactionStatus(txId);
  }

  async getBlockHeight(): Promise<number> {
    return this.api.getBlockHeight();
  }

  async getBlockByHeight(height: number): Promise<any> {
    return this.api.getBlockByHeight(height);
  }

  async getBlockByHash(hash: string): Promise<any> {
    return this.api.getBlockByHash(hash);
  }

  async getTransactionByHash(hash: string): Promise<any> {
    return this.api.getTransactionByHash(hash);
  }

  async getAccountInfo(address: string): Promise<any> {
    return this.api.getAccountInfo(address);
  }

  async getSmartContractCode(contractAddress: string): Promise<string> {
    return this.api.getSmartContractCode(contractAddress);
  }

  async executeSmartContract(contractAddress: string, func: string, args: any[]): Promise<any> {
    return this.api.executeSmartContract(contractAddress, func, args);
  }
}
