import { SMSListener } from 'device';
import { Device } from './device.interface';

export interface Devices {
  os: Device,
  cooler: Device,
  rig: Device,
  board: Device,
  internet: Device,
  motion: Device,
  sms: SMSListener,
}
