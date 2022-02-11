const loadingElement = document.getElementById('loading');
const tableBodyElement = document.getElementById('table-body');
const tradeHistoryRowElement = document.getElementById('history-table-row');
const loadMoreElement = document.getElementById('load-more-button');


const zero = '0.00';
let totalRows = 5;
let currentRoundNo = BigInt(0);
let xRow = 10;
let loaded = false;

function checkNetwork() {
    if (window.ethereum.chainId === '0x89') {
        return false;
    }
    return true
}

// ethereum.on('connect', async (tst, tst2) => {
//     const provider = await detectEthereumProvider();
//     const tst3 = await provider.ethereum.request({ method: 'eth_requestAccounts' });
//     // const chainId = await provider.request({
//     //     method: 'eth_chainId'
//     // });
//     // alert(JSON.stringify(tst3))
// })

setInterval( async() => {
    if (getCookie('ethAccount').length) {
        const provider = await detectEthereumProvider();
        const chainId = await provider.request({
            method: 'eth_chainId'
        });

        window.ethereum.chainId = chainId;
        // alert('tst' + JSON.stringify(provider))

        if (chainId === '0x89') {
            showError(false);
            return;
        }
        await checkAccount();
    }
}, 1000);

async function checkAccount() {
    const walletNotConnected = 'Wallet not connected.';
    const wrongNetwork = 'Please select the Polygon network.'
    if (getCookie('ethAccount').length) {
        if (checkNetwork()) {
            showError(true, wrongNetwork);
            return;
        }
        provider = new ethers.providers.Web3Provider(window.ethereum);
        showError(false);
        historyTableElement.innerHTML = '';
        loaded = false;
        await loadPage();
    } else {
        showError(true, walletNotConnected);
    }
}

function showError(connected, message) {
    if (message) {
        document.getElementById('warning-message').innerText = message;
    }
    if (document.getElementById('info-element')) {
        document.getElementById('info-element').hidden = connected;
    }
    document.getElementById('wallet-not-connected-row').hidden = !connected;
    document.getElementById('history-row').hidden = connected;
}

async function loadTable() {
    loadMoreElement.innerText = 'Loading';
    loadMoreElement.disabled = true;
    try {
        await loadPredictionsTable();
    } catch (e) {
        displayAlert(e.data.message ?? 'Unknown error', 'error');
    }
    loadMoreElement.innerText = 'Load More';
    loadMoreElement.disabled = false;
}

async function loadPredictionsTable() {
    if (!loaded) {
        currentRoundNo = BigInt(await currentRoundNumber()).toString();
        loaded = true;
    } else {
        currentRoundNo = BigInt(currentRoundNo) - BigInt(xRow);
    }

    if (BigInt(xRow) > BigInt(currentRoundNo)) {
        loadMoreElement.hidden = true;
    }

    await fetchPredictionHistory(currentRoundNo > BigInt(xRow) ?
            BigInt(currentRoundNo) - BigInt(xRow) : 0,
        currentRoundNo.toString()
    );
}

async function loadPredictionHistoryTable() {
    loading(true);
    await loadTable();
    loading(false);
}

async function fetchPredictionHistory(a, b) {
    if (currentRoundNo.toString() === '0') {
        tableBodyElement.hidden = false;
        noTransactions(false);
        return;
    }

    for (let i = b; i > a; i--) {
        const round = await roundInformation(BigInt(i).toString());
        let roundInfo = await generateRoundInfo(round, i);

        let body = '<tr>';
        body += generateRoundNumberRow(roundInfo);
        body += generateWinRow(roundInfo);
        body += generateLockPriceRow(roundInfo);
        body += generateClosePriceRow(roundInfo);
        body += generatePoolPrizeRow(roundInfo);
        body += generatePositionRow(roundInfo);

        body += '</tr>'
        tradeHistoryRowElement.innerHTML += body;
    }
}

async function generateRoundInfo(roundInfo, i) {
    const betInfo = await predictionsContract().roundInfo(i, selectedAccount);

    const closePrice = BigInt(roundInfo.closePrice).toString();
    const lockPrice = BigInt(roundInfo.lockPrice).toString();
    const prettyClosePrice = numberWithCommas((Number(closePrice.slice(0, 7)) / 100).toFixed(2));
    const prettyLockPrice = numberWithCommas((Number(lockPrice.slice(0, 7)) / 100).toFixed(2));

    roundInfo.roundNumber = i.toString();
    roundInfo.amount = prettyTotalAmount(BigInt(betInfo.amount));
    roundInfo.betPosition = betInfo.position;
    roundInfo.claimed = betInfo.claimed;
    roundInfo.poolPrize = prettyTotalAmount(BigInt(roundInfo.bearAmount) + BigInt(roundInfo.bullAmount));
    roundInfo.bearAmount = prettyTotalAmount(BigInt(roundInfo.bearAmount));
    roundInfo.bullAmount = prettyTotalAmount(BigInt(roundInfo.bullAmount));
    roundInfo.closePrice = prettyClosePrice;
    roundInfo.lockPrice = prettyLockPrice;
    roundInfo.startTimestamp = BigInt(roundInfo.startTimestamp);
    return roundInfo;
}

