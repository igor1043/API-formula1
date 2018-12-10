const Boom = require('boom')
let corrida = {
    descricao : String,
    id_circuito : Number,
    id_pais : String,

}
module.exports = {
//Começo dos metodos da corrida       
    //cria uma nova corrida
    createCorrida: async (request, h) => {

        const pool = request.mysql.pool

        corrida = request.payload   

        try {

            await pool.query('insert into corridas set ?', corrida)

            return { success: true, message: 'Corrida criada com sucesso' }
        } catch (err) {

            throw Boom.badRequest(err)

        }
    },
        //Mostra todas as corridas
    findAllCorrida: async (request, h) => {

        const pool = request.mysql.pool

        try {
            const [rows ,fieds] = await pool.query('select * from corridas order by descricao')            //os registros e os campos de cada registros

            return rows

        } catch (err) {
            throw Boom.internal('Internal Mysql Error',err)

        }
    },
        //Procura uma corrida pela id
    findCorrida: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        try {
            
            const [rows ,fields] = await pool.query('select * from corridas where id = ?',id)            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Corrida não encontrada')
            return rows

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Atualiza uma corrida pela id
    updateCorrida: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        corrida = request.payload

        try {
            
            const [rows ,fields] = await pool.query('select * from corridas where id = ?',id)            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Corrida não encontrada')
            
            await pool.query("Update corridas set ? where id = ?",[corrida, id])

            return {success: true, message : 'Corrida atualizada com sucesso'}

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Apaga uma equipe pela id
    deleteCorrida: async (request, h) => {
        const pool = request.mysql.pool
 
        const id = request.params.id
 
        try {
           
            const [rows, fields] = await pool.query('select * from corridas where id = ?',id)
         
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Corrida não encontrada')
               
            await pool.query('delete from corridas where id = ?',id)
 
            return {sucess: true, message: 'Corrida removida com sucesso!'}
        } catch (err) {
           
            console.log(err)
 
            throw Boom.badRequest(err)
 
        }
 
    },
//Fim dos metodos de corrida
}