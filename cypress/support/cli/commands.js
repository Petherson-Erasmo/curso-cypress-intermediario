/// <reference types="Cypress" />

Cypress.Commands.add('cloneViaSSH', data => {
    const domain = Cypress.config('baseUrl').replace('http://', '').replace('/', '')

    cy.exec(`cd temp/ && git clone git@${domain}:${Cypress.env('user_name')}/${data.name}.git`)
  })
  