const bootstrap = () => {
    const raspi = require("raspi");
    const Serial = require("raspi-serial").Serial;

    const serialPort = new Serial({ baudRate: 1200 });

    serialPort.writeWithCr = (cmd) => {
        serialPort.write(`${cmd}\r`);
        serialPort.write(`Sent: ${cmd}\\r`);
    }

    const sendSms = (number, text) => {
        const delayMs = 500;

        serialPort.writeWithCr("AT");

        setTimeout(() => {
            serialPort.writeWithCr("AT+CMGF=1");

            setTimeout(() => {
                serialPort.writeWithCr(`AT+CMGS=\"${number}\"`);

                setTimeout(() => {
                    serialPort.write(`${text}${String.fromCharCode(26)}`);
                }, delayMs);
            }, delayMs);
        }, delayMs);
    };

    const flightReset = () => {
        serialPort.writeWithCr("AT+CFUN=0");

        setTimeout(() => {
            serialPort.writeWithCr("AT+CFUN=1");
        }, 2000);
    }

    const setCnmi = () => {
        serialPort.writeWithCr("AT");

        setTimeout(() => {
            serialPort.writeWithCr("AT+CMGD=\"DEL ALL\"");
        }, 2000);
    }

    raspi.init(() => {
        serialPort.open(() => {
            serialPort.on("data", (data) => {
                const dataStr = data.toString();
                const currentDate = new Date().toISOString();

                console.log(`[${currentDate}] { data: ${dataStr}, data.length: ${dataStr.length}, splitted: ${dataStr.split("").map(k => k.charCodeAt()).join("-")} }`);
            });

            // setInterval(() => {
            //     serialPort.writeWithCr("AT");
            // }, 5000);

            setTimeout(() => {
                // setCnmi();
                // flightReset();
            }, 3000);

            // setTimeout(() => {
            //     sendSms("09032172257", "Hi-S");
            // }, 2000);
        });
    });
}

console.log("Serial port started");
bootstrap();
