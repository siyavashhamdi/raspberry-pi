import moment from 'moment-timezone';

export class Utils {
  public static zeroPad = (num: unknown, places: number): string => String(num).padStart(places, '0')

  public static formatDateTime(dateTime: number | Date, timezone = 'Asia/Tehran'): string {
    const unixTs = typeof dateTime === 'number' ? dateTime : dateTime.getTime();
    const date = moment(unixTs).tz(timezone);

    return date.format('yyyy/MM/DD, HH:mm:ss.SSS');
  }

  public static addSecondsToDate(date: Date, seconds: number): Date {
    const addedDate = moment(date).add(seconds, 's');

    return addedDate.toDate();
  }

  public static consoleLog(logValue: string | number): void {
    const dateTime = this.formatDateTime(new Date());
    const modifiedLogValue = `[${ dateTime }] : ${ logValue }`;

    console.log(modifiedLogValue);
  }

  public static convertKeyVal2Obj(keyVal: string[]): any {
    const objKeyVal = {};

    for (const arg of keyVal) {
      const [key, val] = arg.substring(2).split('=');

      Object.assign(objKeyVal, { [key]: val });
    }

    return objKeyVal;
  }
}
