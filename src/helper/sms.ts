import * as UART from 'raspi-serial';
import { Utils } from './utils';

export class SMS {
  constructor(serialOption: any = { baudRate: 115200 }) {
    this.serialPort = new UART.Serial(serialOption);
    this.init();
  }

  private serialPort: any;

  public subscribedDataReceived?: (number: string, msgText: string) => void;

  private writeWithCr(cmd: string) {
    this.serialPort.write(`${ cmd }\r`);
  }

  private dataReceived(data: string) {
    if (this.subscribedDataReceived) {
      this.subscribedDataReceived('111', data);
    }
  }

  private async sendSms(number: string, text: string): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const interAtCommandDelay = 500;

      const textModified = text.split('').map(k => k.charCodeAt(0).toString(16).padStart(4, '0')).join('');

      this.writeWithCr('AT');
      await Utils.sleep(interAtCommandDelay);

      this.writeWithCr('AT+CMGF=1');
      await Utils.sleep(interAtCommandDelay);

      // Set this and save to configs of AT
      this.writeWithCr('AT+CSCS="HEX"');
      await Utils.sleep(interAtCommandDelay);

      // Set this and save to configs of AT
      this.writeWithCr('AT+CSMP=49,167,0,8');
      await Utils.sleep(interAtCommandDelay);

      this.writeWithCr(`AT+CMGS="${ number }"`);
      await Utils.sleep(interAtCommandDelay);

      this.serialPort.write(`${ textModified }${ String.fromCharCode(26) }`);
      await Utils.sleep(interAtCommandDelay * 10); // Takes longer than usual

      resolve();
    });
  }

  public async sendBroadcastSms(text: string) {
    const smsPhoneNumbers = process.env.SMS_PHONE_NUMBERS?.split(',').filter(no => no.length > 10) || [];

    if (!smsPhoneNumbers.length) {
      Utils.consoleLog('No config found sending message to!');

      return;
    }

    for await (const phoneNum of smsPhoneNumbers) {
      Utils.consoleLog(`Start sending message '${ text }' to phone number '${ phoneNum }'`);
      await this.sendSms(phoneNum, text);
      Utils.consoleLog(`Finished sending message '${ text }' to phone number '${ phoneNum }'`);
    }
  }

  private async init() {
    await this.serialPort.open(() => {
      let delayTimeout: NodeJS.Timeout;
      let buffer = '';

      this.serialPort.on('data', (data: string) => {
        clearTimeout(delayTimeout);
        buffer += data;

        delayTimeout = setTimeout(() => {
          this.dataReceived(buffer);
          buffer = '';
        }, 10);
      });
    });
  }

  protected setBaudRate(baudrate: number) {
    this.writeWithCr('AT');
    Utils.sleep(1000);
    this.writeWithCr('AT+IPR?');

    setTimeout(() => {
      this.writeWithCr(`AT+IPR=${ baudrate }`);

      setTimeout(() => {
        this.writeWithCr('AT&W');
      }, 1000);
    }, 1000);
  }

  protected initReadyReceiveSms() {
    this.writeWithCr('AT+CMGF=1');

    setTimeout(() => {
      this.writeWithCr('AT+CMGD=4');

      setTimeout(() => {
        this.writeWithCr('AT+CNMI=2,2,0,0,0');

        setTimeout(() => {
          this.writeWithCr('AT&W');
        }, 1000);
      }, 1000);
    }, 1000);
  }
}
