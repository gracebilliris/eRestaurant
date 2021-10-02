describe('Signing', () => {
    it('Going to Sign Up Page', () => {
        cy.visit('/login')
    })

    it('Log into Manager', () => {
        cy.wait(1000)
        cy.findByRole('textbox', { name: 'username'}).click().type('manager')
        cy.findByRole('textbox', { name: 'password'}).click().type('manager')
        cy.findByRole('button', { name: 'Login'}).click()
    })
})

describe('View Codes', () => {
    it('Go to Code Page', () => {
        cy.wait(1000)
        cy.findByText('Codes').click()
    })

    it('View 10$OFF', () => {
        cy.findByText('10$OFF').click()
        cy.wait(1000)
    })

    it('View 5%OFF', () => {
        cy.findByText('5%OFF').click()
        cy.wait(1000)
    })

    it('View 50%OFF', () => {
        cy.findByText('50%OFF').click()
        cy.wait(1000)
    })
})

describe('Add Codes', () => {
    it('Open Create Code Page', () => {
        cy.findByText('Create a Code').click()
        cy.wait(1000)
    })

    it('Create 20%OFF', () => {
        cy.findByRole('textbox', {name: 'amount'}).click().type('20')
        cy.findByRole('radio', {name: '%'}).click()
        cy.findByRole('textbox', {name: 'description'}).click().type('20% off your total order')
        cy.findByRole('button', { name: 'Create'}).click()
        cy.wait(1000)
    })
})

describe('Change Code Description', () => {
    it('Edit 10$OFF', () => {
        cy.findByText('10$OFF').click()
        cy.wait(1000)
        cy.findByText('Edit').click()
        cy.wait(1000)
    })

    it('Change Description', () => {
        cy.findByRole('textbox', {name: 'description'}).click().clear()
        cy.findByRole('textbox', {name: 'description'}).click().type('$10 off')
        cy.findByRole('button', {name: 'Update'}).click()
        cy.wait(1000)
    })

    it('Go to Code Page', () => {
        cy.wait(1000)
        cy.findByText('Go Back?').click()
    })
})

describe('Delete Code', () => {
    it('Edit 20%OFF', () => {
        cy.findByText('20%OFF').click()
        cy.wait(1000)
        cy.findByText('Edit').click()
        cy.wait(1000)
    })

    it('Delete', () => {
        cy.findByRole('button', {name: 'Delete'}).click()
        cy.wait(1000)
    })
})