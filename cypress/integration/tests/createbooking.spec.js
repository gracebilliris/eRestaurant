describe("Login", () => {
    // Only Uncomment if user is not made
    // it('Going to Sign Up Page', () => {
    //     cy.visit('/')
    //     cy.findByText('Sign Up').click()
    // })

    // it('Signing up', () => {
    //     cy.findByRole('textbox', { name: 'username'}).click().type('restaurantCustomer')
    //     cy.findByRole('textbox', { name: 'email'}).click().type('restaurantCustomer@gmail.com')
    //     cy.findByRole('textbox', { name: 'password'}).click().type('restaurantCustomer')
    //     cy.findByRole('button', { name: 'Sign Up'}).click()
    // })

    it('Going to Login Page', () => {
        cy.visit('/')
        cy.findByText('Login').click()
    })

    it('Log in', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('restaurantCustomer')
        cy.findByRole('textbox', { name: 'password'}).click().type('restaurantCustomer')
        cy.findByRole('button', { name: 'Login'}).click()
        cy.wait(1000)
    })
})

describe("CreateBooking", () => {
    it('Going to Sign Up Page', () => {
        cy.findByText('Create Booking').click()
    })

    it('Enter date', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
    })

    it('Enter time', () => {
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')
    })

    it('Enter seats', () => {
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
    })

    it('Select Code', () => {
        cy.get('select').select('10$OFF')
    })
    
    it('Order Chicken Caesar Salad', () => {
        cy.findByText('Chicken Caesar Salad, $20').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
    })

    it('Order Charcuterie Board', () => {
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
    })

    it('Remove Charcuterie Board', () => {
        cy.findByText('Charcuterie Board, qty:4, $120').click()
        cy.wait(1000)
    })

    it('Submit Order', () => {
        cy.findByRole('button', { name: 'Submit'}).click()
    })
})