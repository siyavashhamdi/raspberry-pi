import { Utils } from '../helper';
import { Device } from './device.interface';
import { MainBoard } from './main-board';

export class Internet implements Device {
  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollConnectionAvailability();
      }
    }
  };

  private pollConnectionAvailability = (raspberry) => {
    Utils.checkConnectionAvailability(10, 10, (isAvailable) => {
      if (!isAvailable) {
        Utils.consoleLog('Application will be restarted because of internet loss in 30 seconds...');

        setTimeout(() => {
          const mainBoard = new MainBoard(raspberry);

          mainBoard.reset();

          setTimeout(() => Utils.rebootMachine(), 1000);
        }, 30 * 1000);
      } else {
        Utils.consoleLog('Internet connection is available...');
      }
    });
  };
}
