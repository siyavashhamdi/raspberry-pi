const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    raspi.init(() => {
        var serial = new Serial({ baudRate: 1200 });
        serial.open(() => {
            serial.on('data', (data) => {
                const dataStr = data.toString();
                const currentDate = new Date().toISOString();

                console.log(`[${currentDate}] { baudrate: ${serial.baudRate}, data: ${dataStr}, dataSplitR: ${dataStr.split?.length("\r")}, dataSplitN: ${dataStr.split("\n")?.length} }`);
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
