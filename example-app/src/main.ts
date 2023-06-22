import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia: Aurelia): void {
    aurelia.use.standardConfiguration().feature(PLATFORM.moduleName('resources/index'));

    aurelia.use.developmentLogging(!PRODUCTION ? 'debug' : 'warn');

    // if (environment.testing) {
    //     aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    // }

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
