interface Devices {
    output: {
        cooler: any,
        rigGp1: any,
        rigGp2: any,
        periferal: any,
    },
    input: {
        cooler: any,
    },
}

enum DeviceOutputStatus {
    off = 'off',
    on = 'on',
}

import { Utils } from './utils';

export class Raspberry {
    constructor() {
        var GPIO = require('onoff').Gpio;   //include onoff to interact with the GPIO

        this.device = {
            output: {
                cooler: new GPIO(13, 'out'),
                rigGp1: new GPIO(1, 'out'),
                rigGp2: new GPIO(1, 'out'),
                periferal: new GPIO(1, 'out'),
            },
            input: {
                cooler: new GPIO(1, 'in'),
            },
        };
    }

    private device: Devices;

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
}
