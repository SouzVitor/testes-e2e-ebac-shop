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

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('[class="product-block grid"]')
            .first()
            .click()
        cy.get('.single_add_to_cart_button').click()
        cy.get(':nth-child(1) > .item > .products-grid > .product-block').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get(':nth-child(2) > .item > .products-grid > .product-block').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get(':nth-child(3) > .item > .products-grid > .product-block').click()
        cy.get('.single_add_to_cart_button').click()       
        cy.get('.woocommerce-message > .button').click() 
        cy.get('.checkout-button').click()
               

        let nomefaker = faker.name.firstName()
        let sobrenomefaker = faker.name.lastName()
        let endereco = faker.address.city()
        let empresa = faker.company.companyName()
        let cidade = faker.address.cityName()
        let cep = faker.address.zipCode()
        let telefone = faker.phone.phoneNumber()
        let emailfaker = faker.internet.email(nomefaker)

        cy.get('#billing_first_name').type(nomefaker)
        cy.get('#billing_last_name').type(sobrenomefaker)
        cy.get('#billing_company').type(empresa)
        cy.get('#billing_address_1').type(endereco)
        cy.get('#billing_city').type(cidade)  
        cy.get('#billing_postcode').type(cep) 
        cy.get('#billing_phone').type(telefone)
        cy.get('#billing_email').type(emailfaker) 
        
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
            

    });

  

});