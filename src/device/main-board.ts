import { Raspberry, Utils } from '../helper';
import { Device } from './device.interface';

export class MainBoard implements Device {
  constructor(raspberry: Raspberry) {
    this.raspberry = raspberry;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      case 'reset': {
        this.reset();
        break;
      }

      default: {
        throw new Error('No proper param found for cooler');
      }
    }
  };

  private raspberry: Raspberry;

  public reset = () => {
    Utils.consoleLog('The main board is restarted. It will be alive depends on the protectors delay.');

    setTimeout(() => {
      this.raspberry.mainBoardReset();
    }, 2000);
  };
}
