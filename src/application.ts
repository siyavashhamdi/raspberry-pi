import { Utils, IO, SMS } from './helper';
import { Cooler, Device, Rig, Internet, Motion, OS, SMSListener } from './device';
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

  const io = new IO();
  const sms = new SMS();
  let device: Device;

  const command: ArgCommand = objArgs?.command;

  switch (command) {
    case ArgCommand.OS: {
      await Utils.sleep(5000);
      device = new OS(sms);
      break;
    }

    case ArgCommand.cooler: {
      device = new Cooler(io);
      break;
    }

    case ArgCommand.rig: {
      device = new Rig(io);
      break;
    }

    case ArgCommand.board: {
      device = new MainBoard(io);
      break;
    }

    case ArgCommand.internet: {
      device = new Internet(io, sms);
      break;
    }

    case ArgCommand.motion: {
      device = new Motion(io, sms);
      break;
    }

    case ArgCommand.sms: {
      device = new SMSListener(io, sms);
      break;
    }

    default: {
      throw new Error('No proper command found!');
    }
  }

  device.manageCommand(objArgs.args);
  Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
}
