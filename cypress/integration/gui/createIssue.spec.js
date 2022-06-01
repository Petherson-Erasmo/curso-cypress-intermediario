/// <reference types="Cypress" />

const faker = require('faker')

describe('Create Issue', ()=> {
    
    const  issue = {
        title: `issue-${faker.random.uuid()}`,
        description: faker.random.words(6),
        project: {
            name: `project-${faker.random.uuid()}`,
            description: faker.random.words(7)
        }
    }
    
    beforeEach(() => {
        cy.login()
        cy.gui_createProject(issue.project)
    })

    it('Successfully', ()=>{
        cy.gui_createIssue(issue)

        cy.get('div[class*="issue-details"]')
            .should('contain', issue.title)
            .and('contain', issue.description)
    })
})