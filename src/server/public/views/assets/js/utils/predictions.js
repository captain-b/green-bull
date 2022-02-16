const roundNumberElement = document.getElementById('current-round-label');
const bullRatioElement = document.getElementById('bull-ratio');
const bearRatioElement = document.getElementById('bear-ratio');
const totalLockedElement = document.getElementById('total-locked');
const lockTimestampRoundsElement = document.getElementById('lock-timestamp');
const historyTableElement = document.getElementById('history-table-row');
const tableElement = document.getElementById('table');
const infoElement = document.getElementById('info-element');

let expiry = 0;
let totalBull = BigInt(0);
let totalBear = BigInt(0);
let totalAmount = BigInt(0);

xRow = 4;

async function placePosition(bull) {
    if (BigInt(await tokenAllowance(predictionsContractAddress)) === BigInt(0)) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: `btn btn-success`,
            },
            buttonsStyling: false
        });

        const input = await swalWithBootstrapButtons.fire({
            title:  '<strong>Enable</strong>',
            text: 'You must enable this contract to spend your tokens first.',
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText:
                'Approve USDT',
        });

        if (input.isConfirmed) {
            try {
                await approve();
                txSubmittedAlert();
                await placePosition(bull);
            } catch (e) {
                displayAlert(e.data.message, 'error');
            }
        }

        return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: `btn btn-${bull ? 'success' : 'danger'}`,
        },
        buttonsStyling: false
    });

    const totalBalance = BigInt(await baseTokenContract().balanceOf(selectedAccount));

    const input = await swalWithBootstrapButtons.fire({
        title:  '<strong>Enter Amount:</strong>',
        html:
            `<div class="input-group p-2">Your Balance: ${numberWithCommas(prettyTotalAmount(totalBalance))} USDT
            </div>
            <div class="input-group">
              <input step=".01" inputmode="decimal" id="input-amount" type="number" class="form-control" placeholder="Example: 100.00 USDT">
            </div>`,
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText:
            `Confirm ${bull ? 'Long' : 'Short'} position`,
    });

    if (input.isConfirmed) {
        try {
            bull ? await betBull() : await betBear();
        } catch (e) {
            displayAlert(e.data.message, 'error');
        }
    }
}

function showLoading(show) {
    loadingElement.hidden = !show;
    tableElement.hidden = show;
}

async function approve() {
    try {
        await approveTokenForContract();
    } catch (e) {
        displayAlert(e.data.message, 'error');
    }

}

const loadTradingPage = async () => {
    currentRoundNo = BigInt(await currentRoundNumber());
    roundNumberElement.innerText = currentRoundNo.toString();
    const currentRoundInfo = await roundInformation(currentRoundNo.toString());
    totalAmount = getTotalAmount(currentRoundInfo);
    totalBull = BigInt(currentRoundInfo.bullAmount);
    totalBear = BigInt(currentRoundInfo.bearAmount);
    expiry = currentRoundInfo.lockTimestamp.toString();
    totalLockedElement.innerText = `${prettyTotalAmount(getTotalAmount().toString())} USDT`;
    calculateRewardRatios();
}

function createTable(info) {
    let body = '';

    info.forEach((round) => {
        body += '<tr>';
        body += `${generateRoundNumberRow(round)}
          ${generateLockPriceRow(round)}
          ${generateClosePriceRow(round)}
          ${generatePoolPrizeRow(round)}
          ${generateWinRow(round)}
          ${generatePositionRow(round)}`;
    });

    body += '</tr>';

    return body;
}

function generatePoolPrizeRow(round) {
    return `<td class="align-middle text-center text-sm">
            <p id="pool-${round.roundNumber.toString()}" class="text-xs font-weight-bold mb-0">${round.poolPrize}</p>
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

function generateWinRow(round) {
    const id = `id="win-${round.roundNumber.toString()}"`;
    let win = '';
    if (round.amount !== zero) {
        win = '  <span ${id} class="badge badge-sm bg-gradient-secondary">Entered</span>';
    } else {
        win = '<span ${id} class="badge badge-sm bg-gradient-secondary">Not Entered</span>';
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
        // body += `<td class="text-center text-sm">
        //         <p class="text-xs font-weight-bold mb-0">${round.amount}</p>
        //       </td>`;
        body += `<td class="text-center text-sm">
                    <div class="d-flex align-items-center text-center" style="padding-left: 5%">
                      <p class="text-xs font-weight-bold mb-0">${round.amount}</p>
                    </div>

                  </td>`
    } else {
        const color = round.betPosition.toString() === '1' ? 'danger' : 'success';
        const position = round.betPosition.toString() === '1' ? 'down' : 'up';
        body += `<td class="text-center text-sm">
                    <div class="d-flex align-items-center text-center" style="padding-left: 5%">
                      <button class="btn btn-icon-only btn-rounded btn-outline-${color} mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-${position}" aria-hidden="true"></i></button>
                      <div class="d-flex flex-column">
                        <p class="text-secondary text-xs font-weight-bold mb-0">${round.amount}</p>
                      </div>
                    </div>

                  </td>`
    }

    return body;
}

