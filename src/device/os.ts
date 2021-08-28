import { SMS, Utils } from '../helper';
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
    Utils.consoleLog('Raspberry OS is booted.');
    this.sms.sendBroadcastSms('سیستم‌عامل بوت شد.');
  };
}
