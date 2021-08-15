import { Raspberry, Utils } from '../helper';

export interface Device {
  manageCommand: (params: string) => void
}
