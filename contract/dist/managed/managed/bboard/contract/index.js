/**
 * @typedef {Object} LedgerType
 * @property {Function} register
 * @property {Function} verify
 */

/**
 * @type {LedgerType}
 */
export const Ledger = {
  register: () => {},
  verify: () => {},
};

/**
 * @template T
 */
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
};

export default {
  Contract,
  Ledger,
  BBoardContract,
  CompiledBBoardContract,
};

export const State = {
  Active: 0,
  Inactive: 1,
  Pending: 2,
};
