import * as UART from 'raspi-serial';
import { Utils } from './utils';

export class SMS {
  constructor(serialOption: any = { baudRate: 115200 }) {
    this.serialPort = new UART.Serial(serialOption);
    this.init();
  }

  private serialPort: any;

  private writeWithCr(cmd: string) {
    this.serialPort.write(`${ cmd }\r`);
  }

  private dataReceived(data: string) {
    Utils.consoleLog(`SL: 1, dataReceived: ${ data }`);
  }

  public sendSms(number: string, text: string) {
    const delayMs = 500;

    const textModified = text.split('').map(k => k.charCodeAt(0).toString(16).padStart(4, '0')).join('');

    this.writeWithCr('AT');

    setTimeout(() => {
      this.writeWithCr('AT+CMGF=1');

      setTimeout(() => {
        // Set this and save to configs of AT
        this.writeWithCr('AT+CSCS="HEX"');

        setTimeout(() => {
          // Set this and save to configs of AT
          this.writeWithCr('AT+CSMP=49,167,0,8');

          setTimeout(() => {
            this.writeWithCr(`AT+CMGS="${ number }"`);

            setTimeout(() => {
              this.serialPort.write(`${ textModified }${ String.fromCharCode(26) }`);
            }, delayMs);
          }, delayMs);
        }, delayMs);
      }, delayMs);
    }, delayMs);
  }

  private init() {
    this.serialPort.open(() => {
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

  // private setBaudRate(baudrate) {
  //   this.writeWithCr('AT+IPR?');

  //   setTimeout(() => {
  //     this.writeWithCr(`AT+IPR=${ baudrate }`);

  //     setTimeout(() => {
  //       this.writeWithCr('AT&W');
  //     }, 1000);
  //   }, 1000);
  // }

  // private initReadyReceiveSms() {
  //   this.writeWithCr('AT+CMGF=1');

  //   setTimeout(() => {
  //     this.writeWithCr('AT+CMGD=4');

  //     setTimeout(() => {
  //       this.writeWithCr('AT+CNMI=2,2,0,0,0');

  //       setTimeout(() => {
  //         this.writeWithCr('AT&W');
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // }
}
