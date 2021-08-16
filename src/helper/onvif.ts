/* eslint-disable no-console */
/* eslint-disable global-require */

import * as onvif from 'node-onvif';
import { writeFileSync } from 'fs';

export class Onvif {
  public static device() {
    // Create an OnvifDevice object
    const device = new onvif.OnvifDevice({
      xaddr: 'http://192.168.1.160:80/onvif/device_service',
      user: 'admin',
      pass: '2690fF2691',
    });

    // Initialize the OnvifDevice object
    device.init().then((info: any) => {
      // Show the detailed information of the device.
      console.log(JSON.stringify(info, null, '  '));
    }).catch((error: any) => {
      console.error(error);
    });
  }

  public static takeSnapshot() {
    // Create an OnvifDevice object
    const device = new onvif.OnvifDevice({
      xaddr: '192.168.1.162',
      user: 'admin',
      pass: '2690fF2690',
    });

    // Initialize the OnvifDevice object
    device.init().then(() => {
      // Get the data of the snapshot
      console.log('fetching the data of the snapshot...');

      return device.fetchSnapshot();
    }).then((res: any) => {
      // Save the data to a file
      writeFileSync('snapshot.jpg', res.body, { encoding: 'binary' });
      console.log('Done!');
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
