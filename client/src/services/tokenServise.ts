class TokenServise {
    public token: string | null = null;

    constructor() {
        this.token = localStorage.getItem('NewCMS_accessToken') || null;
    }

    private updateInLocalStore(token: string) {
        localStorage.setItem('NewCMS_accessToken', token);
    }

    async setToken(token: string) {
        await this.updateInLocalStore(token);
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    removeToken() {
        this.token = null;
        this.updateInLocalStore('');
    }
}

export const tokenServise = new TokenServise();
