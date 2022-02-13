const airdropContractAddress = '0x6606Fd74D03ba34896cAF8a66A7E71ea02b2938A';

const airdropContract = () => {
    const airdropAbi = [
        "function claim() external"
    ];
    return new ethers.Contract(airdropContractAddress, airdropAbi, provider);
}

const claimAirdrop = async () => {
    try {
        if (!window.ethereum.chainId) {
            await ethereum.request({method: 'eth_requestAccounts'});
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }

        pendingTxAlert();
        const tx = await airdropContract().connect(await provider.getSigner()).claim();
        await tx.wait();
        txSubmittedAlert();
    } catch (e) {
        if ((e.data && e.data.message) || e.message) {
            const errorMessage = e.message.includes('execution reverted') ? e.message : e.data.message;
            displayAlert(errorMessage, 'error');

            return;
        }
        displayAlert('There was an unexpected error. Please use MetaMask on a desktop if the issue persists.', 'error');
    }
}