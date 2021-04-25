const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    raspi.init(() => {
        //const lstBautRate = [1200, 2400, 4800, 9600, 19200, 38400, 57600,  115200];

        var serial = new Serial({ baudRate: 19200 });
        serial.open(() => {
            serial.on('data', (data) => {
                const currentDate = new Date().toISOString();
                console.log(`[${currentDate}] { baudrate: ${serial.baudRate}, data: ${data} }`);
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
