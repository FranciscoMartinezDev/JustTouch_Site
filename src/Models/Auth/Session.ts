export class Session {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn!: number;
    expiresAt!: Date;

    constructor(init?: Partial<Session>) {
        Object.assign(this, init);
    }
}