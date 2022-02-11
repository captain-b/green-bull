const airdropContractAddress = '0x6606Fd74D03ba34896cAF8a66A7E71ea02b2938A';

const airdropContract = () => {
    const airdropAbi = [
        "function claim() external"
    ];
    return new ethers.Contract(airdropContractAddress, airdropAbi, provider);
}

const claimAirdrop = async () => {
    try {
        await ethereum.request({method: 'eth_requestAccounts'});
        provider = new ethers.providers.Web3Provider(window.ethereum);
        // alert(accs)
        // // const provider = await detectEthereumProvider();
        // alert(JSON.stringify(await provider.getSigner()))
        pendingTxAlert();
        const tx = await airdropContract().connect(await provider.getSigner()).claim();
        await tx.wait();
        txSubmittedAlert();

        // pendingTxAlert();
        // const tx = await airdropContract().connect(await provider.getSigner()).claim();
        // await tx.wait();
        // txSubmittedAlert();
    } catch (e) {
        // alert(JSON.stringify(e))
        console.log(window.ethereum)
        if (e.data && e.data.message) {
            displayAlert(e.data.message, 'error');
            return;
        }
        displayAlert('There was an unexpected error. Please use MetaMask on a desktop if the issue persists.', 'error');
    }
}