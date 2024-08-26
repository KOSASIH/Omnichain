import { OmnichainSDK } from 'omnichain-sdk';

async function deploy(contract: string) {
  const sdk = new OmnichainSDK();
  const contractCode = fs.readFileSync(`contracts/${contract}.sol`, 'utf8');
  const contractBytecode = solidity.compile(contractCode, 'contract');
  const tx = await sdk.deployContract(contractBytecode);
  console.log(`Contract deployed: ${tx.transactionHash}`);
}

export default deploy;
