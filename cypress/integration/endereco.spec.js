///<reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
   beforeEach(() => {
    cy.visit('minha-conta')
    cy.fixture('perfil').then(dados =>{
    cy.login(dados.usuario, dados.senha)
    })
    
   });

    it('Deve fazer cadastro de faturamento com sucesso', () => {
        EnderecoPage.editarEnderecoFaturamento('Cheyenne', 'Lima', 'VGS Consult', 'Brasil', 'Rua Praia Canoa Quebrada', '262', 'Manaus', 'Amazonas', '69041360', '92 984690615', 'cheyenne@vgsconsult.com.br')
        cy.get('.woocommerce-message').should('contain' , 'Endereço alterado com sucesso.')
        
        
    });

    it.only('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de dados', () => {
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[2].nome,
            dadosEndereco[2].sobrenome,
            dadosEndereco[2].empresa,
            dadosEndereco[2].pais,
            dadosEndereco[2].endereco,
            dadosEndereco[2].numero,
            dadosEndereco[2].cidade,
            dadosEndereco[2].estado,
            dadosEndereco[2].cep,
            dadosEndereco[2].telefone,
            dadosEndereco[2].email
            )
        cy.get('.woocommerce-message').should('contain' , 'Endereço alterado com sucesso.')
        
        
    });
});