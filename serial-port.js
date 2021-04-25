const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    const sendSms = (number, text) => {
        const delayMs = 500;

        serial.write("AT\r");
        console.log("AT\\r sent.");

        setTimeout(() => {
            serial.write("AT+CMGF=1\r");
            console.log("AT+CMGF=1\\r sent.");

            setTimeout(() => {
                serial.write(`AT+CMGS=\"${number}\"\r`);
                console.log(`AT+CMGS=\\\"${number}\\\"\\r sent`);

                setTimeout(() => {
                    serial.write(`${text}${String.fromCharCode(26)}`);
                    console.log(`${text} sent.`);
                }, delayMs);
            }, delayMs);
        }, delayMs);
    };

    raspi.init(() => {
        const serial = new Serial({ baudRate: 1200 });
        let bufferOut = [];

        serial.open(() => {
            serial.on('data', (data) => {
                const dataStr = data.toString();
                const currentDate = new Date().toISOString();

                bufferOut.push(...dataStr);

                console.log(`[${currentDate}] { data: ${dataStr}, data.length: ${dataStr.length}, splitted: ${dataStr.split("").map(k => k.charCodeAt()).join("-")} }`);

                if (bufferOut.includes("\r")) {
                    const newData = bufferOut.join("").replace("\r\n", "");

                    bufferOut = [];
                    console.log(`[${currentDate}] { baudrate: ${serial.baudRate}, data: ${data}, newdata: ${newData}, length: ${newData.length} }`);
                }
            });
        });

        // setInterval(() => {
        //     serial.write('AT\r');
        //     console.log("AT sent.");
        // }, 5000);

        setTimeout(() => {
            sendSms("09032172257", "Hi-S");
        });
    });
}

console.log("Serial port started");
bootstrap();
