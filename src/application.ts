import { Utils, Raspberry } from './helper';
import { Cooler, Device, Rig } from './device';
import { MainBoard } from './device/main-board';

export async function bootstrap() {
  Utils.makeAppAlive();

  // setTimeout(() => {
  //   Utils.rebootMachine();
  // }, 120 * 1000);

  // eslint-disable-next-line no-console
  console.log('continue');
  const x = 1;

  if (x === 1) {
    return;
  }

  Utils.consoleLog('Application started');

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
}
