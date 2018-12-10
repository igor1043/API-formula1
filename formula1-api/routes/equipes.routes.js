const Joi = require('joi');
const formula1Repository = require('../repositories/equipes.repository');


//validação de equipe
const equipeValid = {
    nome: Joi.string().required(),
    escudo: Joi.string().required(),
    id_pais: Joi.string().required(),
}    

module.exports = [
   //Começo dos metodos de equipe
        //Cria
        {
            method: 'POST',
            path: '/equipe/api/formula1',
            options: {
                handler: formula1Repository.createEquipe,
                description: 'Adiciona uma equipe',
                notes: 'Adiciona uma nova equipe',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    payload: equipeValid,
                    failAction: function (resquest, h, err) {
                        return err
                    }
                }
            },
    },
        //Exibe
    {
            method: 'GET',              
            path: '/equipe/api/formula1',
            options: {
                handler: formula1Repository.findAllEquipe,
                description: 'Mostra a lista das equipes',
                notes: 'Retorna uma lista das equipes',
                tags: ['api'], // ADD THIS TAG
            }
    },
        //Busca
    {
            method: 'GET',
            path: '/equipe/api/formula1/{id}',
            options: {
                handler: formula1Repository.findEquipe,
                description: 'Procura uma equipe pela ID',
                notes: 'Retorna uma equipe pela ID',
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
            path: '/equipe/api/formula1/{id}',
            options: {
                handler: formula1Repository.updateEquipe,
                description: 'Atualiza uma equipe pela id',
                notes: 'Returns a message sucessufuly',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number().integer().required()
                    },
                    payload:  equipeValid,             
                    failAction: (request, h, err) => {
                        throw err
                    }
    
    
                }
            }
    },
        //Apaga
    {
            method: 'DELETE',
            path: '/equipe/api/formula1/{id}',
            options: {
                handler: formula1Repository.deleteEquipe,
                description: 'Apaga uma equipe pela id',
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
//Fim dos metodos das equipes
]