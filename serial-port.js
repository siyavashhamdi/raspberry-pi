const bootstrap = () => {
    const SerialPort = require("serialport");

    // var portsList = [];
    SerialPort.list().then((ports) => {
        console.log({ ports });
        ports.forEach((port) => {
            var portInfo = {
                portPath: port.path,
                portManufacturer: port.manufacturer,
            };

            // portsList.push(portInfo);
            console.log("Port: ", portInfo);
        });
    });

    // console.log(portsList.length);

    setInterval(() => {
        console.log("live");
    }, 1000);
}

console.log("Serial port started");
bootstrap();
