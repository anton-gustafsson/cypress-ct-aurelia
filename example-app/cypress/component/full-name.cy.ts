import { StageComponent } from 'aurelia-testing';

describe('full-name', () => {
    it('should load', () => {
        const component = StageComponent.withResources('resources/full-name')
            .inView('<full-name first-name.bind="firstName" last-name.bind="lastName"></full-name>')
            .boundTo({ firstName: 'Bob', lastName: 'Smith' });

        cy.mount(component);

        cy.get(`[data-cy=first-name]`).should('have.text', 'Bob');
        cy.get(`[data-cy=last-name]`).should('have.text', 'Smith');

        cy.get(`[data-cy=full-name]`).should('have.text', 'Bob Smith');
    });
});
