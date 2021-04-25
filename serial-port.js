const bootstrap = () => {
    const raspi = require("raspi");
    const Serial = require("raspi-serial").Serial;

    raspi.init(() => {
        const serial = new Serial({ baudRate: 1200 });
        let bufferOut = [];

        serial.open(() => {
            serial.on("data", (data) => {
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

        setTimeout(() => {
            serial.write("AT\r");
            console.log("AT\\r sent.");

            // setTimeout(() => {
            //     serial.write("AT+CMGF=1\r");
            //     console.log("AT+CMGF=1\\r sent.");

            //     setTimeout(() => {
            //         serial.write("AT+CMGS=\"09032172257\"\r");
            //         console.log("AT+CMGS=\\\"09032172257\\\"\\r sent.");

            //         setTimeout(() => {
            //             serial.write("Salam");
            //             console.log("Salam sent.");

            //             setTimeout(() => {
            //                 serial.write(String.fromCharCode(26));
            //                 console.log("0x26 sent.");
            //             }, 1000);
            //         }, 1000);
            //     }, 1000);
            // }, 1000);
        }, 5000);
    });
}

console.log("Serial port started");
bootstrap();
