export interface IBankingInfo {}
export class BankingInfo implements IBankingInfo {
    /**
     *
     * @param obj object to test
     * @returns whether object tested follows structure of BankingInfo
     */
    static isBankingInfo(obj: any): obj is BankingInfo {
        const sortedObjKeys = Object.keys(obj).sort();
        return Object.keys(new BankingInfo())
            .sort()
            .every((v, i) => sortedObjKeys[i] == v); // tests if the two have the same keys
    }
    static fromObject(obj: any): BankingInfo {
        if (this.isBankingInfo(obj))  {
            return new BankingInfo()
        } else {
            throw new TypeError('Object cannot be converted to Banking Information')
        }
    }
}
