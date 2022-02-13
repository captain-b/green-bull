export type LocalEnv = 'production' | 'local-dev' | 'testnet';

export interface Env {
    prediction: string;
    airdrop: string;
    usdtToken: string;
    gbullToken: string;
    network: any;
}

const getEnv = (): LocalEnv => {
    const localEnv: string = process.env.NODE_ENV!;
    if (localEnv !== 'production' && localEnv !== 'local-dev' && localEnv !== 'testnet') {
        throw new Error('Incorrect env variables.')
    }
    return localEnv;
}

const chain = (): string => {
    const localEnv: LocalEnv = getEnv();

    if (localEnv === 'production') {
        return '0x89';
    }

    if (localEnv === 'local-dev') {
        return '0x539';
    }

    if (localEnv === 'testnet') {
        return '';
    }
    return '';
}

const predictions = (): string => {
    const localEnv: LocalEnv = getEnv();

    if (localEnv === 'production') {
        return '0x9051187FBFC41514de990047365CE4Bb3dD7a6c5';
    }

    if (localEnv === 'local-dev') {
        return '0xf0ffdd92f2fCf7ED95E1386b9aD0B4F1D058cB72';
    }

    if (localEnv === 'testnet') {
        return '';
    }

    return '';
}

const airdrop = (): string => {
    const localEnv: LocalEnv = getEnv();

    if (localEnv === 'production') {
        return '0x6606fd74d03ba34896caf8a66a7e71ea02b2938a';
    }

    if (localEnv === 'local-dev') {
        return '0xca2e648139823E1EC27aE852BFf37B48731B8E17';
    }

    if (localEnv === 'testnet') {
        return '';
    }
    return '';
}

const gbullToken = (): string => {
    const localEnv: LocalEnv = getEnv();

    if (localEnv === 'production') {
        return '0x21ecEa8f7788808848fc61D3FB8897F1a9a00D94';
    }

    if (localEnv === 'local-dev') {
        return '0x76fa58ddBf4AF5c0e8f98b7fD086A9828e223D8E';
    }

    if (localEnv === 'testnet') {
        return '';
    }
    return '';
}

const usdtToken = (): string => {
    const localEnv: LocalEnv = getEnv();

    if (localEnv === 'production') {
        return '0xc2132d05d31c914a87c6611c10748aeb04b58e8f';
    }

    if (localEnv === 'local-dev') {
        return '0x8a668668B545545Ac1E11D29Bf52d66A955DF6a4';
    }

    if (localEnv === 'testnet') {
        return '';
    }
    return '';
}


export const Env: Env = {
    prediction: predictions(),
    airdrop: airdrop(),
    usdtToken: usdtToken(),
    gbullToken: gbullToken(),
    network: {
        chainId: chain()
    }
}