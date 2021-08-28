import { IO, SMS, Utils } from '../helper';
import { Device } from './device.interface';

export class Motion implements Device {
  constructor(io: IO, sms: SMS) {
    this.io = io;
    this.sms = sms;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollMotionDetection();
      }
    }
  };

  private io: IO;

  private sms: SMS;

  private dtNextSendSms?: Date;

  private pollMotionDetection = () => {
    this.io.getChangeMotionDetectionA(() => {
      const currDate = new Date();

      if (this.dtNextSendSms && currDate < this.dtNextSendSms) {
        Utils.consoleLog('Date is not reached yet');

        return;
      }

      this.dtNextSendSms = new Date(Utils.addSecondsToDate(currDate, 10 * 60));
      this.sms.sendBroadcastSms('سنسور حرکتی حیاط فعال گردید.');
    });
  };
}
