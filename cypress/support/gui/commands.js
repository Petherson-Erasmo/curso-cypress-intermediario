/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.visit('users/sign_in')

    cy.get('input[data-qa-selector="login_field"]')
        .type(Cypress.env('user_name'))
    cy.get('input[data-qa-selector="password_field"]')
        .type(Cypress.env('user_password'))
    cy.get('input[data-qa-selector="sign_in_button"]')
        .click()
})

Cypress.Commands.add('logout', () => {
    cy.get('a img[class*="qa-user-avatar"]')
        .click()
    cy.contains('Sign out')
        .click()
})

Cypress.Commands.add('gui_createProject', (data) => {
    cy.visit('projects/new')

    cy.get('div[id="blank-project-pane"]')
        .as('blankProject')
    cy.get('@blankProject')
        .find('input[id="project_name"]')
        .type(data.name)
    cy.get('@blankProject')
        .find('textarea[id="project_description"]')
        .type(data.description)
    cy.get('input[id="project_initialize_with_readme"]')
        .check()
    cy.contains('Create project')
        .click()
})

Cypress.Commands.add('gui_createIssue', (data) => {
    cy.visit(`${Cypress.env('user_name')}/${data.project.name}/issues/new`)

    cy.get('input[id="issue_title"]')
        .type(data.title)
    cy.get('textarea[id="issue_description"]')
        .type(data.description)
    cy.contains('Submit issue')
        .click()  
})