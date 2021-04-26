const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    const serialPort = new Serial({ baudRate: 1200 });

    serialPort.writeWithCr = (cmd) => {
        serialPort.write(`${ cmd }\r`);
        // serialPort.write(`Sent: ${ cmd }\\r`);
    }

    const sendSms = (number, text) => {
        const delayMs = 500;

        serialPort.writeWithCr('AT');

        setTimeout(() => {
            serialPort.writeWithCr('AT+CMGF=1');

            setTimeout(() => {
                serialPort.writeWithCr(`AT+CMGS="${ number }"`);

                setTimeout(() => {
                    serialPort.write(`${ text }${ String.fromCharCode(26) }`);
                }, delayMs);
            }, delayMs);
        }, delayMs);
    };

    const setBaudRate = (baudrate) => {
        serialPort.writeWithCr('AT+IPR=');

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
            serialPort.writeWithCr('AT+CMGD=,4');

            setTimeout(() => {
                serialPort.writeWithCr('AT+CNMI=2,2,0,0,0');
            }, 2000);
        }, 2000);
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
                }, 1000);
            });

            setInterval(() => {
                // serialPort.writeWithCr('AT');
                // serialPort.writeWithCr('AT+CNMI=?');
            }, 5000);

            setTimeout(() => {
                // initReadyReceiveSms();
                setBaudRate(0);

                setTimeout(() => {
                    // sendSms('09032172257', 'Hi-S');
                }, 5000);
                // setCnmi();
            }, 2000);
        });
    });
}

console.log('Serial port started');
bootstrap();
