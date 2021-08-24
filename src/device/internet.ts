import { Raspberry, Utils } from '../helper';
import { Device } from './device.interface';
import { MainBoard } from './main-board';

export class Internet implements Device {
  constructor(raspberry: Raspberry) {
    this.raspberry = raspberry;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollConnectionAvailability();
        break;
      }
    }
  };

  private raspberry: Raspberry;

  private pollConnectionAvailability = () => {
    Utils.checkConnectionAvailability(0, 10, (isAvailable) => {
      if (!isAvailable) {
        Utils.consoleLog('The main board will be restarted because of internet loss in 30 seconds...');

        setTimeout(() => {
          const mainBoard = new MainBoard(this.raspberry);

          mainBoard.reset();

          setTimeout(() => Utils.rebootMachine(), 1000);
        }, 30 * 1000);
      } else {
        Utils.consoleLog('Internet connection is available...');
      }
    });
  };
}
