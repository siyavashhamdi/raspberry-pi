import { Utils, IO, SMS } from './helper';
import { Cooler, Rig, Internet, Motion, OS, SMSListener, AllDevices } from './device';
import { MainBoard } from './device/main-board';
import { ArgCommand } from './enum';
import { Device } from 'type/device.interface';
import { Devices } from 'type';

export async function bootstrap() {
  Utils.consoleLog('Application started');

  const args = process.argv.filter(item => item.startsWith('--'));
  const objArgs = Utils.convertKeyVal2Obj(args);

  Utils.consoleLog(JSON.stringify(objArgs));

  if (!objArgs?.command || !objArgs?.args) {
    throw new Error('command or args is not provided!');
  }

  const command: ArgCommand = objArgs?.command;

  const io = new IO();
  const sms = new SMS();

  let device: Device;
  const devices: Devices = {
    os: new OS(sms),
    cooler: new Cooler(io),
    rig: new Rig(io),
    board: new MainBoard(io),
    internet: new Internet(io, sms),
    motion: new Motion(io, sms),
    sms: new SMSListener(io, sms),
  };

  await Utils.sleep(1000);

  switch (command) {
    case ArgCommand.OS: {
      device = devices.os;
      break;
    }

    case ArgCommand.cooler: {
      device = devices.cooler;
      break;
    }

    case ArgCommand.rig: {
      device = devices.rig;
      break;
    }

    case ArgCommand.board: {
      device = devices.board;
      break;
    }

    case ArgCommand.internet: {
      device = devices.internet;
      break;
    }

    case ArgCommand.motion: {
      device = devices.motion;
      break;
    }

    case ArgCommand.sms: {
      device = devices.sms;
      break;
    }

    case ArgCommand.all: {
      device = new AllDevices(io, sms, devices);
      break;
    }

    default: {
      throw new Error('No proper command found!');
    }
  }

  device.manageCommand(objArgs.args);
  Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));
}
