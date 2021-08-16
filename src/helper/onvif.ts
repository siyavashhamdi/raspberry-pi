/* eslint-disable no-console */
/* eslint-disable global-require */

import * as onvif from 'node-onvif';
// import { appendFileSync, existsSync, mkdirSync } from 'fs';

export class Onvif {
  public static device() {
    // Create an OnvifDevice object
    const device = new onvif.OnvifDevice({
      xaddr: 'http://192.168.1.160:80/onvif/device_service',
      user: 'admin',
      pass: '2690fF2690',
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
    console.log('Start the discovery process.');
    // Find the ONVIF network cameras.
    // It will take about 3 seconds.
    onvif.startProbe().then((device_info_list: any) => {
      console.log(`${ device_info_list.length } devices were found.`);
      // Show the device name and the URL of the end point.
      device_info_list.forEach((info: any) => {
        console.log(`- ${ info.urn }`);
        console.log(`  - ${ info.name }`);
        console.log(`  - ${ info.xaddrs[0] }`);
      });
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
