import { SDK } from '../src/sdk';
import { Wallet } from '../src/wallet';
import { API } from '../src/api';

describe('SDK', () => {
  let sdk: SDK;
  let wallet: Wallet;
  let api: API;

  beforeEach(async () => {
    wallet = new Wallet();
    api = new API('https://example.com/node');
    sdk = new SDK('chainId', 'https://example.com/node');
    await sdk.init();
  });

  it('should get balance', async () => {
    const address = '0x1234567890abcdef';
    const balance = await sdk.getBalance(address);
    expect(balance).toBeGreaterThan(0);
  });

  it('should send transaction', async () => {
    const from = '0x1234567890abcdef';
    const to = '0xfedcba9876543210';
    const amount = 1;
    const txId = await sdk.sendTransaction(from, to, amount);
    expect(txId).toBeDefined();
  });

  it('should get transaction status', async () => {
    const txId = '0x1234567890abcdef';
    const status = await sdk.getTransactionStatus(txId);
    expect(status).toBe('pending' || 'confirmed' || 'failed');
  });

  it('should get block height', async () => {
    const height = await sdk.getBlockHeight();
    expect(height).toBeGreaterThan(0);
  });

  it('should get block by height', async () => {
    const height = 10;
    const block = await sdk.getBlockByHeight(height);
    expect(block).toBeDefined();
  });

  it('should get block by hash', async () => {
    const hash = '0x1234567890abcdef';
    const block = await sdk.getBlockByHash(hash);
    expect(block).toBeDefined();
  });

  it('should get transaction by hash', async () => {
    const hash = '0x1234567890abcdef';
    const tx = await sdk.getTransactionByHash(hash);
    expect(tx).toBeDefined();
  });

  it('should get account info', async () => {
    const address = '0x1234567890abcdef';
    const info = await sdk.getAccountInfo(address);
    expect(info).toBeDefined();
  });

  it('should get smart contract code', async () => {
    const contractAddress = '0x1234567890abcdef';
    const code = await sdk.getSmartContractCode(contractAddress);
    expect(code).toBeDefined();
  });

  it('should execute smart contract', async () => {
    const contractAddress = '0x1234567890abcdef';
    const func = 'myFunction';
    const args = ['arg1', 'arg2'];
    const result = await sdk.executeSmartContract(contractAddress, func, args);
    expect(result).toBeDefined();
  });
});