function prettyNumber(string) {
    return parseFloat(string.toString().replace(/,/g, ''));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTotalAmount() {
    return totalBear + totalBull;
}

function calculateRewardRatios() {
    const minAmount = 9.8;
    const bull = Number(prettyTotalAmount(totalBull));
    const bear = Number(prettyTotalAmount(totalBear));

    if (minAmount >= bear && minAmount >= bull) {
        bullRatioElement.innerText = 'x1';
        bearRatioElement.innerText = 'x1';
        return;
    }

    const total = bull + bear;
    const bullRatio = (total / (9.8 >= bull ? 9.8 : bull));
    const bearRatio = (total / (9.8 >= bear ? 9.8 : bear));

    bullRatioElement.innerText = `x${bullRatio.toFixed(2)}`;
    bearRatioElement.innerText = `x${bearRatio.toFixed(2)}`;
}

const x = setInterval(function() {
    if (expiry === 0) {
        return;
    }
    // Set the date we're counting down to
    const countDownDate = new Date(Number(expiry) * 1000).getTime();
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const diff = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    lockTimestampRoundsElement.innerHTML = minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (diff < 0) {
        // clearInterval(x);
        lockTimestampRoundsElement.innerHTML = "Locked";
    }
}, 1000);

function generateRoundInfoBody(rounds) {
    let innerHtml = '';

    rounds.forEach((round) => {
        const closePrice = Number(round.closePrice) / 10 ** 8;
        innerHtml += `<div>
          <p class="statistics-title">Round: ${round.roundNumber}</p>
          <h3 class="rate-percentage">${closePrice.toString() === '0' ? 'In Progress' : closePrice}</h3>
          <p class="text-danger d-flex"><i class="mdi mdi-menu-down"></i><span>-0.5%</span></p>
        </div>`;
    });

    return innerHtml
}

async function updateBets(msgSender, round, amount) {
    document.getElementById(`pool-${round.toString()}`).innerText = numberWithCommas(prettyTotalAmount(totalBear + totalBull));
    if (msgSender.toLowerCase() === selectedAccount.toLowerCase()) {
        historyTableElement.innerHTML = '';
        loaded = false;
        await loadTradingPage();
        await loadPredictionsTable();
    }
    const totalAmount = BigInt(await totalLocked(round)).toString();
    totalLockedElement.innerText = `${prettyTotalAmount(totalAmount)} USDT`;
    calculateRewardRatios();
}

predictionsContract().on('Claim', ({sender, round}) => {
    if (sender === selectedAccount) {
        document.getElementById(`round-${round.toString()}`)
    }
});

ethereum.on('accountsChanged', async function (acc) {
    console.log(acc)
    // await loadTradingPage();
});

// setTimeout(async () => {
//     await loadTradingPage();
// }, 1000)

const betBull = async () => {
    await placeBet(true);
}

const betBear = async () => {
    await placeBet(false);
}

const placeBet = async (bull) => {
    const inputAmountElement = document.getElementById('input-amount');
    pendingTxAlert();
    let tx;
    const roundNo = BigInt(currentRoundNo).toString();
    const amount = BigInt(Number(inputAmountElement.value) * 10 ** 6).toString();
    try {
        if (bull) {
            tx = await predictionsContract().connect(await provider.getSigner()).betBull(amount, roundNo);
        } else {
            tx = await predictionsContract().connect(await provider.getSigner()).betBear(amount, roundNo);
        }
        await tx.wait();
        txSubmittedAlert();
        inputAmountElement.value = ''
    } catch (e) {
        displayAlert(e.data.message, 'error');
    }
}



$(async () => {
    if (!getCookie('ethAccount').length) {
        showError(true, 'Wallet Not Connected');
    } else {
        await loadPage();
        showError(false);
    }
});

async function loadPage() {
    if (selectedAccount.length) {
        tradeHistoryRowElement.innerHTML = '';
        showLoading(true);
        await loadTradingPage();
        await loadPredictionsTable();
        showLoading(false);


        predictionsContract().on('LockRound', async (currentRound, closePrice) => {
            totalBull = BigInt(0);
            totalBear = BigInt(0);
            loaded = false;
            tradeHistoryRowElement.innerHTML = '';
            try {
                await loadTradingPage();
                await loadPredictionsTable();
            } catch (e) {
                console.log(e)
            }
        });

        predictionsContract().on('BetBull', async (msgSender, round, amount) => {
            totalBull += BigInt(amount);
            await updateBets(msgSender, round, amount);
        });

        predictionsContract().on('BetBear', async (msgSender, round, amount) => {
            totalBear += BigInt(amount);
            await updateBets(msgSender, round, amount);
        });

        return;
    }

    infoElement.hidden = true
}

