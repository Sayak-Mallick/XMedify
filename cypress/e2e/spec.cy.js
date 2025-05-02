describe('Hospital', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage()
  })

  it('should display all booked slots on the My Bookings page', () => {
    // Set up test data in localStorage
    const testBooking = {
      id: 1,
      hospitalName: 'Test Hospital',
      date: '2024-03-15',
      time: '10:00 AM',
      address: '123 Test St'
    }
    
    cy.window().then((win) => {
      win.localStorage.setItem('bookings', JSON.stringify([testBooking]))
    })

    // Visit the my-bookings page
    cy.visit('/my-bookings')

    // Verify the booking is displayed
    cy.get('h3').should('contain', 'Test Hospital')
    cy.get('p').should('contain', '2024-03-15')
    cy.get('p').should('contain', '10:00 AM')
  })

  it('should persist bookings in localStorage after page reload', () => {
    // Set up test data
    const testBooking = {
      id: 1,
      hospitalName: 'Test Hospital',
      date: '2024-03-15',
      time: '10:00 AM',
      address: '123 Test St'
    }
    
    cy.window().then((win) => {
      win.localStorage.setItem('bookings', JSON.stringify([testBooking]))
    })

    // Visit page and verify initial state
    cy.visit('/my-bookings')
    cy.get('h3').should('contain', 'Test Hospital')

    // Reload page
    cy.reload()

    // Verify data persists
    cy.get('h3').should('contain', 'Test Hospital')
    cy.get('p').should('contain', '2024-03-15')
    cy.get('p').should('contain', '10:00 AM')
  })
})