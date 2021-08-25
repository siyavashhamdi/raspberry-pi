import { Utils, Raspberry, SMS } from './helper';
import { Cooler, Device, Rig, Internet, Motion } from './device';
import { MainBoard } from './device/main-board';

export async function bootstrap() {
  Utils.consoleLog('Application started');

  const args = process.argv.filter(item => item.startsWith('--'));
  const objArgs = Utils.convertKeyVal2Obj(args);

  Utils.consoleLog(JSON.stringify(objArgs));

  if (!objArgs?.command || !objArgs?.args) {
    throw new Error('command or args is not provided!');
  }

  const raspberry = new Raspberry();
  const sms = new SMS();
  let device: Device;

  switch (objArgs?.command) {
    case 'cooler': {
      device = new Cooler(raspberry);
      Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
      break;
    }

    case 'rig': {
      device = new Rig(raspberry);
      break;
    }

    case 'board': {
      device = new MainBoard(raspberry);
      break;
    }

    case 'internet': {
      device = new Internet(raspberry);
      Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
      break;
    }

    case 'motion': {
      device = new Motion(raspberry, sms);
      Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
      break;
    }

    default: {
      throw new Error('No proper command found!');
    }
  }

  // switch (objArgs?.command) {
  //   case 'cooler':
  //   case 'internet':
  //   case 'motion': {
  //     Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
  //     break;
  //   }
  // }

  device.manageCommand(objArgs.args);
}
