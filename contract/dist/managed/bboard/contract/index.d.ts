export interface LedgerType {
    register: (...args: any[]) => any;
    verify: (...args: any[]) => any;
}
export declare const Ledger: LedgerType;
export declare class Contract<T = any> {
    constructor();
    create(...args: any[]): any;
    execute(...args: any[]): any;
    witnesses: any;
    circuits: any;
    provableCircuits: any;
    initialState: any;
}
export declare const BBoardContract: typeof Contract;
export declare const CompiledBBoardContract: {
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
