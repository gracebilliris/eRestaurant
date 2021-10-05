describe('Discount Code Function', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/login')
    })

    it('Login as a Manager', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
        cy.findByText('Codes').click()
    })

    it('View 5%OFF', () => {
        cy.findByText('5%OFF').click()
        cy.wait(3000)
    })

    it('View 50%OFF', () => {
        cy.findByText('50%OFF').click()
        cy.wait(3000)
    })

    it('Open Create Code Page', () => {
        cy.findByText('Create a Code').click()
        cy.wait(3000)
    })

    it('Create 20%OFF', () => {
        cy.findByRole('textbox', {name: 'amount'}).click().type('20')
        cy.findByRole('radio', {name: '%'}).click()
        cy.findByRole('textbox', {name: 'description'}).click().type('20% off your total order')
        cy.findByRole('button', { name: 'Create'}).click()
        cy.wait(3000)
    })

    it('Delete 20%OFF', () => {
        cy.findByText('20%OFF').click()
        cy.wait(3000)
        cy.findByText('Edit').click()
        cy.wait(1000)
        cy.findByRole('button', {name: 'Delete'}).click()
    })
})