/// <reference types="Cypress" />

const faker = require('faker')

describe('Git Clone', () => {
  const project = {
    name: `project-${faker.random.uuid()}`,
    description: faker.random.words(5)
  }

  beforeEach(() => cy.api_createProject(project))

  it('Successfully', () => {
    cy.cloneViaSSH(project)

    cy.readFile(`temp/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })
})
