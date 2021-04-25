const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    raspi.init(() => {
        var serial = new Serial({ baudRate: 1200 });
        serial.open(() => {
            serial.on('data', (data) => {
                const currentDate = new Date().toISOString();
                console.log(`[${ currentDate }] { data: ${ data } }`);
            });

        });

        setInterval(() => {
            serial.write('AT\r');
            console.log(`live - BaudRate: ${serial.baudRate}`);
        }, 5000);
    });
}

console.log("Serial port started");
bootstrap();
