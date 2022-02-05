// const predictionsContractAddress = '0xcd1aaA542fbB2a06956F604a79B797BC43132765';
// const predictionsContractAddress = '0x51763d62869594c9CDE3886A0db8A5B9D49B51b9';
const predictionsContractAddress = '0xc4799c4257a7D52Ebb5244a5A2D89BfB3c9618d2';
// const baseTokenAddress = '0x603252fDde67ba039236ac14aE5c70E3c9904D7F';
const baseTokenAddress = '0x11e0E9100DC56D928e92821E5ebD8Fe9fa12BE89';

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
