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
                console.log("data received");

                if (bufferOut.includes("\r")) {
                    const currentDate = new Date().toISOString();
                    const newData = bufferOut.join().replace("\r\n", "");

                    console.log(`[${currentDate}] { baudrate: ${serial.baudRate}, data: ${newData}, length: ${newData.length} }`);
                    for (const ch of newData) {
                        console.log(`---------: ${ch} => ${ch.charCodeAt()}`)
                    }
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
