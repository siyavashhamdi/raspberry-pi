import { Utils, Raspberry } from './helper';

export async function bootstrap() {
    const args = process.argv.filter(item => item.startsWith('--'));
    const objArgs = Utils.convertKeyVal2Obj(args);

    Utils.consoleLog(JSON.stringify(objArgs));

    const raspberry = new Raspberry();
    raspberry.coolerSwitchPeriodically(1, 0.5);

    Utils.consoleLog("Hi Rasp");
}
