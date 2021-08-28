import { SMS } from '../helper';
import { Device } from './device.interface';

export class OS implements Device {
  constructor(sms: SMS) {
    this.sms = sms;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.osStarted();
      }
    }
  };

  private sms: SMS;

  private osStarted = () => {
    this.sms.sendBoradcastSms('سلام۴.');
  };
}
