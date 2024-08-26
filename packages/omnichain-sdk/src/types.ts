export interface Transaction {
  from: string;
  to: string;
  value: number;
  gas: number;
  gasPrice: number;
  nonce: number;
}

export interface Block {
  height: number;
  hash: string;
  transactions: Transaction[];
}

export interface AccountInfo {
  address: string;
  balance: number;
  transactions: Transaction[];
}

export interface SmartContractCode {
  code: string;
}

export interface SmartContractExecutionResult {
  result: any;
  gasUsed: number;
}
