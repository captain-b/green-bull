let selectedAccount = '';
const walletAddressLabel = document.getElementById('wallet-address');
const disconnectButton = document.getElementById('wallet-button');
const connectButton = document.getElementById('connect-button');
const installMetamaskButton = document.getElementById('install-metamask-button');
const disconnectMessage = document.getElementById('disconnect-message');
let provider;

if (typeof window.ethereum === 'undefined') {
    metamaskNotInstalled();
} else {
    metamaskIsInstalled();
}

async function connectToMetaMask() {
    try {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setCookie('ethAccount', accounts[0]);
        setAccount(accounts[0]);
        const walletConnectedEvent = new CustomEvent("walletConnected");
        document.dispatchEvent(walletConnectedEvent);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Transaction Failed.',
            text: e.message,
        })
    }
}

function disconnectMetamask() {
    deleteCookie('ethAccount');
    walletAddressLabel.innerText = 'Your wallet is not connected.';
    connectButton.innerText = 'Connect Wallet';
    disconnectButton.innerText = 'Connect Wallet';
    disconnectButton.onclick = connectToMetaMask;
    disconnectButton.className = 'btn btn-dark mb-0 me-2 trapezoid'
    disconnectMessage.hidden = true
    const event = new CustomEvent("walletDisconnected");
    document.dispatchEvent(event);

}

function metamaskNotInstalled() {
    installMetamaskButton.hidden = false;
    disconnectButton.hidden = true;
}

function metamaskIsInstalled() {
    installMetamaskButton.hidden = true;
    disconnectButton.hidden = false;
}

function installMetamask() {
    window.open('https://metamask.io/', '_blank');
}

function setAccount(account) {
    const accountAddress = prettyAddress(account).toLowerCase();
    const shortAddress = prettyShortAddress(account).toLowerCase();
    walletAddressLabel.innerText = accountAddress;
    connectButton.innerText = `Connected ${shortAddress}`;
    disconnectButton.innerText = 'Disconnect';
    disconnectButton.onclick = disconnectMetamask;
    disconnectButton.className = 'btn btn-danger mb-0 me-2 trapezoid'
    selectedAccount = account;
    disconnectMessage.hidden = false;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const walletConnectedEvent = new CustomEvent("walletConnected");
    document.dispatchEvent(walletConnectedEvent);
}

function prettyAddress(address) {
    const addr = address.toString();
    return `${addr.slice(0, 6)}...${addr.toString().slice(addr.length - 6)}`;
}

function prettyShortAddress(address) {
    const addr = address.toString();
    return `${addr.slice(0, 3)}...${addr.toString().slice(addr.length - 4)}`;
}

ethereum.on('accountsChanged', async function (accounts) {
    if (accounts.length === 0) {
        disconnectMetamask()
        return;
    }
    setAccount(accounts[0]);
    await connectToMetaMask();
});