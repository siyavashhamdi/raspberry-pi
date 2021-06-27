const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const pin = {};

    // val: 1 => ON
    pin.rig2 = { no: 6, val: 1 };
    pin.rig2 = { no: 5, val: 1 };
    pin.cooler = { no: 13, val: 1 };

    setTimeout(() => {
        pin.rig2 = { no: 5, val: 0 };

        const output = new Gpio(pin.rig2.no, 'out');
        output.writeSync(pin.rig2.val);

        const currentDate = new Date().toISOString();
        console.log(`[${ currentDate }] { currPin: ${ pin.rig2.no }, value: ${ pin.rig2.val }, desc: 'pinrig2' }`);
    }, 1000);

    setTimeout(() => {
        pin.rig2 = { no: 5, val: 1 };

        const output = new Gpio(pin.rig2.no, 'out');
        output.writeSync(pin.rig2.val);

        const currentDate = new Date().toISOString();
        console.log(`[${ currentDate }] { currPin: ${ pin.rig2.no }, value: ${ pin.rig2.val }, desc: 'pinrig2' }`);
    }, 30000);
}

console.log("Started - Reset Rig 2");
bootstrap();
