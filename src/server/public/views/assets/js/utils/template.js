const displayAlert = (message, type) => {
    const params = {
        position: 'center',
        title: capitalizeString(message),
        showConfirmButton: false,
        timer: 5000
    }

    if (type === 'error') {
        params.icon = 'error'
    }

    if (type === 'timer') {
        params.icon = 'info'
    }

    if (type === 'success') {
        params.icon = 'success'
    }

    Swal.fire(params);
}

const capitalizeString = (message) => {
    return message.charAt(0).toUpperCase() + message.slice(1);
}

const prettyTotalAmount = (totalAmount) => {
    totalAmount = totalAmount.toString();
    const number = (BigInt(totalAmount) / BigInt(10 ** 4)).toString();
    const sliced = number.substring(0, number.length - 2) + '.' + number.substring(-2);
    return Number(sliced).toFixed(2);
}

const pendingTxAlert = () => {
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Your transaction is pending.',
        showConfirmButton: false,
        timer: 5000
    })
}

const txSubmittedAlert = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Transaction successfully submitted.',
        showConfirmButton: false,
        timer: 5000
    })
}