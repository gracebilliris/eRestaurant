describe('Changing Email', () => {
    it('Logging in', () => {
        cy.visit('/login')
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantOwner')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantOwner')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.visit('/account')
        cy.findByRole('textbox', { name: 'email'}).click().type('restaurant@gmail.com')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurant')
        cy.findByRole('button', { name: 'Update'}).click()
    })
})