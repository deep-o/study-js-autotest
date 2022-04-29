/// <reference types="cypress" />
describe('Приложение игра в пары', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('button').contains('Начать игру').click();
  });

  it('в начальном состоянии игра имеет поле 4х4, цифры невидимы', () => {
    cy.get('.card-in-game').should('have.length', 16);
    cy.get('ul li').should('not.have.class', 'flip');
  });

  it('открывается произвольная карточка', () => {
    const number = Math.floor(Math.random() * 14 + 1);
    cy.get(`ul li:nth-child(${number})`).click().should('have.class', 'flip');
  });

  it('находятся парные карточки и состаются открытыми', () => {
    let isMatch = false;
    cy.get('ul li:first-child').then((firstCard) => {
      const firstValue = firstCard.children().text();

      for (let i = 2; i <= 16; i++) {
        cy.get('ul li:first-child')
          .click()
          .then(() => {
            if (!isMatch) {
              // eslint-disable-next-line cypress/no-unnecessary-waiting
              cy.get(`ul li:nth-child(${i})`)
                .click()
                .wait(301)
                .then((card) => {
                  const thisValue = card.children().text();
                  if (firstValue === thisValue) {
                    cy.get('.flip').should('have.length', 2);
                    isMatch = true;
                  }
                });
            }
          });
      }
    });
  });

  it('если открытые карточки не совпадают, то они закрываются', () => {
    function matchingCards(number) {
      cy.get(`ul li:nth-child(${number})`)
        .click()
        .then((firstCard) => {
          const firstValue = firstCard.children().text();
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.get(`ul li:nth-child(${number + 1})`)
            .click()
            .wait(301)
            .then((secondCard) => {
              const secondValue = secondCard.children().text();
              if (firstValue === secondValue) {
                matchingCards(number + 2);
              } else {
                cy.get('.flip').should('have.length', number - 1);
              }
            });
        });
    }

    matchingCards(1);
  });
});
