// This is a stub to make TypeScript happy until we can properly compile the contract

export interface LedgerType {
  register: (...args: any[]) => any;
  verify: (...args: any[]) => any;
}

export const Ledger: LedgerType = {
  register: () => {},
  verify: () => {},
};

export declare class Contract<T = any> {
  constructor();
  create(...args: any[]): any;
  execute(...args: any[]): any;
  witnesses: any;
  circuits: any;
  provableCircuits: any;
  initialState: any;
}

export const BBoardContract: typeof Contract = Contract;

// Additional exports that might be needed
export const CompiledBBoardContract = {
  Contract,
  Ledger,
};

export default {
  Contract,
  Ledger,
  BBoardContract,
  CompiledBBoardContract,
};
