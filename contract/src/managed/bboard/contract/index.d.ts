// Ledger as a value
export interface LedgerType {
  register: (...args: any[]) => any;
  verify: (...args: any[]) => any;
}
export const Ledger: LedgerType;

// Ledger as a type (for WitnessContext)
export type Ledger = LedgerType;

// Contract class declaration
export declare class Contract<T = any> {
  constructor();
  create(...args: any[]): any;
  execute(...args: any[]): any;
  witnesses: any;
  circuits: any;
  provableCircuits: any;
  initialState: any;
}

export const BBoardContract: typeof Contract;

export const CompiledBBoardContract: {
  Contract: typeof Contract;
  Ledger: LedgerType;
};

declare const _default: {
  Contract: typeof Contract;
  Ledger: LedgerType;
  BBoardContract: typeof Contract;
  CompiledBBoardContract: {
    Contract: typeof Contract;
    Ledger: LedgerType;
  };
};

export default _default;

export interface StateType {
  Active: number;
  Inactive: number;
  Pending: number;
}
export const State: StateType;
