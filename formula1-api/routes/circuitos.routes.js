const Joi = require('joi');
const formula1Repository = require('../repositories/circuitos.repository');


    //validação de circuito
const circuitoValid = {
    nome: Joi.string().required(),
}   

module.exports = [
   //Começo dos metodos de circuitos
        //Cria
        {
            method: 'POST',
            path: '/circuito/api/formula1',
            options: {
                handler: formula1Repository.createCircuitos,
                description: 'Adiciona um circuito',
                notes: 'Adiciona um novo circuito',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    payload: circuitoValid,
                    failAction: function (resquest, h, err) {
                        return err
                    }
                }
            },
        },
            //Exibe
        {
            method: 'GET',              
            path: '/circuito/api/formula1',
            options: {
                handler: formula1Repository.findAllCircuitos,
                description: 'Mostra a lista de circuitos',
                notes: 'Retorna uma lista de Circuitos',
                tags: ['api'], // ADD THIS TAG
            }
        },
            //Busca
        {
            method: 'GET',
            path: '/circuito/api/formula1/{id}',
            options: {
                handler: formula1Repository.findCircuitos,
                description: 'Procura um circuito pela ID',
                notes: 'Retorna um contato pela ID',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number().integer().required()
                    },
                    failAction: (request, h, err) => {
                        throw err
                    }
    
    
                }
            }
        },   
            //Atualiza 
        {
            method: 'PUT', 
            path: '/circuito/api/formula1/{id}',
            options: {
                handler: formula1Repository.updateCircuitos,
                description: 'Atualiza um circuito pela id',
                notes: 'Returns a message sucessufuly',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number().integer().required()
                    },
                    payload:  circuitoValid,             
                    failAction: (request, h, err) => {
                        throw err
                    }
    
    
                }
            }
        },
            //Apaga
        {
            method: 'DELETE',
            path: '/circuito/api/formula1/{id}',
            options: {
                handler: formula1Repository.deleteCircuitos,
                description: 'Apaga um circuito pela id',
                notes: 'Return a message successfully',
                tags: ['api'] ,// ADD THIS TAG
                validate: {
                   params:{
                    id: Joi.number().integer().required()
                   }, 
                   failAction: (request, h, err) => {
                    throw err
                    }
               
                }
            }
        },
        //Fim dos metodos de circuitos
    ]    