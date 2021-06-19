const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const pin = {};

    // val: 1 => ON
    pin.rig1and3 = { no: 6, val: 0 };
    pin.rig2 = { no: 5, val: 1 };
    pin.cooler = { no: 13, val: 0 };

    // setTimeout(() => {
    //     const output = new Gpio(pin.rig2.no, 'out');
    //     output.writeSync(pin.rig2.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.rig2.no}, value: ${pin.rig2.val} desc: 'pinRig2' }`);
    // }, 1000);

    // setTimeout(() => {
    //     const output = new Gpio(pin.rig1and3.no, 'out');
    //     output.writeSync(pin.rig1and3.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.rig1and3.no}, value: ${pin.rig1and3.val}, desc: 'pinRig1and3' }`);
    // }, 1000);

    // setTimeout(() => {
    //     pin.rig1and3.val = 1;

    //     const output = new Gpio(pin.rig1and3.no, 'out');
    //     output.writeSync(pin.rig1and3.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.rig1and3.no}, value: ${pin.rig1and3.val}, desc: 'pinRig1and3' }`);
    // }, 10000);

    // setTimeout(() => {
    //     const output = new Gpio(pin.cooler.no, 'out');
    //     output.writeSync(pin.cooler.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.cooler.no}, value: ${pin.cooler.val}, desc: 'pinRigCooler' }`);
    // }, 1000);

    // setTimeout(() => {
    //     pin.cooler.val = 1;

    //     const output = new Gpio(pin.cooler.no, 'out');
    //     output.writeSync(pin.cooler.val);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${pin.cooler.no}, value: ${pin.cooler.val}, desc: 'pinRigCooler' }`);
    // }, 5000);

    const twoHalfHour = 2.5 * 60 * 60 * 1 * 1000;
    const switchCooler = () => {
        pin.cooler.val = pin.cooler.val == 1 ? 0 : 1;

        const output = new Gpio(pin.cooler.no, 'out');
        output.writeSync(pin.cooler.val);

        const currentDate = new Date().toISOString();
        const nextSwitchDate = new Date(new Date().getTime() + twoHalfHour).toISOString();;

        console.log(`[${ currentDate }] { currPin: ${ pin.cooler.no }, value: ${ pin.cooler.val }, desc: 'pinRigCooler', nextSwitch: ${ nextSwitchDate } }`);;
    };

    switchCooler();
    setInterval(switchCooler, twoHalfHour);

    let buzzerVal = 1;
    setTimeout(() => {
        buzzerVal = buzzerVal == 1 ? 0 : 1;

        const output = new Gpio(7, 'out');
        output.writeSync(buzzerVal);

        const currentDate = new Date().toISOString();
        console.log(`[${currentDate}] { currPin: ${7}, value: ${buzzerVal} desc: 'buzzerVal' }`);
    }, 1000);

    const listenToButton = (inputPinNo) => {
        button = new Gpio(inputPinNo, 'in', 'rising');

        button.watch(function(err, value) {
            console.log('Pin#: ' + inputPinNo);
        });
    }

    listenToButton(2);
    listenToButton(3);
    listenToButton(4);
    listenToButton(17);
    listenToButton(27);
    listenToButton(22);
    listenToButton(10);
    listenToButton(9);
}

console.log("Started");
bootstrap();
