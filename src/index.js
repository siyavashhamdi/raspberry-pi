const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const pinRig2 = 6;
    const pinRig1and3 = 13;
    const pinRigCooler = 5;

    const valRig2 = 0;
    const valRig1and3 = 1;
    const valRigCooler = 1;

    setTimeout(() => {
        const output = new Gpio(pinRig2, 'out');
        output.writeSync(valRig2);

        const currentDate = new Date().toISOString();
        console.log(`[${currentDate}] { currPin: ${pinRig2}, value: ${valRig2} desc: 'pinRig2' }`);
    }, 1000);

    setTimeout(() => {
        const output = new Gpio(pinRig1and3, 'out');
        output.writeSync(valRig1and3);

        const currentDate = new Date().toISOString();
        console.log(`[${currentDate}] { currPin: ${2}, value: ${valRig1and3}, desc: 'pinRig1and3' }`);
    }, 2000);

    setTimeout(() => {
        const output = new Gpio(pinRigCooler, 'out');
        output.writeSync(valRigCooler);

        const currentDate = new Date().toISOString();
        console.log(`[${currentDate}] { currPin: ${3}, value: ${valRigCooler}, desc: 'pinRigCooler' }`);
    }, 3000);
}

console.log("Started");
bootstrap();
