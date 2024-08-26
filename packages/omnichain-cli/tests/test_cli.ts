import { Cli } from '../src/cli';
import { mockSdk } from './mocks/mock_sdk';

jest.mock('../src/sdk', () => mockSdk);

describe('Cli', () => {
  let cli: Cli;

  beforeEach(() => {
    cli = new Cli();
  });

  it('should have a version command', () => {
    expect(cli.version).toBeDefined();
  });

  it('should have a deploy command', () => {
    expect(cli.deploy).toBeDefined();
  });

  it('should have a query command', () => {
    expect(cli.query).toBeDefined();
  });

  it('should deploy a contract successfully', async () => {
    const contract = 'MyContract';
    const bytecode = '0x1234567890abcdef';
    const txHash = '0x1234567890abcdef';

    mockSdk.deployContract.mockResolvedValue(txHash);

    await cli.deploy(contract, bytecode);

    expect(mockSdk.deployContract).toHaveBeenCalledTimes(1);
    expect(mockSdk.deployContract).toHaveBeenCalledWith(bytecode);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`Contract deployed: ${txHash}`);
  });

  it('should query a contract successfully', async () => {
    const contract = 'MyContract';
    const functionName = 'myFunction';
    const result = '0x1234567890abcdef';

    mockSdk.queryContract.mockResolvedValue(result);

    await cli.query(contract, functionName);

    expect(mockSdk.queryContract).toHaveBeenCalledTimes(1);
    expect(mockSdk.queryContract).toHaveBeenCalledWith(contract, functionName);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`Query result: ${result}`);
  });
});
