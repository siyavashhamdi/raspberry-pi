import { IO, SMS, Utils } from '../helper';
import { Device } from '../type/device.interface';

export class SMSListener implements Device {
  constructor(io: IO, sms: SMS) {
    this.io = io;
    this.sms = sms;
  }

  public manageCommand(params: string, callbackReceivedMsg: any) {
    switch (params) {
      default: {
        this.listen();
      }
    }

    Utils.consoleLog(`SL: 1, param: ${ params }, ${ callbackReceivedMsg }`);
    this.callbackReceivedMsg = callbackReceivedMsg;
  }

  private io: IO;

  private sms: SMS;

  public callbackReceivedMsg?: (number: string, msgText: string) => void;

  private listen = () => {
    Utils.consoleLog(`sl: ${ 1 }, listen done`);

    this.sms.subscribedDataReceived = (number: string, msgText: string) => {
      Utils.consoleLog(`Message received => number: ${ number } | msgText: ${ msgText }\
| this.callbackReceivedMsg: ${ this.callbackReceivedMsg }`);

      if (this.callbackReceivedMsg) {
        this.callbackReceivedMsg(number, msgText);
      }
    };

    // @todo: Will be completed later...
    Utils.consoleLog(`listen called. ${ this.io } + ${ this.sms }`);
    // Check received message here...
  };
}
