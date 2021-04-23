const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO
    var LED2 = new Gpio(2, 'in');
    var LED3 = new Gpio(3, 'out');

    let currState = 0;

    setInterval(() => {
        const currentDate = new Date().toISOString();

        currState = (currState + 1) % 2;
        LED3.writeSync(currState);

        const led2 = LED2.readSync();
        const led3 = LED3.readSync();

        console.log(`[${currentDate}] { LED2: ${led2}, LED3: ${led3} }`);
    }, 100);
}

console.log("Started");
bootstrap();
