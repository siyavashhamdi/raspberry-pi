import { Raspberry, SMS, Utils } from '../helper';
import { Device } from './device.interface';

export class OS implements Device {
  constructor(raspberry: Raspberry, sms: SMS) {
    this.raspberry = raspberry;
    this.sms = sms;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollMotionDetection();
      }
    }
  };

  private raspberry: Raspberry;

  private sms: SMS;

  private pollMotionDetection = () => {
    Utils.consoleLog(this.raspberry);
    this.sms.sendBoradcastSms('سلام ۶.');
  };
}
