const Boom = require('boom')


let pais = {
    sigla :String,
    nome : String,
    hino : String,
    bandeira : String,

}
module.exports = {

    //começo dos metodos paises
        //adiciona um pais
    create: async (request, h) => {

        const pool = request.mysql.pool

        pais = request.payload   //é um objeto criado para o cliente na pagina

        try {

            await pool.query('insert into paises set ?', pais)

            return { success: true, message: 'pais created success' }
        } catch (err) {

            throw Boom.badRequest(err)

        }
    },
        //exibe a lista de paises
    findAll: async (request, h) => {

        const pool = request.mysql.pool

        try {
            const [rows ,fieds] = await pool.query('select * from paises order by nome')            //os registros e os campos de cada registros

            return rows

        } catch (err) {
            console.log(err) // mostra o erro linha de comando
            throw Boom.internal('Internal Mysql Error',err)

        }
    },
        //procura um pais pela id

    find: async (request, h) => {
        const pool = request.mysql.pool

        const sigla = request.params.sigla

        try {
            
            const [rows ,fields] = await pool.query('select * from paises where sigla = ?',sigla)            //os registros e os campos de cada registros

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('Pais nao encontrado')
            return rows

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },        
        //Update um pais pela sigla

    update: async (request, h) => {
        const pool = request.mysql.pool

        const sigla = request.params.sigla

        pais = request.payload

        try {
            
            const [rows ,fields] = await pool.query('select * from paises where sigla = ?',sigla)            //os registros e os campos de cada registros

            if (rows.length === undefined || rows.length === 0)
                return Boom.notFound('pais não encontrado')
            
            await pool.query("Update paises set ? where sigla = ?",[pais, sigla])

            return {success: true, message : 'Pais atualizado com sucesso'}

        } catch (err) {

            throw Boom.badRequest(err)
        }

    },
        //Apaga um pais pela sigla
    delete: async (request, h) => {
        const pool = request.mysql.pool
 
        const sigla = request.params.sigla
 
        try {
           
            const [rows, fields] = await pool.query('select * from paises where sigla = ?',sigla)
         
            if(rows.length === undefined || rows.length === 0)
                return Boom.notFound('Pais não encontrado')
               
            await pool.query('delete from paises where sigla = ?',sigla)
 
            return {sucess: true, message: 'Pais removido com sucesso!'}
        } catch (err) {
           
            console.log(err) 
            throw Boom.badRequest(err)
 
        }
 
    },
}
    //fim dos metodos dos paises
