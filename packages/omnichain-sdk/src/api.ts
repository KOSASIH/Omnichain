import axios, { AxiosInstance } from 'axios';

export class API {
  private axios: AxiosInstance;

  constructor(private readonly nodeUrl: string) {
    this.axios = axios.create({
      baseURL: nodeUrl,
    });
  }

  async init(): Promise<void> {
    // Initialize API connection
  }

  async getBalance(address: string): Promise<number> {
    const response = await this.axios.get(`account/${address}/balance`);
    return response.data.balance;
  }

  async sendTransaction(tx: string): Promise<string> {
    const response = await this.axios.post('transaction', { tx });
    return response.data.txId;
  }

  async getTransactionStatus(txId: string): Promise<string> {
    const response = await this.axios.get(`transaction/${txId}/status`);
    return response.data.status;
  }

  async getBlockHeight(): Promise<number> {
    const response = await this.axios.get('block/height');
    return response.data.height;
  }

  async getBlockByHeight(height: number): Promise<any> {
    const response = await this.axios.get(`block/${height}`);
    return response.data;
  }

  async getBlockByHash(hash: string): Promise<any> {
    const response = await this.axios.get(`block/${hash}`);
    return response.data;
  }

  async getTransactionByHash(hash: string): Promise<any> {
    const response = await this.axios.get(`transaction/${hash}`);
    return response.data;
  }

  async getAccountInfo(address: string): Promise<any> {
    const response = await this.axios.get(`account/${address}/info`);
    return response.data;
  }

  async executeSmartContract(contractAddress: string, func: string, args: any[]): Promise<any> {
    const response = await this.axios.post(`contract/${contractAddress}/execute`, {
      func,
      args,
    });
    return response.data;
  }
}
