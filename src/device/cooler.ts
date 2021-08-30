import { IO, Utils } from '../helper';
import { Device } from '../type/device.interface';

export class Cooler implements Device {
  constructor(io: IO) {
    this.io = io;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      case 'periodically': {
        this.periodically();
        break;
      }

      case 'set-on': {
        this.setOn();
        break;
      }

      case 'set-off': {
        this.setOff();
        break;
      }

      default: {
        throw new Error('No proper param found for cooler');
      }
    }
  };

  private io: IO;

  private periodically = () => {
    const coolerOnByMin = +(process.env.COOLER_ON_BY_MIN || 120);
    const coolerOffByMin = +(process.env.COOLER_OFF_BY_MIN || 120);

    Utils.consoleLog(`Cooler switch periodically started. coolerOnByMin: ${ coolerOnByMin }, coolerOffByMin: ${ coolerOffByMin }`);

    this.io.coolerSwitchPeriodically(
      coolerOnByMin,
      coolerOffByMin,
      (status: any, nextTriggerAfterMin: any) => {
        const dtNextTrigger = Utils.addSecondsToDate(new Date(), nextTriggerAfterMin * 60);
        const formattedNextDt = Utils.formatDateTime(dtNextTrigger);

        Utils.consoleLog(`Cooler current status is '${ status.toUpperCase() }' and the next trigger will be on ${ formattedNextDt }`);
      },
    );
  };

  private setOn = () => {
    this.io.coolerSetOn();
  };

  private setOff = () => {
    this.io.coolerSetOff();
  };
}
