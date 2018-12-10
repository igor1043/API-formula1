const Boom = require('boom')

let pilotoCorrida ={
    id_piloto : Number,
    id_corrida : Number,
    dt_corrida : Date,
    posicao : Number,
    pontos : Number,
    tempo : String,
}

module.exports = {

//Começo dos metodos de pilotos_corridas       
    //cria um novo piloto
    createPilotoCorrida: async (request, h) => {

        const pool = request.mysql.pool

        pilotoCorrida = request.payload   

        try {

            await pool.query('insert into pilotos_corridas set ?', pilotoCorrida)

            return { success: true, message: 'Piloto-Corrida criado com sucesso' }
        } catch (err) {

            throw Boom.badRequest(err)

        }
    },
        //Mostra todos os pilotos
    findAllPilotoCorrida: async (request, h) => {

        const pool = request.mysql.pool

        try {
            const [rows ,fieds] = await pool.query('select * from pilotos_corridas order by id_piloto')            //os registros e os campos de cada registros

            return rows

        } catch (err) {
            throw Boom.internal('Internal Mysql Error',err)

        }
    },
        //Procura um piloto pela id
    findPilotoCorrida: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id
        const id2 = request.params.id2
        try {
            
            const [rows ,fields] = await pool.query('select * from pilotos_corridas where id_piloto =? and id_corrida =?',[id,id2])            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Piloto_corrida não encontrado')
            return rows

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Atualiza um piloto pela id
    updatePilotoCorrida: async (request, h) => {
        const pool = request.mysql.pool
        
        const id = request.params.id
        const id2 = request.params.id2

        piloto = request.payload

        try {
            
            const [rows ,fields] = await pool.query('select * from pilotos_corridas where id_piloto = ? and id_corrida = 1',[id,id2])            
         

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Piloto_Corrida não encontrado')
            
            await pool.query("Update pilotos_corridas set ? where id_piloto = ? and id_corrida = ? ",[pilotoCorrida, id,id2])

            return {success: true, message : 'Piloto_corrida atualizado com sucesso'}

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Apaga uma equipe pela id
    deletePilotoCorrida: async (request, h) => {
        const pool = request.mysql.pool
 
        const id = request.params.id
        const id2 = request.params.id2

        try {
            
            const [rows ,fields] = await pool.query('select * from pilotos_corridas where id_piloto = ? and id_corrida = ?',[id,id2])            
 
         
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('piloto_corrida não encontrado')
               
            await pool.query('delete from pilotos_corridas where id_piloto = ? and id_corrida = ?',[id,id2])
 
            return {sucess: true, message: 'piloto_corrida removido com sucesso!'}
        } catch (err) {
           
            console.log(err)
 
            throw Boom.badRequest(err)
 
        }
 
    },
//Fim dos metodos de PilotoCorrida
    
}