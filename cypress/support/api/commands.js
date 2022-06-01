/// <reference types="Cypress" />

const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_createProject', data => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/?private_token=${accessToken}`,
        body: {
            name: data.name,
            description: data.description,
            initialize_with_readme: true
        }
    })
})

Cypress.Commands.add('api_createIssue', data => {
    cy.api_createProject(data.project)
        .then(response => {
            cy.request({
                method: 'POST',
                url: `/api/v4/projects/${response.body.id}/issues?private_token=${accessToken}`,
                body: {
                    title: data.title,
                    description: data.description
                }
            })
        })
})

Cypress.Commands.add('api_createLabel', (data1, data2) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${data1}/labels?private_token=${accessToken}`,
        body: {
            name: data2.name,
            color: data2.color
        }
    })
})

Cypress.Commands.add('api_createMilestone', (data1, data2) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${data1}/milestones?private_token=${accessToken}`,
        body: { title: data2.title }
    })
})
