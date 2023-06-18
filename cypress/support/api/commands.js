const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_createIssue', data => {
  cy.api_createProject(data.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues`,
        body: {
          title: data.title,
          description: data.description
        },
        headers: { Authorization: accessToken },
      })
    })
})

Cypress.Commands.add('api_createLabel', (data1, data2) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${data1}/labels`,
    body: {
      name: data2.name,
      color: data2.color
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_createMilestone', (data1, data2) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${data1}/milestones`,
    body: { title: data2.title },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  cy.api_getAllProjects().then(res =>
    res.body.forEach(project => cy.request({
      method: 'DELETE',
      url: `/api/v4/projects/${project.id}`,
      headers: { Authorization: accessToken },
    }))
  )
})
