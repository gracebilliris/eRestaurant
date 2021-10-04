describe('Logging in', () => {
    it('Going to Login Up Page', () => {
        cy.visit('/')
        cy.findByText('Login').click()
    })

    it('Login Customer', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
    })

    it('Open Report page', () => {
        cy.wait(3000)
        cy.findByText('Report').click()
    })

    it('Pick Location', () => {
        cy.wait(3000)
        cy.get('select').select('true')
    })

    it('Pick 2021-11-21', () => {
        cy.wait(3000)
        cy.findByText('Date: 2021-11-21').click()
    })
})