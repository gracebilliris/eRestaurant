describe('Signing up & Logging in', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/login')
        cy.findByText('Sign Up').click()
    })

    it('Signing up', () => {
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantOwner')
        cy.findByRole('textbox', { name: 'email'}).click().type('restaurantOwner@gmail.com')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantOwner')
        cy.findByRole('button', { name: 'Sign Up'}).click()
    })

    it('Logging in', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantOwner')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantOwner')
        cy.findByText('Login').click()
    })
})