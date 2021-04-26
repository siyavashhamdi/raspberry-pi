const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    const serialPort = new Serial({ baudRate: 115200 });

    serialPort.writeWithCr = (cmd) => {
        serialPort.write(`${ cmd }\r`);
        // serialPort.write(`Sent: ${ cmd }\\r`);
    }

    const sendSms = (number, text, isUnicode = false) => {
        const delayMs = 500;

        serialPort.writeWithCr('AT');

        setTimeout(() => {
            serialPort.writeWithCr('AT+CMGF=1');

            setTimeout(() => {
                if (isUnicode)
                    serialPort.writeWithCr('AT+CSCS="HEX"');

                setTimeout(() => {
                    serialPort.writeWithCr('AT+CSMP=49,167,0,8');

                    setTimeout(() => {
                        serialPort.writeWithCr(`AT+CMGS="${ number }"`);

                        setTimeout(() => {
                            serialPort.write(`${ text }${ String.fromCharCode(26) }`);
                        }, delayMs);
                    }, delayMs);
                }, isUnicode ? delayMs : 0);
            }, isUnicode ? delayMs : 0);
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
                    sendSms('09032172257', 'سلام یونیکد', true);
                }, 5000);
                // setCnmi();
            }, 2000);
        });
    });
}

console.log('Serial port started');
bootstrap();
