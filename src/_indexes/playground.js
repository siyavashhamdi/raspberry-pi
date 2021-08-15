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
    
    const initOutput = () => {
        let index = 0;
        let rndValue = 1; //Math.round(Math.random(1) * 10) % 2;

        for(const inp of pin.input)

        setInterval(() => {
            const currPin = pin.output[index];
            

            const currValue = output.readSync(currPin);

            index += 1;
            if (index >= pin.output.length){
                index = 0;
                rndValue = (rndValue + 1) % 2
            }
            
            output.writeSync(rndValue);

            const currentDate = new Date().toISOString();
            console.log(`[${ currentDate }] { currPin: ${ currPin }, currValue: ${ currValue }, rndValue: ${ rndValue } }`);
        }, 10 * 1000);
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
