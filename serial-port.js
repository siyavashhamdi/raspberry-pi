const bootstrap = () => {
    const raspi = require('raspi');
    const Serial = require('raspi-serial').Serial;

    raspi.init(() => {
        var serial = new Serial();
        serial.open(() => {
            serial.on('data', (data) => {
                console.log(`[${currentDate}] { data: ${data} }`);
            });

        });

        setInterval(() => {
            serial.write('Hello from raspi-serial');
        }, 1000);
    });
}

console.log("Serial port started");
bootstrap();
