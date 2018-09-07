/// <reference types="Cypress" />

const { _, $ } = Cypress

var outfile = '/Users/brian/dev/beaches' + '/output.log';

checkPrices({ name: 'Beaches Negril', code: 'BNG,B,12' });
checkPrices({ name: 'Beaches Turks',  code: 'BTC,B,14' });

function checkPrices(resort) {

  describe('Beaches', () => {

    before(() => {
      cy.exec(`echo "${resort.name} checked on \`date "+%Y-%m-%d %H:%M %Z"\`" >> ${outfile}`)
    })

    describe('price checker', () => {

      beforeEach(() => {
        cy.visit('https://obe.beaches.com/index.cfm?event=ehOBE.dspHome&checked=true')
        cy.get('#resortcode').select(resort.code);
      })

      it('Easter 2019', () => {
        let day1 = Cypress.moment('2019-04-20');
        let day2 = Cypress.moment('2019-04-26');
        setDates(day1, day2);

        cy.get('#Child_1').select('15');
        cy.get('#Child_2').select('12');

        cy.get('#btnGetRates > a').click();

        doit('Easter  2019');
      });

      it('NJ Week 2019', () => {
        let day1 = Cypress.moment('2019-11-02');
        let day2 = Cypress.moment('2019-11-08');
        setDates(day1, day2);
        cy.get('#Child_1').select('15');
        cy.get('#Child_2').select('12');
        cy.get('#btnGetRates > a').click();

        doit('NJ Week 2019');
      });

      it('Easter 2020', () => {
        let day1 = Cypress.moment('2020-04-11');
        let day2 = Cypress.moment('2020-04-17');
        setDates(day1, day2);
        cy.get('#adults').select('3');
        cy.get('#children').select('1');
        cy.get('#Child_1').select('13');
        cy.get('#btnGetRates > a').click();

        doit('Easter  2020');
      });

      it('NJ Week 2020', () => {
        let day1 = Cypress.moment('2020-10-31');
        let day2 = Cypress.moment('2020-11-06');
        setDates(day1, day2);
        cy.get('#adults').select('3');
        cy.get('#children').select('1');
        cy.get('#Child_1').select('14');
        cy.get('#btnGetRates > a').click();

        doit('NJ Week 2020');
      });

      it('Easter 2021', () => {
        let day1 = Cypress.moment('2021-03-27');
        let day2 = Cypress.moment('2021-04-02');
        setDates(day1, day2);
        cy.get('#adults').select('3');
        cy.get('#children').select('1');

        cy.get('#Child_1').select('13');
        cy.get('#btnGetRates > a').click();

        doit('Easter  2021');
      });


      function setDates(day1, day2) {
        cy.get('#checkin_month').select(day1.format('M'));
        cy.get('#checkin_day').select(day1.format('D'));
        cy.get('#checkin_year').select(day1.format('YYYY'));

        cy.get('#departure_month').select(day2.format('M'));
        cy.get('#departure_day').select(day2.format('D'));
        cy.get('#departure_year').select(day2.format('YYYY'));

        cy.get('#adults').select('2');
        cy.get('#children').select('2');
      }

      function doit(str) {
        cy.get('.colC', { timeout: 30000 }).then((cols) => {
          let vals = _.map(cols.get(), (col, i) => {
            let text = $(col).text();
            if (/\$/.test(text)) {
              text = text.trim().substr(2, 10).replace(',', '').replace('$', '').trim();
              return _.parseInt(text);
            }
          });
          vals = _.compact(vals);
          if (vals.length > 0) {
            let v = vals.sort((a, b) => a - b);
            let output = str + ': \\$' + v[0];
            cy.exec(`echo "${output}" >> ${outfile}`)
          } else {
            cy.exec(`echo "${str}: SOLD OUT" >> ${outfile}`)
          }
        });
      }

    })
  })
}