import { BankingInfo, IBankingInfo } from './BankingInfo';

export interface IUser {
    username: string;
    password: string;
    info: BankingInfo;
}
export class User implements IUser {
    username: string;
    password: string;
    info: BankingInfo;

    constructor(username: string, password: string, info: IBankingInfo) {
        this.username = username;
        this.password = password;
        this.info = info;
    }
    private static isParentOf(o: object): o is User {
        return (
            'username' in o &&
            'password' in o &&
            'info' in o &&
            BankingInfo.isBankingInfo(<{ info: any }>o)
        );
    }
    static fromObject(o: object) {
        if (this.isParentOf(o)) {
            return new User(
                o.username,
                o.password,
                BankingInfo.fromObject(o.info)
            );
        } else {
            throw new TypeError('Object is not of type User')
        }
    }
}
