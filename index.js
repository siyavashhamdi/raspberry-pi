const bootstrap = () => {
    const pin = {
        input: [2, 3, 4, 17, 27, 22, 10, 9],
        output: [11, 5, 6, 13, 19, 26, , 21, 20],
        indicator: [16, 12],
        buzzer: [7],
        key: [8],
        simReset: [18],
    };

    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const initInputs = () => {
        const button = new Gpio(pin.key[0], 'in', 'rising', { debounceTimeout: 1000 });
        const buzzer = new Gpio(pin.buzzer[0], 'out');

        let = buzzerVal = 0;
        button.watch((err, value) => {
            if (err) {
                throw err;
            }

            console.log({ SL: 'btn watch', value });

            buzzerVal += 1;
            buzzer.writeSync(buzzerVal % 2 == 0);
        });

        process.on('SIGINT', value => {
            console.log({ SL: 'onSIGINT', value });
            // button.unexport();
        });
    }

    const initOutput = () => {
        let index = 0;
        setInterval(() => {
            const currPin = pin.indicator[index];
            const indicator = new Gpio(currPin, 'out');

            const currValue = indicator.readSync(currPin);

            index += 1;
            if (index >= pin.indicator.length)
                index = 0;

            const rndValue = Math.round(Math.random(1) * 10) % 2;
            indicator.writeSync(rndValue);

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

    initInputs();
}

console.log("Started");
bootstrap();
