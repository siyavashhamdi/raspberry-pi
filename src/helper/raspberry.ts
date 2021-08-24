import * as OnOff from 'onoff';
import { DeviceOutputStatus } from '../enum';
import { MainDevices } from '../type';
import { Utils } from './utils';

export class Raspberry {
  constructor() {
    const GPIO = OnOff.Gpio;

    if (!GPIO.accessible) {
      throw new Error('Gpio functionality is not accessible on this computer!');
    }

    this.device = {
      output: {
        cooler: new GPIO(13, 'out'),
        rigGrpA: new GPIO(1, 'out'), // ???
        rigGrpB: new GPIO(1, 'out'), // ???
        mainBoard: new GPIO(1, 'out'), // ???
      },
      input: {
        motionDetectionA: new GPIO(1, 'in', 'rising'), // new GPIO(13, 'in', 'rising', { debounceTimeout: 10 }),
      },
    };
  }

  private device: MainDevices;

  private setDevice(device: any, status: DeviceOutputStatus) {
    const value = status === DeviceOutputStatus.off ? 0 : 1;

    Utils.consoleLog(`device: ${ JSON.stringify(device) } | value: ${ value }`);
    // device.writeSync(value);
  }

  private getDevice(device: any, callback: () => void) {
    device.watch((err: any, value: any) => {
      // eslint-disable-next-line no-console
      console.log(`value is: ${ value }`);

      if (err) {
        throw err;
      }

      callback();
    });
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
        this.coolerSetOn();
      } else {
        currStatus = DeviceOutputStatus.off;
        intervalByMin = offByMin;
        this.coolerSetOff();
      }

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

  public pollMotionDetectionA(callback: () => void) {
    this.getDevice(this.device.input.motionDetectionA, () => {
      callback();
    });
  }
}
