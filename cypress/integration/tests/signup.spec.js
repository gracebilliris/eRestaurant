describe('Signing', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/')
        cy.findByText('Sign Up').click()
    })

    it('Signing up', () => {
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantOwner')
        cy.findByRole('textbox', { name: 'email'}).click().type('restaurantOwner@gmail.com')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantOwner')
        cy.findByRole('button', { name: 'Sign Up'}).click()
    })

    it('Log in', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantOwner')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantOwner')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})