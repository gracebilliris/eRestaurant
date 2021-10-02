describe('Changing Email', () => {
    it('Logging in', () => {
        cy.visit('/login')
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantOwner')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantOwner')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
    })
    
    it('Enter Email', () => {
        cy.wait(2000)
        cy.findByRole('textbox', { name: 'email'}).click().type('restaurant@gmail.com')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurant')
        cy.findByRole('button', { name: 'Update'}).click()
    })

    it('Logging out', () => {
        cy.wait(1000)
        cy.findByText('Logout').click()
    })
})