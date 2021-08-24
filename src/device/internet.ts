import { Utils } from '../helper';
import { Device } from './device.interface';

export class Internet implements Device {
  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollConnectionAvailability();
      }
    }
  };

  private pollConnectionAvailability = () => {
    Utils.checkConnectionAvailability(0, 10, (isAvailable) => {
      if (!isAvailable) {
        Utils.consoleLog('Application will be restarted because of internet loss in 30 seconds...');

        setTimeout(() => {
          Utils.rebootMachine();
        }, 30 * 1000);
      } else {
        Utils.consoleLog('Internet connection is available...');
      }
    });
  };
}
