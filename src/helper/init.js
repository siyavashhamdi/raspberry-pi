const pin = require('./constant/pin');

const Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

const input = (callback) => {
    for (let i = 0; i < pin.input; i += 1) {
        const currPinIndex = pin.output[i];
        const currBtn = new Gpio(currPinIndex, 'in', 'rising', { debounceTimeout: 100 });

        currBtn.watch((err, value) => {
            if (err) {
                throw err;
            }

            callback(currBtn, i, value);
        });
    }
}

const output = () => {
    const outputVal = [];

    for (let i = 0; i < pin.output.length; i += 1) {
        outputVal[i] = new Gpio(currPin, 'out');
    }

    return outputVal;
}

exports.default = {
    input,
    output,
}
