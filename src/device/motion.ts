import { Raspberry, Utils } from '../helper';
import { Device } from './device.interface';

export class Motion implements Device {
  constructor(raspberry: Raspberry) {
    this.raspberry = raspberry;
  }

  public manageCommand = (params: string) => {
    switch (params) {
      default: {
        this.pollMotionDetection();
      }
    }
  };

  private raspberry: Raspberry;

  private pollMotionDetection = () => {
    this.raspberry.pollMotionDetectionA(() => {
      Utils.consoleLog('pollMotionDetectionA in application!');
    });
  };
}
