const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    const serialPort = new Serial({ baudRate: 1200 });

    const sendSms = (number, text) => {
        const delayMs = 500;

        serialPort.write("AT\r");
        console.log("AT\\r sent.");

        setTimeout(() => {
            serialPort.write("AT+CMGF=1\r");
            console.log("AT+CMGF=1\\r sent.");

            setTimeout(() => {
                serialPort.write(`AT+CMGS=\"${number}\"\r`);
                console.log(`AT+CMGS=\\\"${number}\\\"\\r sent`);

                setTimeout(() => {
                    serialPort.write(`${text}${String.fromCharCode(26)}`);
                    console.log(`${text} sent.`);
                }, delayMs);
            }, delayMs);
        }, delayMs);
    };

    raspi.init(() => {
        let bufferOut = [];

        serialPort.open(() => {
            serialPort.on('data', (data) => {
                const dataStr = data.toString();
                const currentDate = new Date().toISOString();

                bufferOut.push(...dataStr);

                console.log(`[${currentDate}] { data: ${dataStr}, data.length: ${dataStr.length}, splitted: ${dataStr.split("").map(k => k.charCodeAt()).join("-")} }`);

                if (bufferOut.includes("\r")) {
                    const newData = bufferOut.join("").replace("\r\n", "");

                    bufferOut = [];
                    console.log(`[${currentDate}] { baudrate: ${serialPort.baudRate}, data: ${data}, newdata: ${newData}, length: ${newData.length} }`);
                }
            });

            // setInterval(() => {
            //     serialPort.write('AT\r');
            //     console.log("AT sent.");
            // }, 5000);

            setTimeout(() => {
                serialPort.write('AT\r');

                setTimeout(() => {
                    serialPort.write('AT+CNMI=2,1,0,1\r');
                }, 2000);
            }, 5000);

            // setTimeout(() => {
            //     sendSms("09032172257", "Hi-S");
            // }, 2000);
        });
    });
}

console.log("Serial port started");
bootstrap();
