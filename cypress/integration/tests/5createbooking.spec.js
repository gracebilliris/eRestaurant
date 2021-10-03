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
    })
})

describe("Picking invaild date", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Create Booking').click()
    })

    it('Enter Past date', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2020-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })

    let date_ob = new Date();
    let currentDay = ("0" + date_ob.getDate()).slice(-2);
    let currentMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let currentYear = date_ob.getFullYear();

    it('Enter Current date', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type(currentYear + '-' + currentMonth + '-' + currentDay)
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })
})

describe("Picking invaild time", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Enter time', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2022-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('07:00')
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'time'}).click().type('23:00')       
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })
})

describe("150 plus seats", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Enter 150 plus seats', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2022-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('11:00')     
        cy.findByRole('textbox', { name: 'seats'}).click().type('151')
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })
})

describe("Make booking with 2 items for Lunch with 10$OFF", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Create Booking', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.get('select').select('10$OFF')
        cy.findByText('Chicken Caesar Salad, $10').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })
})

describe("Make booking with 1 items for Dinner with 50%OFF", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Create Booking', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('17:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.get('select').select('50%OFF')
        cy.findByText('Beef Burger, $20').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })
})

describe("Remove Item from Added List", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Create Booking', () => {
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, qty:4, $120').click()
        cy.wait(3000)
    })
})

describe("Use Different Code", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Create Booking', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByText('Chicken Caesar Salad, $10').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.get('select').select('10$OFF')
        cy.wait(500)
        cy.get('select').select('50%OFF')
        cy.wait(3000)
    })
})

describe("Make Booking with no Codes", () => {
    it('Going to Booking Page', () => {
        cy.findByText('Home').click()
        cy.findByText('Create Booking').click()
    })

    it('Create Booking', () => {
        cy.findByRole('textbox', { name: 'date'}).click().type('2021-11-21')
        cy.findByRole('textbox', { name: 'time'}).click().type('14:00')    
        cy.findByRole('textbox', { name: 'seats'}).click().type('14')
        cy.findByText('Chicken Caesar Salad, $10').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('2')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByText('Charcuterie Board, $30').click()
        cy.wait(3000)
        cy.findByRole('textbox', { name: 'quantity'}).click().type('4')
        cy.findByRole('button', { name: 'Add Item'}).click()
        cy.findByRole('button', { name: 'Submit'}).click()
        cy.wait(3000)
    })
})