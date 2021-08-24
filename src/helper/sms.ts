/* eslint-disable prefer-destructuring */
/* eslint-disable global-require */
// import { Utils } from './utils';

export class SMS {
  constructor() {
    this.start(0);
  }

  private start(_aaa: any) {
    // const tenMins = 10 * 60 * 1000;
    // let dtNextSendSms = null;

    // const raspi = require('raspi');
    // const Serial = require('raspi-serial').Serial;
    // const serialPort = new Serial({ baudRate: 115200 });

    // const listenToButton = (inputPinNo) => {
    //   console.log("listen done to btn#: " + inputPinNo);

    //   const button = new Gpio(inputPinNo, 'in', 'rising');

    //   button.watch(function (err, value) {
    //     console.log("watch btn#: " + inputPinNo);

    //     if (dtNextSendSms && new Date < dtNextSendSms) {
    //       console.log("Date is not reached.");
    //       return;
    //     }

    //     dtNextSendSms = new Date(new Date(new Date().getTime() + tenMins).toISOString());

    //     console.log('Pin#: ' + inputPinNo + " enabled!");

    //     serialPort.writeWithCr = (cmd) => {
    //       serialPort.write(`${ cmd }\r`);
    //       // serialPort.write(`Sent: ${ cmd }\\r`);
    //     }

    //     const sendSms = (number, text) => {
    //       const delayMs = 500;

    //       text = text.split("").map(k => k.charCodeAt(0).toString(16).padStart(4, 0)).join("");

    //       serialPort.writeWithCr('AT');

    //       setTimeout(() => {
    //         serialPort.writeWithCr('AT+CMGF=1');

    //         setTimeout(() => {
    //           // Set this and save to configs of AT
    //           serialPort.writeWithCr('AT+CSCS="HEX"');

    //           setTimeout(() => {
    //             // Set this and save to configs of AT
    //             serialPort.writeWithCr('AT+CSMP=49,167,0,8');

    //             setTimeout(() => {
    //               serialPort.writeWithCr(`AT+CMGS="${ number }"`);

    //               setTimeout(() => {
    //                 serialPort.write(`${ text }${ String.fromCharCode(26) }`);
    //               }, delayMs);
    //             }, delayMs);
    //           }, delayMs);
    //         }, delayMs);
    //       }, delayMs);
    //     };

    //     const setBaudRate = (baudrate) => {
    //       serialPort.writeWithCr('AT+IPR?');

    //       setTimeout(() => {
    //         serialPort.writeWithCr(`AT+IPR=${ baudrate }`);

    //         setTimeout(() => {
    //           serialPort.writeWithCr('AT&W');
    //         }, 1000);
    //       }, 1000);
    //     }

    //     const initReadyReceiveSms = () => {
    //       serialPort.writeWithCr('AT+CMGF=1');

    //       setTimeout(() => {
    //         serialPort.writeWithCr('AT+CMGD=4');

    //         setTimeout(() => {
    //           serialPort.writeWithCr('AT+CNMI=2,2,0,0,0');

    //           setTimeout(() => {
    //             serialPort.writeWithCr('AT&W');
    //           }, 1000);
    //         }, 1000);
    //       }, 1000);
    //     }

    //     const dataReceived = (data) => {
    //       console.log(`-----------------------\n${ data }\n-----------------------`);
    //     }

    //     raspi.init(() => {
    //       serialPort.open(() => {
    //         let delayTimeout;;
    //         let buffer = '';

    //         serialPort.on('data', (data) => {
    //           // const dataStr = data.toString();
    //           // const currentDate = new Date().toISOString();

    //           // console.log(`[${ currentDate }] { data: ${ dataStr }, data.length: ${ dataStr.length }, splitted: ${ dataStr.split('').map(k => k.charCodeAt()).join('-') } }`);

    //           clearTimeout(delayTimeout);
    //           buffer += data;

    //           delayTimeout = setTimeout(() => {
    //             dataReceived(buffer);
    //             buffer = '';
    //           }, 10);
    //         });

    //         setInterval(() => {
    //           // serialPort.writeWithCr('AT');
    //           // serialPort.writeWithCr('AT+CNMI=?');
    //         }, 5000);

    //         setTimeout(() => {
    //           // setBaudRate(0);

    //           setTimeout(() => {
    //             // initReadyReceiveSms();
    //             sendSms('0912111', 'سنسور حرکت شماره 1 فعال شد!');

    //             setTimeout(() => {
    //               sendSms('0903111', 'سنسور حرکت شماره 1 فعال شد!');

    //               setTimeout(() => {
    //                 sendSms('0912111', 'سنسور حرکت شماره 1 فعال شد!');
    //               }, 5000);
    //             }, 5000);
    //           }, 5000);
    //           // setCnmi();
    //         }, 2000);
    //       });
    //     });
    //   });
    // }

    // listenToButton(2);
    // listenToButton(3);
    // listenToButton(4);
    // listenToButton(17);
    // listenToButton(27);
    // listenToButton(22);
    // listenToButton(10);
    // listenToButton(9);
  }
}
