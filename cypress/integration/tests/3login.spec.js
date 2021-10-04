describe('Signing', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/')
        cy.findByText('Login').click()
    })

    it('Customer', () => {
        // cy.visit('/')
        // cy.findByText('Login').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
        // cy.findByText('Logout').click()
    })

    it('Staff', () => {
        // cy.visit('/')
        // cy.findByText('Login').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('staff')
        cy.findByRole('textbox', { name: 'password'}).click().type('staff')
        cy.findByRole('button', { name: 'Login'}).click()
        // cy.wait(3000)
        // cy.findByText('Logout').click()
    })

    it('Owner', () => {
        // cy.visit('/')
        // cy.findByText('Login').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('owner')
        cy.findByRole('textbox', { name: 'password'}).click().type('owner')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
        // cy.findByText('Logout').click()
    })

    it('Manager', () => {
        // cy.visit('/')
        // cy.findByText('Login').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})