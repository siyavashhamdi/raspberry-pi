import { Devices } from 'type';
import { IO, SMS, Utils } from '../helper';
import { Device } from '../type/device.interface';

export class AllDevices implements Device {
  constructor(io: IO, sms: SMS, devices: Devices) {
    this.io = io;
    this.sms = sms;
    this.devices = devices;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.manageInitialDevices();
      }
    }
  };

  protected io: IO;

  protected sms: SMS;

  private devices: Devices;

  private manageInitialDevices = () => {
    this.devices.os.manageCommand('none');
    this.devices.cooler.manageCommand('periodically');
    // this.devices.rig.manageCommand('none');
    // this.devices.board.manageCommand('none');
    this.devices.internet.manageCommand('none');
    this.devices.motion.manageCommand('none');

    this.devices.sms.manageCommand('none', this.manageReceivedCommandFromSms);
  };

  public manageReceivedCommandFromSms(number: string, msgText: string) {
    Utils.consoleLog(`xxxxxxxxxx: number: ${ number } | msgText: ${ msgText }`);
  }
}
