const bootstrap = () => {
    const pin = {
        input: [2, 3, 4, 17, 27, 22, 10, 9],
        output: [11, 5, 6, 13, 19, 26, 21, 20],
        indicator: [16, 12],
        buzzer: [7],
        key: [8],
        simReset: [18],
    };

    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const initInputs = () => {
        const inputFire = (index, value) => {
            console.log({ SL: 'btn-watch', index, value });
        }

        for (let i = 0; i < pin.output.length; i += 1) {
            const currPinIndex = pin.output[i];
            const currBtn = new Gpio(currPinIndex, 'in', 'rising', { debounceTimeout: 100 });

            currBtn.watch((err, value) => {
                if (err) {
                    throw err;
                }

                inputFire(i, value);
            });

            console.log({ SL: "input-watch", num: i });
        }

        process.on('SIGINT', value => {
            console.log({ SL: 'onSIGINT', value });
            // button.unexport();
        });
    }

    const initOutput = () => {
        let index = 0;
        setInterval(() => {
            const currPin = pin.output[index];
            const output = new Gpio(currPin, 'out');

            const currValue = output.readSync(currPin);

            index += 1;
            if (index >= pin.output.length)
                index = 0;

            const rndValue = Math.round(Math.random(1) * 10) % 2;
            output.writeSync(rndValue);

            const currentDate = new Date().toISOString();
            console.log(`[${ currentDate }] { currPin: ${ currPin }, currValue: ${ currValue }, rndValue: ${ rndValue } }`);
        }, 1000);
    }

    const initSim = () => {
        let simResetVal = 0;
        setInterval(() => {
            // const simReset = new Gpio(pin.simReset[0], 'out');

            // simReset.writeSync((simResetVal + 1) % 2);

            // const currentDate = new Date().toISOString();
            // console.log(`[${ currentDate }] { simReset: done }`);
        }, 10000);
    }

    initOutput();
}

console.log("Started");
bootstrap();
