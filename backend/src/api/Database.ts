import fs from 'fs';
import path from 'path';
import { User } from './User';
export default class Database {
    private static readonly DB_PATH = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'database',
        'db.txt'
    );
    /**
     * loads and caches all information for quick retrieval, slow bootup
     */
    private readonly map = new Map<string, User>();
    hasBeenInstantiatedBefore: boolean = false;
    constructor() {
        if (this.hasBeenInstantiatedBefore) {
            throw new Error('A database may only exist once.');
        }
        this.hasBeenInstantiatedBefore = true;

        const fileText = fs.readFileSync(Database.DB_PATH, 'utf-8');
        this.parseAndAddUserList(fileText);
    }
    private parseAndAddUserList(fileText: string) {
        Object.entries(JSON.parse(fileText)).forEach((key: any, val: any) => {
            if (typeof key !== 'string')
                throw new Error(
                    `Key in parsed db text file "${key}" is not type "string"`
                );
            if (typeof val !== 'object')
                throw new Error(
                    `Value in parsed db text file "${val}" is not type "object"`
                );

            const user = User.fromObject(val);
            this.set(user.username, user);
        });
    }

    private set(username: string, user: User) {
        this.map.set(username, user);
    }
    /**
     * 
     * @param username username to retrieve by
     * @param password password to verify access
     * @param overide override to ignore password in event of admin
     * @returns the User's object
     */
    get(username: string, password: string, overide = false): Readonly<User> {
        if (!this.map.has(username))
            throw new Error(`User with username ${username} does not exist`);
        if (overide) {
            return this.map.get(username)!;
        }
        if (this.map.get(username)!.password !== password) {
            throw new Error(`Invalid password`);
        }
        return this.map.get(username)!;
    }
}
