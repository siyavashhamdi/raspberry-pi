import { Utils, Raspberry } from './helper';

export async function bootstrap() {
    const args = process.argv.filter(item => item.startsWith('--'));
    const objArgs = Utils.convertKeyVal2Obj(args);

    Utils.consoleLog(JSON.stringify(objArgs));

    const raspberry = new Raspberry();
    raspberry.coolerSwitchPeriodically(120, 30);

    Utils.consoleLog("Hi Rasp");
}
