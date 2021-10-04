describe('Signing', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/login')
    })

    it('Customer', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
        // cy.findByText('Logout').click()
    })

    it('Staff', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('staff')
        cy.findByRole('textbox', { name: 'password'}).click().type('staff')
        cy.findByRole('button', { name: 'Login'}).click()
        // cy.wait(3000)
        // cy.findByText('Logout').click()
    })

    it('Owner', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('owner')
        cy.findByRole('textbox', { name: 'password'}).click().type('owner')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
        // cy.findByText('Logout').click()
    })

    it('Manager', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})