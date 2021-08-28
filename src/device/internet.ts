import { IO, SMS, Utils } from '../helper';
import { Device } from './device.interface';
import { MainBoard } from './main-board';

export class Internet implements Device {
  constructor(io: IO, sms: SMS) {
    this.io = io;
    this.sms = sms;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollConnectionAvailability();
        break;
      }
    }
  };

  private io: IO;

  private sms: SMS;

  private pollConnectionAvailability = () => {
    const internetCheckMins = process.env.INTERNET_CHECK_MINS?.split(',')?.map(min => +min) || [];

    Utils.checkConnectionAvailability(internetCheckMins, 10, (isAvailable) => {
      if (!isAvailable) {
        Utils.consoleLog('The main board will be restarted because of internet loss in 30 seconds...');
        this.sms.sendBroadcastSms('ارتباط با اینترنت قطع می‌باشد.\nتلاش برای ری‌استارت کردن ماشین تا لحظاتی دیگر...');

        setTimeout(() => {
          const mainBoard = new MainBoard(this.io);

          mainBoard.reset();

          setTimeout(() => Utils.rebootMachine(), 1000);
        }, 30 * 1000);
      } else {
        Utils.consoleLog('Internet connection is available...');
      }
    });
  };
}
