const Boom = require('boom')
let equipe = {
    nome : String,
    escudo : String,
    id_pais : String,

}
module.exports = {
//Começo dos metodos de equipes        
    //cria uma nova equipe
    createEquipe: async (request, h) => {

        const pool = request.mysql.pool

        equipe = request.payload   

        try {

            await pool.query('insert into equipes set ?', equipe)

            return { success: true, message: 'Equipe criada com sucesso' }
        } catch (err) {

            throw Boom.badRequest(err)

        }
    },
        //Mostra todas as equipes
    findAllEquipe: async (request, h) => {

        const pool = request.mysql.pool

        try {
            const [rows ,fieds] = await pool.query('select * from equipes order by nome')            //os registros e os campos de cada registros

            return rows

        } catch (err) {
            throw Boom.internal('Internal Mysql Error',err)

        }
    },
        //Procura uma equipe pela id
    findEquipe: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        try {
            
            const [rows ,fields] = await pool.query('select * from equipes where id = ?',id)            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Equipe não encontrada')
            return rows

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Atualiza uma equipe pela id
    updateEquipe: async (request, h) => {
        const pool = request.mysql.pool

        const id = request.params.id

        equipe = request.payload

        try {
            
            const [rows ,fields] = await pool.query('select * from equipes where id = ?',id)            

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Equipe não encontrada')
            
            await pool.query("Update equipes set ? where id = ?",[equipe, id])

            return {success: true, message : 'equipe atualizada com sucesso'}

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Apaga uma equipe pela id
    deleteEquipe: async (request, h) => {
        const pool = request.mysql.pool
 
        const id = request.params.id
 
        try {
           
            const [rows, fields] = await pool.query('select * from equipes where id = ?',id)
         
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Equipe não encontrada')
               
            await pool.query('delete from equipes where id = ?',id)
 
            return {sucess: true, message: 'Equipe removida com sucesso!'}
        } catch (err) {
           
            console.log(err)
 
            throw Boom.badRequest(err)
 
        }
 
    },
}
//Fim dos metodos da equipe
