const predictionsContractAddress = '0x9051187FBFC41514de990047365CE4Bb3dD7a6c5';
const baseTokenAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

const baseTokenContract = () => {
    const baseTokenAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function balanceOf(address) view returns (uint)",
        "function allowance(address _owner, address spender) external view returns (uint)",
        "function approve(address spender, uint amount) external"
    ];
    return new ethers.Contract(baseTokenAddress, baseTokenAbi, provider);
}

const predictionsContract = () => {
    return new ethers.Contract(predictionsContractAddress, predictionsTokenAbi, provider);
}

const currentBalance = async () => {
    const walletAddress = await detectWallet();
    return BigInt(await baseTokenContract().balanceOf(walletAddress));
}

const currentRoundNumber = async () => {
    return BigInt(await predictionsContract().currentRound());
}

const roundInformation = async (roundNumber) => {
    return await predictionsContract().round(roundNumber);
}

const totalLocked = async (roundNumber) => {
    return BigInt(await predictionsContract().totalLocked(roundNumber));
}

const tokenAllowance = async (contractAddress) => {
    return await baseTokenContract().allowance(selectedAccount, contractAddress);
}

const approveTokenForContract = async () => {
    try {
        pendingTxAlert();
        const amount = BigInt(10 ** 25);
        const tx = await baseTokenContract().connect(await provider.getSigner()).approve(predictionsContractAddress, amount.toString());
        await tx.wait();
        txSubmittedAlert();
    } catch (e) {
        displayAlert(e.data.message, 'error');
    }
}
