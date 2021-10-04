describe('Editing Menu Function', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/login')
    })

    it('Log into Manager', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
    })

    it('Go to Menu Page', () => {
        cy.wait(3000)
        cy.findByText('Menu Items').click()
    })

    it('View Chicken Caesar Salad', () => {
        cy.findByText('Chicken Caesar Salad').click()
        cy.wait(500)
    })

    it('View Charcuterie Board', () => {
        cy.findByText('Charcuterie Board').click()
        cy.wait(500)
    })

    it('View Honey Mustard Tuna and Sweet Potato Salad', () => {
        cy.findByText('Honey Mustard Tuna and Sweet Potato Salad').click()
        cy.wait(500)
    })

    it('View Lasagna', () => {
        cy.findByText('Lasagna').click()
        cy.wait(500)
    })

    it('View Beef Burger', () => {
        cy.findByText('Beef Burger').click()
        cy.wait(500)
    })

    it("View Pizza d'Andre", () => {
        cy.findByText("Pizza d'Andre").click()
        cy.wait(500)
    })

    it('Open Chicken Caesar Salad', () => {
        cy.findByText('Chicken Caesar Salad').click()
        cy.wait(3000)
        cy.findByText('Edit').click()
    })

    it('Change Price to $10', () => {
        cy.findByRole('textbox', {name: 'price'}).click().clear()
        cy.findByRole('textbox', {name: 'price'}).click().type('10')
        cy.findByRole('button', { name: 'Update'}).click()
        cy.wait(3000)
    })

    it('Back to Menu', () => {
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })

    it('Open Lasagna', () => {
        cy.findByText('Lasagna').click()
        cy.wait(3000)
        cy.findByText('Edit').click()
    })

    it('Add Ingredient', () => {
        cy.findByRole('textbox', {name: 'ingredients'}).click().type(',cheddar')
        cy.findByRole('button', { name: 'Update'}).click()
        cy.wait(3000)
    })

    it('Back to Menu', () => {
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })
})