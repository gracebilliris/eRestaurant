describe('Create Booking Function', () => {
    it('Going to Login Up Page', () => {
        cy.visit('/login')
    })
    
    it('Login as a Customer', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
    })

    it('Attempt to create a booking with a past date', () => {
        cy.findByText('Create Booking').click()
        cy.findByRole('textbox', { name: 'date'}).click().type('2020-11-21')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Attempt to add a current date to the booking', () => {
        let date_ob = new Date();
        let currentDay = ("0" + date_ob.getDate()).slice(-2);
        let currentMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let currentYear = date_ob.getFullYear();
        cy.findByRole('textbox', { name: 'date'}).click().clear().type(currentYear + '-' + currentMonth + '-' + currentDay)
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Add a valid date to the booking', () => {
        cy.findByRole('textbox', { name: 'date'}).click().clear().type('2021-11-25')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Attempt to add an invalid time to the booking', () => {
        cy.findByRole('textbox', { name: 'time'}).click().type('07:00')
        cy.wait(1000)
    })

    it('Add a valid time to the booking', () => {
        cy.findByRole('textbox', { name: 'time'}).click().clear().type('16:00')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Attempt to add more than 150 seats to the booking', () => {
        cy.findByRole('textbox', { name: 'seats'}).click().type('151')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Add a valid amount of seats to the booking', () => {    
        cy.findByRole('textbox', { name: 'seats'}).click().type('{backspace}{backspace}').type('14')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Creating another booking', () => {
        cy.visit('/login')
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.visit('booking/create/user')
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByText('Chicken Caesar Salad, $10').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Create another booking', () => {
        cy.visit('/login')
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.visit('booking/create/user')
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('17:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.get('select').select('50%OFF')
        cy.findByText('Beef Burger, $20').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Create another booking', () => {
        cy.visit('/login')
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.visit('booking/create/user')
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-12-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')   
        cy.findByRole('textbox', { name: 'seats'}).click().type('5') 
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, qty:4, $120').click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Create another booking', () => {
        cy.visit('/login')
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.visit('booking/create/user')
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByText('Chicken Caesar Salad, $10').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.get('select').select('50%OFF')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })

    it('Create another booking', () => {
        cy.visit('/login')
        cy.findByRole('textbox', { name: 'username'}).click().type('user')
        cy.findByRole('textbox', { name: 'password'}).click().type('user')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
        cy.visit('booking/create/user')
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByText('Chicken Caesar Salad, $10').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(1000)
    })
})