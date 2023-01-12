/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
faker.locale = 'pt_BR';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    describe('Fazendo a escolha dos produtos', () => {

        before(() => {
            cy.visit('produtos/')

        });

        it('Deve selecionar um produto da lista', () => {
            cy.get('[class="product-block grid"]')
                .first()
                .click()


            cy.visit('produtos/page/2/')
            cy.get('[class="product-block grid"]')
                .contains('Autumn Pullie')
                .click()

            // Deve adicionar produtos ao carrinho'

            cy.visit('produtos/page/2/')
            cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', 4)


            // 'Preenchendo todas opções no checkout'

            let nomefaker = faker.name.firstName()
            let sobrenomefaker = faker.name.lastName()
            let endereco = faker.address.city()
            let empresa = faker.company.companyName()
            let cidade = faker.address.cityName()
            let cep = faker.address.zipCode()
            let telefone = faker.phone.phoneNumber()
            let emailFaker = faker.internet.email()

            cy.get('#billing_first_name').type(nomefaker)
            cy.get('#billing_last_name').type(sobrenomefaker)
            cy.get('#billing_company').type(empresa)
            cy.get('#billing_address_1').type(endereco)
            cy.get('#billing_city').type(cidade)
            cy.get('#billing_postcode').type(cep)
            cy.get('#billing_phone').type(telefone)
            cy.get('#billing_email').type(emailFaker)

            // 'validando minha compra ao final'

            cy.get('#payment_method_cod').click()
            cy.get('#terms').click()
            cy.get('#place_order').click()

            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

        });

    });
});              