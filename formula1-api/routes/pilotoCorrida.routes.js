const Joi = require('joi');
const formula1Repository = require('../repositories/pilotoCorrida.repository');


    //validação de piloto_corrida
const pilotoCorridaValid = {
    id_piloto: Joi.number().required(),
    id_corrida: Joi.number().required(),
    dt_corrida: Joi.date().required(),
    posicao: Joi.number().required(),
    pontos: Joi.number().required(),
    tempo: Joi.string().required(),
}


module.exports = [
//Começo dos metodos de pilotosCorrida
        //Cria
        {
            method: 'POST',
            path: '/pilotoCorrida/api/formula1',
            options: {
                handler: formula1Repository.createPilotoCorrida,
                description: 'Adiciona um PilotoCorrida',
                notes: 'Adiciona um novo PilotoCorrida',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    payload: pilotoCorridaValid,
                    failAction: function (resquest, h, err) {
                        return err
                    }
                }
            },
    },
        //Exibe
    {
            method: 'GET',              
            path: '/pilotoCorrida/api/formula1',
            options: {
                handler: formula1Repository.findAllPilotoCorrida,
                description: 'Mostra a lista das PilotosCorridas',
                notes: 'Retorna uma lista de pilotosCorridas',
                tags: ['api'], // ADD THIS TAG
            }
    },
        //Busca
    {
            method: 'GET',
            path: '/pilotoCorrida/api/formula1/{id}/{id2}',
            options: {
                handler: formula1Repository.findPilotoCorrida,
                description: 'Procura um pilotoCorrida pela ID',
                notes: 'Retorna um pilotoCorrida pela ID',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number().integer().required(),
                        id2: Joi.number().integer().required()
                        
                        
                        
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
            path: '/pilotoCorrida/api/formula1/{id}/{id2}',
            options: {
                handler: formula1Repository.updatePilotoCorrida,
                description: 'Atualiza um pilotoCorrida pela id',
                notes: 'Returns a message sucessufuly',
                tags: ['api'], // ADD THIS TAG
                validate: {
                    params: {
                        id: Joi.number().integer().required(),
                        id2: Joi.number().integer().required()
                    },
                    payload:  pilotoCorridaValid,             
                    failAction: (request, h, err) => {
                        throw err
                    }
    
    
                }
            }
    },
        //Apaga
    {
            method: 'DELETE',
            path: '/pilotoCorrida/api/formula1/{id}/{id2}',
            options: {
                handler: formula1Repository.deletePilotoCorrida,
                description: 'Apaga um pilotoCorrida pela id',
                notes: 'Return a message successfully',
                tags: ['api'] ,// ADD THIS TAG
                validate: {
                   params:{
                    id: Joi.number().integer().required(),
                    id2: Joi.number().integer().required()
                   }, 
                   failAction: (request, h, err) => {
                    throw err
                    }
               
                }
            }
    },
//Fim dos metodos das equipes
   
 
    
]