function prettyNumber(string) {
    return parseFloat(string.toString().replace(/,/g, ''));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function loading(on) {
    loadingElement.hidden = !on;
    tableBodyElement.hidden = on;
}

function noTransactions(show) {
    document.getElementById('history-table').hidden = !show;
    document.getElementById('not-found-box').hidden = show;
}

function generatePoolPrizeRow(round) {
    return `<td class="align-middle text-center text-sm">
            <p id="pool-${round.roundNumber}" class="text-xs font-weight-bold mb-0">${numberWithCommas(round.poolPrize)}</p>
          </td>`;
}

function generateClosePriceRow(round) {

    return `<td class="align-middle text-center text-sm">
            <p class="text-xs font-weight-bold mb-0">${round.closePrice === zero ? (round.lockPrice === zero ? 'Not Closed' : 'In Progress') : round.closePrice}</p>
          </td>`;
}

function generateLockPriceRow(round) {
    return `<td>
            <p class="text-xs font-weight-bold mb-0">${round.lockPrice === zero ? 'Not Started' : round.lockPrice}</p>
          </td>`;
}

function generateRoundNumberRow(round) {
    return `<td>
            <div class="d-flex px-2 py-1">
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">${round.roundNumber}</h6>
              </div>
            </div>
          </td>`;
}

const claim = async (round) => {
    try {
        pendingTxAlert();
        const tx = await predictionsContract().connect(await provider.getSigner()).claim(round);
        await tx.wait();
        txSubmittedAlert();
    } catch (e) {
        displayAlert(e.data.message, 'error');
    }
}

function generateWinRow(round) {
    const id = `id="win-${round.roundNumber.toString()}"`;
    let win = '';
    if (round.amount !== zero) {
        win = `<span ${id} class="badge badge-sm bg-gradient-secondary">Entered</span>`;
    } else {
        win = `<span ${id} class="badge badge-sm bg-gradient-secondary">Not Entered</span>`;
    }

    if (round.lockPrice !== zero && round.closePrice !== zero) {
        const close = prettyNumber(round.closePrice);
        const lock = prettyNumber(round.lockPrice);

        if ((round.betPosition.toString() === '0' && close > lock && round.amount !== zero) || (round.betPosition.toString() === '1' && close < lock && round.amount !== zero) || (close !== 0 && close === lock)) {
            win = `<span ${id} onclick="claim(${BigInt(round.roundNumber)})" class="btn badge badge-sm bg-gradient-success">Claim</span>`;
        } else {
            if (round.amount !== zero) {
                win = '<span ${id} class="badge badge-sm bg-gradient-danger">Lost</span>';
            }
        }
    }

    if (round.amount === zero && round.closePrice === zero && round.lockPrice !== zero) {
        win = `<span ${id} class="badge badge-sm bg-gradient-secondary">Game In Progress</span>`;
    }

    if (round.closePrice === zero && round.lockPrice === zero) {
        win = `<span ${id} class="badge badge-sm bg-gradient-secondary">Starting Soon</span>`;
    }

    if (round.claimed) {
        win = `<span ${id} class="badge badge-sm bg-gradient-success">Won</span>`;
    }

    return `<td class="align-middle text-center text-sm">${win}</td>`;
}


function generatePositionRow(round) {
    let body = '';
    if (round.amount === zero) {
        body += `<td>
                <p class="text-xs font-weight-bold mb-0">${round.amount}</p>
              </td>`;
    } else {
        const color = round.betPosition.toString() === '1' ? 'danger' : 'success';
        const position = round.betPosition.toString() === '1' ? 'down' : 'up';
        body += `<td class="align-middle text-center">
            <div class="d-flex align-items-center">
              <button class="btn btn-icon-only btn-rounded btn-outline-${color} mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-${position}" aria-hidden="true"></i></button>
              <div class="d-flex flex-column">
                <p class="text-secondary text-xs font-weight-bold mb-0">${round.amount}</p>
              </div>
            </div>

          </td>`
    }

    return body;
}

ethereum.on('chainChanged', async (chainId, other) => {
    await checkAccount();
});

predictionsContract().on('Claim', async (sender, round, amount) => {
    if (sender.toLowerCase() === selectedAccount.toLowerCase()) {
        document.getElementById(`win-${round.toString()}`).innerText = 'WON';
    }
});

// setTimeout(async () => {
//     // await loadPredictionHistoryTable();
//     // await checkAccount();
//     // alert(window.ethereum.networkVersion)
//     if (window.ethereum.chainId) {
//         alert(window.ethereum.chainId)
//     } else {
//         alert('null')
//     }
//     alert(JSON.stringify(window.web3))
//     console.log(window.ethereum)
// }, 2000);