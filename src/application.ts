import { Utils, Raspberry } from './helper';

export async function bootstrap() {
    Utils.consoleLog('Application started');

    const args = process.argv.filter(item => item.startsWith('--'));
    const objArgs = Utils.convertKeyVal2Obj(args);

    Utils.consoleLog(JSON.stringify(objArgs));

    const raspberry = new Raspberry();

    if (objArgs?.cooler === 'periodically') {
        const coolerOnByMin = +(process.env.COOLER_ON_BY_MIN || 120);
        const coolerOffByMin = +(process.env.COOLER_ON_BY_MIN || 120);

        Utils.consoleLog(`Cooler switch periodically started. coolerOnByMin: ${ coolerOnByMin }, coolerOffByMin: ${ coolerOffByMin }`);

        raspberry.coolerSwitchPeriodically(
            coolerOnByMin,
            coolerOffByMin,
            (status, nextTriggerAfterMin) => {
                const dtNextTrigger = Utils.addSecondsToDate(new Date(), nextTriggerAfterMin * 60);
                const formattedNextDt = Utils.formatDateTime(dtNextTrigger);

                Utils.consoleLog(`Cooler current status is ${ status } and the next trigger will be on ${ formattedNextDt }`)
            },
        );
    }
}
