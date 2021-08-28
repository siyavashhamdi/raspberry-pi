import { Raspberry, SMS, Utils } from '../helper';
import { Device } from './device.interface';

export class Motion implements Device {
  constructor(raspberry: Raspberry, sms: SMS) {
    this.raspberry = raspberry;
    this.sms = sms;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollMotionDetection();
        Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
      }
    }
  };

  private raspberry: Raspberry;

  private sms: SMS;

  private dtNextSendSms?: Date;

  private pollMotionDetection = () => {
    this.raspberry.getChangeMotionDetectionA(() => {
      const currDate = new Date();

      if (this.dtNextSendSms && currDate < this.dtNextSendSms) {
        Utils.consoleLog('Date is not reached yet');

        return;
      }

      this.dtNextSendSms = new Date(Utils.addSecondsToDate(currDate, 10 * 60));

      const smsPhoneNumbers = process.env.SMS_PHONE_NUMBERS?.split(',').filter(no => no.length > 10) || [];

      if (!smsPhoneNumbers.length) {
        Utils.consoleLog('No config was set to send message to!');

        return;
      }

      for (const phoneNum of smsPhoneNumbers) {
        const smsMsg = 'سنسور حرکتی حیاط فعال گردید.';

        Utils.consoleLog(`Sending message '${ smsMsg }' to phone number '${ phoneNum }'`);
        this.sms.sendSms(phoneNum, smsMsg);
      }
    });
  };
}
