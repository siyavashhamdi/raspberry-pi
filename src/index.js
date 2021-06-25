const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO

    const pin = {};

    // val: 1 => ON
    pin.rig1and3 = { no: 6, val: 0 };
    pin.rig2 = { no: 5, val: 1 };
    pin.cooler = { no: 13, val: 1 };

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

    // let buzzerVal = 1;
    // setTimeout(() => {
    //     buzzerVal = buzzerVal == 1 ? 0 : 1;

    //     const output = new Gpio(7, 'out');
    //     output.writeSync(buzzerVal);

    //     const currentDate = new Date().toISOString();
    //     console.log(`[${currentDate}] { currPin: ${7}, value: ${buzzerVal} desc: 'buzzerVal' }`);
    // }, 1000);

    const tenMins = 10 * 60 * 1000;
    let dtNextSendSms = null;

    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;
    const serialPort = new Serial({ baudRate: 115200 });

    const listenToButton = (inputPinNo) => {
        return; // Ignore it...

        console.log("listen done to btn#: " + inputPinNo);

        button = new Gpio(inputPinNo, 'in', 'rising');

        button.watch(function (err, value) {
            console.log("watch btn#: " + inputPinNo);

            if (dtNextSendSms && new Date < dtNextSendSms) {
                console.log("Date is not reached.");
                return;
            }

            dtNextSendSms = new Date(new Date(new Date().getTime() + tenMins).toISOString());

            console.log('Pin#: ' + inputPinNo + " enabled!");

            serialPort.writeWithCr = (cmd) => {
                serialPort.write(`${ cmd }\r`);
                // serialPort.write(`Sent: ${ cmd }\\r`);
            }

            const sendSms = (number, text) => {
                const delayMs = 500;

                text = text.split("").map(k => k.charCodeAt(0).toString(16).padStart(4, 0)).join("");

                serialPort.writeWithCr('AT');

                setTimeout(() => {
                    serialPort.writeWithCr('AT+CMGF=1');

                    setTimeout(() => {
                        // Set this and save to configs of AT
                        serialPort.writeWithCr('AT+CSCS="HEX"');

                        setTimeout(() => {
                            // Set this and save to configs of AT
                            serialPort.writeWithCr('AT+CSMP=49,167,0,8');

                            setTimeout(() => {
                                serialPort.writeWithCr(`AT+CMGS="${ number }"`);

                                setTimeout(() => {
                                    serialPort.write(`${ text }${ String.fromCharCode(26) }`);
                                }, delayMs);
                            }, delayMs);
                        }, delayMs);
                    }, delayMs);
                }, delayMs);
            };

            const setBaudRate = (baudrate) => {
                serialPort.writeWithCr('AT+IPR?');

                setTimeout(() => {
                    serialPort.writeWithCr(`AT+IPR=${ baudrate }`);

                    setTimeout(() => {
                        serialPort.writeWithCr('AT&W');
                    }, 1000);
                }, 1000);
            }

            const initReadyReceiveSms = () => {
                serialPort.writeWithCr('AT+CMGF=1');

                setTimeout(() => {
                    serialPort.writeWithCr('AT+CMGD=4');

                    setTimeout(() => {
                        serialPort.writeWithCr('AT+CNMI=2,2,0,0,0');

                        setTimeout(() => {
                            serialPort.writeWithCr('AT&W');
                        }, 1000);
                    }, 1000);
                }, 1000);
            }

            const dataReceived = (data) => {
                console.log(`-----------------------\n${ data }\n-----------------------`);
            }

            raspi.init(() => {
                serialPort.open(() => {
                    let delayTimeout;;
                    let buffer = '';

                    serialPort.on('data', (data) => {
                        // const dataStr = data.toString();
                        // const currentDate = new Date().toISOString();

                        // console.log(`[${ currentDate }] { data: ${ dataStr }, data.length: ${ dataStr.length }, splitted: ${ dataStr.split('').map(k => k.charCodeAt()).join('-') } }`);

                        clearTimeout(delayTimeout);
                        buffer += data;

                        delayTimeout = setTimeout(() => {
                            dataReceived(buffer);
                            buffer = '';
                        }, 10);
                    });

                    setInterval(() => {
                        // serialPort.writeWithCr('AT');
                        // serialPort.writeWithCr('AT+CNMI=?');
                    }, 5000);

                    setTimeout(() => {
                        // setBaudRate(0);

                        setTimeout(() => {
                            // initReadyReceiveSms();
                            sendSms('09123242182', 'سنسور حرکت شماره 1 فعال شد!');

                            setTimeout(() => {
                                sendSms('09032172257', 'سنسور حرکت شماره 1 فعال شد!');

                                setTimeout(() => {
                                    sendSms('09129723515', 'سنسور حرکت شماره 1 فعال شد!');
                                }, 5000);
                            }, 5000);
                        }, 5000);
                        // setCnmi();
                    }, 2000);
                });
            });
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
