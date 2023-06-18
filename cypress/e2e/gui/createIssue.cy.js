import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Issue', options, () => {
    
    const  issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(6),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(7)
        }
    }
    
    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createProject(issue.project)
    })

    it('Successfully', ()=>{
        cy.gui_createIssue(issue)

        cy.get('div[class*="issue-details"]')
            .should('contain', issue.title)
            .and('contain', issue.description)
    })
})