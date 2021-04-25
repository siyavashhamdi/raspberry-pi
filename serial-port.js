const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    raspi.init(() => {
        const serial = new Serial({ baudRate: 1200 });
        let bufferOut = [];

        serial.open(() => {
            serial.on('data', (data) => {
                const dataStr = data.toString();
                bufferOut.push(...dataStr);

                console.log(`[${currentDate}] { data: ${data}, data.length: ${data.length} }`);
                
                if (bufferOut.includes("\r")) {
                    const currentDate = new Date().toISOString();
                    const newData = bufferOut.join("").replace("\r\n", "");

                    bufferOut = [];
                    console.log(`[${currentDate}] { baudrate: ${serial.baudRate}, data: ${data}, newdata: ${newData}, length: ${newData.length} }`);
                }
            });
        });

        setInterval(() => {
            serial.write('AT\r');
            console.log("AT sent.");
        }, 5000);
    });
}

console.log("Serial port started");
bootstrap();
