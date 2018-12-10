const Joi = require('joi');
const formula1Repository = require('../repositories/paises.repository');

//validação
    //validação de pais
    const paisValid = {
        sigla:Joi.string().required(),  //determinar a restriçaõ de 3 caracteres
        nome: Joi.string().required(),
        hino: Joi.string().required(),
        bandeira : Joi.string().required(),
    
    }
    

module.exports = [
    //Começo dos metodos de paises
        //Cria
        {
            method: 'POST',//verbo http. levar algo do servidor para ser criado
            path: '/pais/api/formula1',
            options: {
                handler: formula1Repository.create,
                description: 'Adiciona um Pais',
                notes: 'Adiciona um novo Pais',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    payload: paisValid,
                    failAction: function (resquest, h, err) {
                        return err
                    }
                }
            },
        },
            //Exibe
        {
            method: 'GET',              //verbo http. para buscar algo de sua base de dados
            path: '/pais/api/formula1',
            options: {
                handler: formula1Repository.findAll,
                description: 'Exibe a lista de Paises',
                notes: 'Retorna uma lista de Paises',
                tags: ['api'], // ADD THIS TAG
            }
        },
            //Busca
        {
            method: 'GET',
            path: '/pais/api/formula1/{sigla}',
            options: {
                handler: formula1Repository.find,
                description: 'Procura um pais na lista de Paises pela sigla',
                notes: 'Retorna um pais pela sigla',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        sigla: Joi.string().required()
                    },
                    failAction: (request, h, err) => {
                        throw err
                    }
    
    
                }
            }
        },
            //Atualiza
        {
            method: 'PUT', // verbo http. levar algo do servidor para ser atualizado
            path: '/pais/api/formula1/{sigla}',
            options: {
                handler: formula1Repository.update,
                description: 'Atualizar pais pela sigla',
                notes: 'Returns a message sucessufuly',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        sigla: Joi.string().required()
                    },
                    payload:  paisValid,             //verifica os dados inseridos pelo usuario
                    failAction: (request, h, err) => {
                        throw err
                    }
        
        
                }
            }
        },
            //Apaga
        {
            method: 'DELETE',
            path: '/pais/api/formula1/{sigla}',
            options: {
                handler: formula1Repository.delete,
                description: 'Apaga um pais pela sigla',
                notes: 'Return a message successfully',
                tags: ['api'] ,// ADD THIS TAG
                validate: {
                   params:{
                    sigla: Joi.string().required()
                   }, 
                   failAction: (request, h, err) => {
                    throw err
                    }
               
                }
            }
        },
        //fim dos metodos de paises
    ]    