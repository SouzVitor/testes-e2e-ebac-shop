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

        describe('Funcionalidade Página de produtos', () => {

            before(() => {
                cy.visit('produtos/')
        
            });
        
            it('Deve selecionar um produto da lista', () => {
                cy.get('[class="product-block grid"]')
                    .first()
                    .click()
        
                cy.get('[class="product-block grid"]')
                    .last()
                    .click()
        
                cy.get('[class="product-block grid"]')
                    .eq(2)
                    .click()
                
                cy.visit('produtos/page/2/')
                cy.get('[class="product-block grid"]')
                .contains('Autumn Pullie')
                .click()
        
            });
        
            it('Deve adicionar um produto ao carrinho', () => {
                var quantidade = 5
                
                cy.visit('produtos/page/2/')
                cy.get('[class="product-block grid"]')
                .contains('Autumn Pullie').click()
                cy.get('.button-variable-item-S').click()
                cy.get('.button-variable-item-Red').click()
                cy.get('.input-text').clear().type(quantidade)
                cy.get('.single_add_to_cart_button').click()
        
                cy.get('.dropdown-toggle > .mini-cart-items').should('contain' , quantidade)
                cy.get('.woocommerce-message').should('contain', quantidade + ' × “Autumn Pullie” foram adicionados no seu carrinho.')
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
    });