import * as moment from 'moment-timezone';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { IpPacketResult } from 'type';

export class Utils {
  public static zeroPad = (num: unknown, places: number): string => String(num).padStart(places, '0');

  public static formatDateTime(dateTime: number | Date, timezone = 'Asia/Tehran'): string {
    const unixTs = typeof dateTime === 'number' ? dateTime : dateTime.getTime();
    const date = moment(unixTs).tz(timezone);

    return date.format('yyyy/MM/DD, HH:mm:ss.SSS');
  }

  public static addSecondsToDate(date: Date, seconds: number): Date {
    const addedDate = moment(date).add(seconds, 's');

    return addedDate.toDate();
  }

  public static convertKeyVal2Obj(keyVal: Array<string>): any {
    const objKeyVal = {};

    for (const arg of keyVal) {
      const [key, val] = arg.substring(2).split('=');

      Object.assign(objKeyVal, { [key]: val });
    }

    return objKeyVal;
  }

  public static consoleLog(logValue: string | number): void {
    const dateTime = this.formatDateTime(new Date());
    const modifiedLogValue = `[${ dateTime }] : ${ logValue }`;

    // eslint-disable-next-line no-console
    console.log(modifiedLogValue);

    Utils.fileLog(modifiedLogValue);
  }

  public static async fileLog(logValue: string | number): Promise<void> {
    let logDirPath = require?.main?.path;

    if (!logDirPath) {
      return;
    }

    logDirPath += '/log/';

    if (!existsSync(logDirPath)) {
      mkdirSync(logDirPath);
    }

    const todayDate = moment(new Date()).tz('Asia/Tehran').format('yyyyMMDD');
    const logFileName = `${ todayDate }.log`;
    const logFullPath = logDirPath + logFileName;

    appendFileSync(logFullPath, `${ logValue.toString() }\n`);
  }

  public static rebootMachine() {
    exec('reboot');
  }

  public static async ping(packetTransmitCount = 10, samplingTime = 5000, ip = '8.8.8.8'): Promise<IpPacketResult> {
    let indexToEnd = 0;
    let receivedCount = 0;

    return new Promise((resolve) => {
      const si = setInterval(async () => {
        indexToEnd += 1;

        if (indexToEnd >= packetTransmitCount) {
          clearInterval(si);
        }

        await new Promise(() => {
          const child = exec(`ping -c 1 ${ ip }`, (_error, _stdout, _stderr) => {
            child.kill();

            if (!_error) {
              receivedCount += 1;
            }

            if (indexToEnd >= packetTransmitCount) {
              resolve({
                transmitCount: packetTransmitCount,
                receivedCount,
                lossPercentage: Math.round((1 - (receivedCount / packetTransmitCount)) * 100),
              });
            }
          });
        });
      }, samplingTime);
    });
  }

  public static async checkConnectionAvailability(
    checkEveryMinOf = 0,
    samplingCount = 10,
    callback?: (isAvailable: boolean) => void,
  ): Promise<void> {
    let lastCheckedMinute = -1;

    setInterval(async () => {
      const currMinutes = new Date().getMinutes();

      Utils.consoleLog(`Debug: currMinutes: ${ currMinutes }`);

      if (currMinutes === checkEveryMinOf && lastCheckedMinute !== currMinutes) {
        lastCheckedMinute = currMinutes;

        Utils.consoleLog('Debug: Inside if, SL: 1');
        const resPing = await Utils.ping(samplingCount, 5 * 1000);
        Utils.consoleLog('Debug: Inside if, SL: 2');

        if (callback) {
          callback(resPing.lossPercentage < 75);
        }
      }
    }, 10 * 1000);
  }

  public static async makeAppAlive(callback?: () => void): Promise<void> {
    // Heart beats every 1 hour

    setInterval(() => {
      if (callback) {
        callback();
      }
    }, 60 * 60 * 1000);
  }
}
