type LocalEnv = 'production' | 'local-dev' | 'testnet';

interface AppEnv {
    prediction: string;
    airdrop: string;
    usdtToken: string;
    gbullToken: string;
    network: any;
}