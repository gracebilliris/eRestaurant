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

    it('Open Booking page', () => {
        cy.wait(3000)
        cy.findByText('Create Booking').click()
    })

    it('Make Order', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.get('select').select('10$OFF')
        cy.findByText('Chicken Caesar Salad, $20').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Honey Mustard Tuna and Sweet Potato Salad, $20').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('3')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })

    it('Open View page', () => {
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