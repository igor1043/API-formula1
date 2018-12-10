const Boom = require('boom')
let piloto = {
    nome : String,
    altura : Number,
    peso : Number, 
    dt_nascimento : Date,
    id_pais : String,
    id_equipe : Number,
    imagem_piloto : String,

}
module.exports = {
//Começo dos metodos de pilotos       
    //cria um novo piloto
    createPiloto: async (request, h) => {

        const pool = request.mysql.pool

        piloto = request.payload   //é um objeto criado para o cliente na pagina

        try {

            await pool.query('insert into pilotos set ?', piloto)

            return { success: true, message: 'piloto created success' }
        } catch (err) {

            throw Boom.badRequest(err)

        }
    },
        //Mostra todos os pilotos
    findAllPiloto: async (request, h) => {

        const pool = request.mysql.pool

        try {
            const [rows ,fieds] = await pool.query('select * from pilotos order by nome')            //os registros e os campos de cada registros

            return rows

        } catch (err) {
            throw Boom.internal('Internal Mysql Error',err)

        }
    },
        //Procura um piloto pela id
    findPiloto: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        try {
            
            const [rows ,fields] = await pool.query('select * from pilotos where id = ?',id)            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Piloto não encontrado')
            return rows

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Atualiza um piloto pela id
    updatePiloto: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        piloto = request.payload

        try {
            
            const [rows ,fields] = await pool.query('select * from pilotos where id = ?',id)            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Piloto não encontrado')
            
            await pool.query("Update pilotos set ? where id = ?",[corrida, id])

            return {success: true, message : 'Piloto atualizado com sucesso'}

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Apaga uma equipe pela id
    deletePiloto: async (request, h) => {
        const pool = request.mysql.pool
 
        const id = request.params.id
 
        try {
           
            const [rows, fields] = await pool.query('select * from pilotos where id = ?',id)
         
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Piloto não encontrado')
               
            await pool.query('delete from pilotos where id = ?',id)
 
            return {sucess: true, message: 'Piloto removido com sucesso!'}
        } catch (err) {
           
            console.log(err)
 
            throw Boom.badRequest(err)
 
        }
 
    },
//Fim dos metodos de piloto
}