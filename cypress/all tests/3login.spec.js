describe('Logging in as different Users', () => {
    it('As a Customer', () => {
        cy.visit('/login')
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.findByText('Logout').click()
    })

    it('As a Staff', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('staff')
        cy.findByRole('textbox', { name: 'password'}).click().type('staff')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.findByText('Logout').click()
    })

    it('As an Owner', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('owner')
        cy.findByRole('textbox', { name: 'password'}).click().type('owner')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.findByText('Logout').click()
    })

    it('As a Manager', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})