describe('Signing', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/login')
    })

    it('Log into Customer', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})

describe('Change Email', () => {
    it('Enter Email', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'email'}).click().type('user123@gmail.com')
        cy.findByRole('textbox', { name: 'password'}).click().type('1234567')
        cy.findByRole('button', { name: 'Update'}).click()
    })
})