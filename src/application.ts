import { Utils, Raspberry, SMS } from './helper';
import { Cooler, Device, Rig, Internet, Motion } from './device';
import { MainBoard } from './device/main-board';
import { ArgCommand } from './enum';

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

  const command: ArgCommand = objArgs?.command;

  switch (command) {
    case ArgCommand.OS: {
      device = new Motion(raspberry, sms);
      sms.sendBoradcastSms('سلام۳۳');
      break;
    }

    case ArgCommand.cooler: {
      device = new Cooler(raspberry);
      break;
    }

    case ArgCommand.rig: {
      device = new Rig(raspberry);
      break;
    }

    case ArgCommand.board: {
      device = new MainBoard(raspberry);
      break;
    }

    case ArgCommand.internet: {
      device = new Internet(raspberry, sms);
      break;
    }

    case ArgCommand.motion: {
      device = new Motion(raspberry, sms);
      break;
    }

    default: {
      throw new Error('No proper command found!');
    }
  }

  device.manageCommand(objArgs.args);
  Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
}
