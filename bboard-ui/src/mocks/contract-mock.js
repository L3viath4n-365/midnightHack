// Comprehensive mock for the contract
export const State = {
  Active: 0,
  Inactive: 1,
  Pending: 2,
};

export const Ledger = {
  register: () => {},
  verify: () => {},
};

export class Contract {
  constructor() {}
  create() {}
  execute() {}
  witnesses() {}
  circuits() {}
  provableCircuits() {}
  initialState() {}
}

export const BBoardContract = Contract;

export const CompiledBBoardContract = {
  Contract,
  Ledger,
  State,
};

export const BBoardDerivedState = {};

export const DeployedBBoardAPI = {};

export default {
  Contract,
  Ledger,
  State,
  BBoardContract,
  CompiledBBoardContract,
  BBoardDerivedState,
  DeployedBBoardAPI,
};
