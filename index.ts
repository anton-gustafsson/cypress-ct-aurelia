import { setupHooks } from "@cypress/mount-utils";
import {bootstrap} from 'aurelia-bootstrapper';
import { ComponentTester} from 'aurelia-testing'

let component: ComponentTester;

function cleanup() {
  component?.dispose();
}

interface MountingOptions {
  log: boolean;
}

export function mount(
  component: ComponentTester,
  options: MountingOptions = {
    log: false,
  },
) {
  component.create(bootstrap);

  return cy.wait(0).then(() => {
    if (options.log !== false) {
      Cypress.log({
        name: "mount",
        message: "Mounted component",
      });
    }
  });
}

setupHooks(cleanup);
