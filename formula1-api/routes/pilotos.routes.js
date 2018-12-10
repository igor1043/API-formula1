const Joi = require('joi');
const formula1Repository = require('../repositories/pilotos.repository');


    //validação de piloto
const pilotoValid = {
    nome: Joi.string().required(),
    altura: Joi.number().required(),
    peso: Joi.number().required(),
    dt_nascimento: Joi.date().required(),
    id_pais: Joi.string().required(),
    id_equipe: Joi.number().required(),
    imagem_piloto: Joi.string().required(),
}

module.exports = [

 
 
    //Começo dos metodos de pilotos
           //Cria
       {
               method: 'POST',
               path: '/piloto/api/formula1',
               options: {
                   handler: formula1Repository.createPiloto,
                   description: 'Adiciona um Piloto',
                   notes: 'Adiciona um novo Piloto',
                   tags: ['api'], // ADD THIS TAG
                   validate: {
                       payload: pilotoValid,
                       failAction: function (resquest, h, err) {
                           return err
                       }
                   }
               },
       },
           //Exibe
       {
               method: 'GET',              
               path: '/piloto/api/formula1',
               options: {
                   handler: formula1Repository.findAllPiloto,
                   description: 'Mostra a lista das corridas',
                   notes: 'Retorna uma lista de pilotos',
                   tags: ['api'], // ADD THIS TAG
               }
       },
           //Busca
       {
               method: 'GET',
               path: '/piloto/api/formula1/{id}',
               options: {
                   handler: formula1Repository.findPiloto,
                   description: 'Procura um piloto pela ID',
                   notes: 'Retorna um piloto pela ID',
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
               path: '/piloto/api/formula1/{id}',
               options: {
                   handler: formula1Repository.updatePiloto,
                   description: 'Atualiza um piloto pela id',
                   notes: 'Returns a message sucessufuly',
                   tags: ['api'], // ADD THIS TAG
                   validate: {
                       params: {
                           id: Joi.number().integer().required()
                       },
                       payload:  pilotoValid,             
                       failAction: (request, h, err) => {
                           throw err
                       }
       
       
                   }
               }
       },
           //Apaga
       {
               method: 'DELETE',
               path: '/piloto/api/formula1/{id}',
               options: {
                   handler: formula1Repository.deletePiloto,
                   description: 'Apaga um piloto pela id',
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
   //Fim dos metodos das pilotos
    ]   