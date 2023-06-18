Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
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

Cypress.Commands.add('gui_setLabelOnIssue', data => {
    cy.get('a[class*="qa-edit-link-labels"]')
        .click()
    cy.contains(data.name)
        .click()
    cy.get('body')
        .click()
})


Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('div[class*="block milestone"]')
        .find('a[class*="edit-link"]')
        .click()
    cy.contains(milestone.title)
        .click()
})
