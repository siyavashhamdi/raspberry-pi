const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const pin = {};

    // val: 1 => ON
    pin.rig1and3 = { no: 6, val: 1 };
    pin.rig2 = { no: 5, val: 1 };
    pin.cooler = { no: 13, val: 0 };

    // setTimeout(() => {
    //     const output = new Gpio(pin.rig2.no, 'out');
    //     output.writeSync(pin.rig2.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.rig2.no}, value: ${pin.rig2.val} desc: 'pinRig2' }`);
    // }, 1000);

    setTimeout(() => {
        const output = new Gpio(pin.rig1and3.no, 'out');
        output.writeSync(pin.rig1and3.val);

        const currentDate = new Date().toISOString();
        console.log(`[${currentDate}] { currPin: ${pin.rig1and3.no}, value: ${pin.rig1and3.val}, desc: 'pinRig1and3' }`);
    }, 2000);

    // setTimeout(() => {
    //     const output = new Gpio(pin.cooler.no, 'out');
    //     output.writeSync(pin.cooler.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.cooler.no}, value: ${pin.cooler.val}, desc: 'pinRigCooler' }`);
    // }, 3000);
}

console.log("Started");
bootstrap();
