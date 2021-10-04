describe('View Lunch Menu', () => {
    it('Open Lunch page', () => {
        cy.visit('/lunchmenu')
    // })

    // it('View Chicken Caesar Salad', () => {
        cy.findByText('Chicken Caesar Salad').click()
        cy.wait(2000)
    // })

    // it('View Charcuterie Board', () => {
        cy.findByText('Charcuterie Board').click()
        cy.wait(2000)
    // })

    // it('View Honey Mustard Tuna and Sweet Potato Salad', () => {
        cy.findByText('Honey Mustard Tuna and Sweet Potato Salad').click()
        cy.wait(2000)
    // })

    // it('Open Lunch page', () => {
        cy.visit('/dinnermenu')
    // })

    // it('View Lasagna', () => {
        cy.findByText('Lasagna').click()
        cy.wait(2000)
    // })

    // it('View Beef Burger', () => {
        cy.findByText('Beef Burger').click()
        cy.wait(2000)
    // })

    // it("View Pizza d'Andre", () => {
        cy.findByText("Pizza d'Andre").click()
        cy.wait(2000)
    })
})