import { deploy } from '../src/commands/deploy';
import { mockSdk } from './mocks/mock_sdk';

jest.mock('../src/sdk', () => mockSdk);

describe('deploy', () => {
  it('should deploy a contract successfully', async () => {
    const contract = 'MyContract';
    const bytecode = '0x1234567890abcdef';
    const txHash = '0x1234567890abcdef';

    mockSdk.deployContract.mockResolvedValue(txHash);

    await deploy(contract, bytecode);

    expect(mockSdk.deployContract).toHaveBeenCalledTimes(1);
    expect(mockSdk.deployContract).toHaveBeenCalledWith(bytecode);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`Contract deployed: ${txHash}`);
  });

  it('should throw an error if the contract deployment fails', async () => {
    const contract = 'MyContract';
    const bytecode = '0x1234567890abcdef';
    const error = new Error('Contract deployment failed');

    mockSdk.deployContract.mockRejectedValue(error);

    await expect(deploy(contract, bytecode)).rejects.toThrowError(error);
  });
});
