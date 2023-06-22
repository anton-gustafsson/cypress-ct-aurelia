import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia: Aurelia): void {
    aurelia.use.standardConfiguration();

    aurelia.use.developmentLogging(!PRODUCTION ? 'debug' : 'warn');

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
