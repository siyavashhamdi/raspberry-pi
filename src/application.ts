import { Utils, Raspberry } from './helper';
import { Cooler, Device, Rig } from './device';
import { MainBoard } from './device/main-board';

export async function bootstrap() {
  Utils.consoleLog('Application started');
  Utils.makeAppAlive(() => Utils.consoleLog('Application heart beat...'));

  Utils.checkConnectionAvailability(0, 10, (isAvailable) => {
    if (!isAvailable) {
      Utils.consoleLog('Application will be restarted because of internet loss in 10 seconds...');

      setTimeout(() => {
        Utils.rebootMachine();
      }, 30 * 1000);
    } else {
      Utils.consoleLog('Internet connection is available...');
    }
  });

  const args = process.argv.filter(item => item.startsWith('--'));
  const objArgs = Utils.convertKeyVal2Obj(args);

  Utils.consoleLog(JSON.stringify(objArgs));

  if (!objArgs?.command || !objArgs?.args) {
    throw new Error('command or args is not provided!');
  }

  const raspberry = new Raspberry();
  let device: Device;

  switch (objArgs?.command) {
    case 'cooler': {
      device = new Cooler(raspberry);
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

    default: {
      throw new Error('No proper command found!');
    }
  }

  device.manageCommand(objArgs.args);

  raspberry.pollMotionDetectionA(() => {
    Utils.consoleLog('pollMotionDetectionA in application!');
  });
}
