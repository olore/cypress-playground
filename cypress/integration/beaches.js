/// <reference types="Cypress" />

const { _, $ } = Cypress

context('Window', () => {

  beforeEach(() => {
    cy.visit('https://obe.beaches.com/index.cfm?event=ehOBE.dspHome&checked=true')
  })

  it('do stuff', () => {

    let day1 = Cypress.moment('2019-04-20');
    let day2 = Cypress.moment('2019-04-26');
    let price = '$6,642.00';

    cy.get('#resortcode').select('BNG,B,12');

    cy.get('#checkin_month').select(day1.format('M'));
    cy.get('#checkin_day').select(day1.format('D'));
    cy.get('#checkin_year').select(day1.format('YYYY'));

    cy.get('#departure_month').select(day2.format('M'));
    cy.get('#departure_day').select(day2.format('D'));
    cy.get('#departure_year').select(day2.format('YYYY'));

    cy.get('#adults').select('2');
    cy.get('#children').select('2');
    cy.get('#Child_1').select('15');
    cy.get('#Child_2').select('12');

    cy.get('#btnGetRates > a').click();

    cy.get('.colC', { timeout: 30000 }).then((cols) => {
      let vals = _.map(cols.get(), (col, i) => {
        let text = $(col).text();
        if (/\$/.test(text)) {
          return text.trim().substr(2,10).trim();
        }
      });

      let v = _.compact(vals);
      cy.log('- - - - --  -- -- - - -');
      cy.log(v[0]);
      expect(v[0]).to.equal(price);
    });

  });

})
