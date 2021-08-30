import { IO, Utils } from '../helper';
import { Device } from '../type/device.interface';

export class MainBoard implements Device {
  constructor(io: IO) {
    this.io = io;
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

  private io: IO;

  public reset = () => {
    Utils.consoleLog('The main board is restarted. It will be alive depends on the protectors delay.');

    setTimeout(() => {
      this.io.mainBoardReset();
    }, 2000);
  };
}
