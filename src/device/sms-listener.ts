import { IO, SMS, Utils } from '../helper';
import { Device } from './device.interface';

export class SMSListener implements Device {
  constructor(io: IO, sms: SMS) {
    this.io = io;
    this.sms = sms;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.listen();
      }
    }
  };

  private io: IO;

  private sms: SMS;

  private listen = () => {
    this.sms.subscribedDataReceived = (number: string, msgText: string) => {
      Utils.consoleLog(`Message received => number: ${ number } | msgText: ${ msgText }`);
    };

    // @todo: Will be completed later...
    Utils.consoleLog(`listen called. ${ this.io } + ${ this.sms }`);
    // Check received message here...
  };
}
