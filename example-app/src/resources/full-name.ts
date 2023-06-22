import { bindable } from 'aurelia-framework';

export class FullName {
    @bindable firstName: string;
    @bindable lastName: string;

    public fullName: string;

    public bind() {
        this.fullName = this.firstName + ' ' + this.lastName;
    }
}
