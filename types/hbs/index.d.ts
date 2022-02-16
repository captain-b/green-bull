type Template = {
    chainId: string;
    title: string;
    html: Buffer;
    header?: Buffer;
    contracts?: Contract;
}

type Contract = {
    airdrop?: string;
    prediction?: string;
    usdt?: string;
    gbull?: string;
}