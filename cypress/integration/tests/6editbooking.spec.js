describe('Logging in', () => {
    it('Going to Login Up Page', () => {
        cy.visit('/')
        cy.findByText('Login').click()
    })
    
    it('Login Customer', () => {
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(3000)
    })

    it('Open Booking page', () => {
        cy.findByText('Create Booking').click()
    })

    it('Make Order', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-25')
        cy.findByRole('textbox', { name: 'time'}).click().type('11:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('4')
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
        cy.findByText('My Bookings').click()
    })

    it('Pick Booking', () => {
        cy.findByText('Date: 2021-11-25 ; Time: 11:00').click()
        cy.wait(3000)
        cy.findByText('Edit').click()
        cy.wait(3000)
    })

    it('Enter time', () => {
        cy.findByRole('textbox', { name: 'time'}).click().type('07:00')
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'time'}).click().type('23:00')   
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })

    it('Pick Booking to Edit', () => {
        cy.findByText('Date: 2021-11-25 ; Time: 11:00').click()
        cy.findByText('Edit').click()
    })

    it('Enter 150 plus seats', () => {  
        cy.findByRole('textbox', { name: 'seats'}).click().clear()
        cy.findByRole('textbox', { name: 'seats'}).click().type('151')
        cy.findByRole('button', { name: 'Update'}).click()
        cy.wait(3000)
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })

    it('Pick booking to Edit', () => {
        cy.findByText('Date: 2021-11-25 ; Time: 11:00').click()
        cy.findByText('Edit').click()
    })

    it('Remove Item', () => {
        cy.findByText('Charcuterie Board, qty:4, $120').click()
        cy.wait(3000)
        cy.findByRole('button', { name: 'Update'}).click()
        cy.wait(3000)
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })

    it('Pick Booking to edit', () => {
        cy.findByText('Date: 2021-11-25 ; Time: 11:00').click()
        cy.findByText('Edit').click()
    })

    it('Add Item', () => {
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Update'}).click()
        cy.wait(3000)
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })

    it('pick Booking to Edit', () => {
        cy.findByText('Date: 2021-11-25 ; Time: 11:00').click()
        cy.findByText('Edit').click()
    })

    it('Enter 1pm', () => {
        cy.findByRole('textbox', { name: 'time'}).click().type('13:00')    
        cy.findByText('Go Back?').click()
        cy.wait(3000)
    })

    it('pick booking to Edit', () => {
        cy.findByText('Date: 2021-11-25 ; Time: 11:00').click()
        cy.findByText('Edit').click()
    })

    it('Change time period', () => {
        cy.findByRole('textbox', { name: 'time'}).click().type('17:00')
        cy.wait(3000)
    })

    it('Create Booking', () => {   
        cy.findByRole('textbox', { name: 'seats'}).click().type('2')
        cy.findByText('Beef Burger, $20').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Update'}).click()
        cy.wait(3000)
    })

    it('pick Booking to edit', () => {
        cy.visit('/login')
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.findByText('My Booking').click()
        cy.wait(3000)
        cy.findByText('Date: 2021-11-25 ; Time: 17:00').click()
        cy.findByText('Edit').click()
    })

    it('Delete', () => {
        cy.findByRole('button', { name: 'Delete'}).click()
        cy.wait(3000)
    })
})