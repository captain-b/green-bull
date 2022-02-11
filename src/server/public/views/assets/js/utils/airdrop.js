const airdropContractAddress = '0x6606Fd74D03ba34896cAF8a66A7E71ea02b2938A';

const airdropContract = () => {
    const airdropAbi = [
        "function claim() external"
    ];
    return new ethers.Contract(airdropContractAddress, airdropAbi, provider);
}

const claimAirdrop = async () => {
    try {
        pendingTxAlert();
        const tx = await airdropContract().connect(await provider.getSigner()).claim();
        await tx.wait();
        txSubmittedAlert();
    } catch (e) {
        displayAlert(e.data.message, 'error');
    }
}