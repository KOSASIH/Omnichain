import { Wallet } from '../src/wallet';

describe('Wallet', () => {
  let wallet: Wallet;

  beforeEach(async () => {
    wallet = new Wallet();
    await wallet.init();
  });

  it('should create transaction', async () => {
    const from = '0x1234567890abcdef';
    const to = '0xfedcba9876543210';
    const amount = 1;
    const tx = await wallet.createTransaction(from, to, amount);
    expect(tx).toBeDefined();
  });

  it('should sign message', async () => {
    const message = 'Hello, world!';
    const signature = await wallet.signMessage(message);
    expect(signature).toBeDefined();
  });

  it('should get account balance', async () => {
    const address = '0x1234567890abcdef';
    const balance = await wallet.getAccountBalance(address);
    expect(balance).toBeGreaterThan(0);
  });
});
