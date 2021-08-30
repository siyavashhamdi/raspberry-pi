import { IO, SMS, Utils } from '../helper';
import { Device } from '../type/device.interface';

export class SMSListener implements Device {
  constructor(io: IO, sms: SMS) {
    this.io = io;
    this.sms = sms;
  }

  public manageCommand = (params: string, callbackReceivedMsg?: (number: string, msgText: string) => void) => {
    switch (params) {
      default: {
        this.listen();
      }
    }

    this.callbackReceivedMsg = callbackReceivedMsg;
  };

  private io: IO;

  private sms: SMS;

  public callbackReceivedMsg?: (number: string, msgText: string) => void;

  private listen = () => {
    this.sms.subscribedDataReceived = (number: string, msgText: string) => {
      Utils.consoleLog(`Message received => number: ${ number } | msgText: ${ msgText }`);

      if (this.callbackReceivedMsg) {
        this.callbackReceivedMsg(number, msgText);
      }
    };

    // @todo: Will be completed later...
    Utils.consoleLog(`listen called. ${ this.io } + ${ this.sms }`);
    // Check received message here...
  };
}
