const Joi = require('joi');
const formula1Repository = require('../repositories/corridas.repository');

    //validação de corrida
const corridaValid = {
    descricao: Joi.string().required(),
    id_circuito: Joi.number().required(),
    id_pais: Joi.string().required(),
}


module.exports = [
 //Começo dos metodos de corridas
        //Cria
        {
            method: 'POST',
            path: '/corrida/api/formula1',
            options: {
                handler: formula1Repository.createCorrida,
                description: 'Adiciona uma corrida',
                notes: 'Adiciona uma nova corrida',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    payload: corridaValid,
                    failAction: function (resquest, h, err) {
                        return err
                    }
                }
            },
    },
        //Exibe
    {
            method: 'GET',              
            path: '/corrida/api/formula1',
            options: {
                handler: formula1Repository.findAllCorrida,
                description: 'Mostra a lista das corridas',
                notes: 'Retorna uma lista de corridas',
                tags: ['api'], // ADD THIS TAG
            }
    },
        //Busca
    {
            method: 'GET',
            path: '/corrida/api/formula1/{id}',
            options: {
                handler: formula1Repository.findCorrida,
                description: 'Procura uma corrida pela ID',
                notes: 'Retorna uma corrida pela ID',
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
            path: '/corrida/api/formula1/{id}',
            options: {
                handler: formula1Repository.updateCorrida,
                description: 'Atualiza uma corrida pela id',
                notes: 'Returns a message sucessufuly',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number().integer().required()
                    },
                    payload:  corridaValid,             
                    failAction: (request, h, err) => {
                        throw err
                    }
    
    
                }
            }
    },
        //Apaga
    {
            method: 'DELETE',
            path: '/corrida/api/formula1/{id}',
            options: {
                handler: formula1Repository.deleteCorrida,
                description: 'Apaga uma corrida pela id',
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
//Fim dos metodos das corrida
]