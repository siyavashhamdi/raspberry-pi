const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const pin = {};

    // val: 1 => ON
    pin.rig1and3 = { no: 6, val: 1 };
    pin.rig2 = { no: 5, val: 1 };
    pin.cooler = { no: 13, val: 1 };

    setTimeout(() => {
        pin.rig1and3 = { no: 6, val: 0 };

        const output = new Gpio(pin.rig1and3.no, 'out');
        output.writeSync(pin.rig1and3.val);

        const currentDate = new Date().toISOString();
        console.log(`[${ currentDate }] { currPin: ${ pin.rig1and3.no }, value: ${ pin.rig1and3.val }, desc: 'pinRig1and3' }`);
    }, 1000);

    setTimeout(() => {
        pin.rig1and3 = { no: 6, val: 1 };

        const output = new Gpio(pin.rig1and3.no, 'out');
        output.writeSync(pin.rig1and3.val);

        const currentDate = new Date().toISOString();
        console.log(`[${ currentDate }] { currPin: ${ pin.rig1and3.no }, value: ${ pin.rig1and3.val }, desc: 'pinRig1and3' }`);
    }, 30000);
}

console.log("Started - Reset Rig 1 and 3");
bootstrap();
