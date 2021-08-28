import { IO, Utils } from '../helper';
import { Device } from './device.interface';
import { DeviceOutputStatus } from '../enum';

export class Rig implements Device {
  constructor(io: IO) {
    this.io = io;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      case 'group-a,reset': {
        this.resetGroupA();
        break;
      }

      case 'group-b,reset': {
        this.resetGroupB();
        break;
      }

      case 'group-a,set-on': {
        this.setOnGroupA();
        break;
      }

      case 'group-b,set-on': {
        this.setOnGroupB();
        break;
      }

      case 'group-a,set-off': {
        this.setOffGroupA();
        break;
      }

      case 'group-b,set-off': {
        this.setOffGroupB();
        break;
      }

      default: {
        throw new Error('No proper param found');
      }
    }
  };

  private io: IO;

  private resetGroupA = () => {
    const waitByMin = +(process.env.RIG_RESEAT_WAIT_BY_MIN || 1);

    this.io.rigResetGroupA(waitByMin);
    Utils.consoleLog(`Rig group A is restarting in ${ waitByMin } minute(s)`);
  };

  private resetGroupB = () => {
    const waitByMin = +(process.env.RIG_RESEAT_WAIT_BY_MIN || 1);

    this.io.rigResetGroupB(waitByMin);
    Utils.consoleLog(`Rig group B is restarting in ${ waitByMin } minute(s)`);
  };

  private setOnGroupA = () => {
    this.io.rigSetGroupA(DeviceOutputStatus.on);
    Utils.consoleLog('Rig group A is set to \'ON\'');
  };

  private setOffGroupA = () => {
    this.io.rigSetGroupA(DeviceOutputStatus.off);
    Utils.consoleLog('Rig group A is set to \'OFF\'');
  };

  private setOnGroupB = () => {
    this.io.rigSetGroupB(DeviceOutputStatus.on);
    Utils.consoleLog('Rig group B is set to \'ON\'');
  };

  private setOffGroupB = () => {
    this.io.rigSetGroupB(DeviceOutputStatus.off);
    Utils.consoleLog('Rig group B is set to \'OFF\'');
  };
}
