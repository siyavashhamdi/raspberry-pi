export class Raspberry {
    constructor() {
        var GPIO = require('onoff').Gpio;   //include onoff to interact with the GPIO

        this.device = {
            output: {
                cooler: new GPIO(13, 'out'),
                rigGrpA: new GPIO(6, 'out'),
                rigGrpB: new GPIO(5, 'out'),
                mainBoard: new GPIO(26, 'out'),
            },
            input: {
                cooler: new GPIO(1, 'in'),
            },
        };
    }

    private device: MainDevices;

    private setDevice(device: any, status: DeviceOutputStatus) {
        const value = status === DeviceOutputStatus.off ? 0 : 1;

        device.writeSync(value);
    }

    public coolerSwitchPeriodically(
        onByMin: number,
        offByMin: number,
        callback?: (status: DeviceOutputStatus, nextTriggerAfterMin: number) => void,
    ) {
        let currStatus = DeviceOutputStatus.off;

        const doInterval = () => {
            let intervalByMin: number;

            if (currStatus === DeviceOutputStatus.off) {
                currStatus = DeviceOutputStatus.on;
                intervalByMin = onByMin;
            } else {
                currStatus = DeviceOutputStatus.off;
                intervalByMin = offByMin;
            }

            this.setDevice(this.device.output.cooler, currStatus);

            if (callback) {
                callback(currStatus, intervalByMin);
            }

            setTimeout(() => {
                doInterval();
            }, intervalByMin * 60 * 1000);
        };

        doInterval();
    }

    public coolerSetOn() {
        this.setDevice(this.device.output.cooler, DeviceOutputStatus.on);
    }

    public coolerSetOff() {
        this.setDevice(this.device.output.cooler, DeviceOutputStatus.off);
    }

    public rigResetGroupA(turnOnAfterByMin: number) {
        this.setDevice(this.device.output.rigGrpA, DeviceOutputStatus.off);

        setTimeout(() => {
            this.setDevice(this.device.output.rigGrpA, DeviceOutputStatus.on);
        }, turnOnAfterByMin * 60 * 1000);
    }

    public rigResetGroupB(turnOnAfterByMin: number) {
        this.setDevice(this.device.output.rigGrpB, DeviceOutputStatus.off);

        setTimeout(() => {
            this.setDevice(this.device.output.rigGrpB, DeviceOutputStatus.on);
        }, turnOnAfterByMin * 60 * 1000);
    }

    public rigSetGroupA(status: DeviceOutputStatus) {
        this.setDevice(this.device.output.rigGrpA, status);
    }

    public rigSetGroupB(status: DeviceOutputStatus) {
        this.setDevice(this.device.output.rigGrpB, status);
    }

    public mainBoardReset() {
        this.setDevice(this.device.output.mainBoard, DeviceOutputStatus.off);
    }
}
