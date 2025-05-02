describe('Hospital', () => { 
  beforeEach(() => { 
    cy.visit('https://x-medify-xi.vercel.app'); 
  }); 

  it('should display state and city dropdowns', () => { 
    cy.get('div#state').should('be.visible'); 
    cy.get('div#city').should('be.visible'); 
  }); 

  it('should fetch hospitals when both state and city are selected', () => { 
    cy.intercept('GET', 'https://meddata-backend.onrender.com/data?state=Alabama&city=DOTHAN', { 
      fixture: 'hospitals.json', 
    }).as('getHospitals'); 
    
    // Type into state input and select from dropdown
    cy.get('div#state input').type('Alabama');
    cy.get('.SearchPop li').contains('Alabama').click();
    
    // Type into city input and select from dropdown
    cy.get('div#city input').should('not.be.disabled').type('DOTHAN');
    cy.get('.SearchPop li').contains('DOTHAN').click();
    
    cy.get('#searchBtn').should('contain.text', 'Search').click(); 
    cy.wait('@getHospitals'); 
    cy.get('h1').should('contain.text', '2 medical centers available in dothan'); 
  }); 
});