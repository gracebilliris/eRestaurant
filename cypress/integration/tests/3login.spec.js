describe('Logging in as different Users', () => {
    it('Going to Login Page', () => {
        cy.visit('/')
        cy.findByText('Login').click()
    })

    it('Customer', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
    })

    it('Staff', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('staff')
        cy.findByRole('textbox', { name: 'password'}).click().type('staff')
        cy.findByRole('button', { name: 'Login'}).click()
    })

    it('Owner', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('owner')
        cy.findByRole('textbox', { name: 'password'}).click().type('owner')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
    })

    it('Manager', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})