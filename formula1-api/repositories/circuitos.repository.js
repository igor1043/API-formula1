const Boom = require('boom')


let circuito = {
    nome : String
}
module.exports = {
 //começo dos metodos circuitos
        //cria um novo circuito
        createCircuitos: async (request, h) => {

            const pool = request.mysql.pool
    
            circuito = request.payload   //é um objeto criado para o cliente na pagina
    
            try {
    
                await pool.query('insert into circuitos set ?', circuito)
    
                return { success: true, message: 'Ciruito criado com sucesso' }
            } catch (err) {
    
                throw Boom.badRequest(err)
    
            }
        },
            //Mostra todos os circuitos
        findAllCircuitos: async (request, h) => {
    
            const pool = request.mysql.pool
    
            try {
                const [rows ,fieds] = await pool.query('select * from circuitos order by nome')            //os registros e os campos de cada registros
    
                return rows
    
            } catch (err) {
                throw Boom.internal('Internal Mysql Error',err)
    
            }
        },
            //Procura um circuito pela id
        findCircuitos: async (request, h) => {
            const pool = request.mysql.pool
    
            const id = request.params.id
    
            try {
                
                const [rows ,fields] = await pool.query('select * from circuitos where id = ?',id)            
    
                if (rows.length === undefined || rows.length === 0)
                    return Boom.notFound('Circuito nao encontrado')
                return rows
    
            } catch (err) {
    
                throw Boom.badRequest(err)
            }
    
        },
            //Utualiza um circuito pela id
        updateCircuitos: async (request, h) => {
            const pool = request.mysql.pool
    
            const id = request.params.id
    
            circuito = request.payload
    
            try {
                
                const [rows ,fields] = await pool.query('select * from circuitos where id = ?',id)            
    
                if (rows.length === undefined || rows.length === 0)
                    return Boom.notFound('Circuito não encontrado')
                
                await pool.query("Update circuitos set ? where id = ?",[circuito, id])
    
                return {success: true, message : 'Circuito atualizado com sucesso'}
    
            } catch (err) {
    
                throw Boom.badRequest(err)
            }
    
        },
            //Apaga um circuito pela id
        deleteCircuitos: async (request, h) => {
            const pool = request.mysql.pool
     
            const id = request.params.id
     
            try {
               
                const [rows, fields] = await pool.query('select * from circuitos where id = ?',id)
             
                if(rows.length === undefined || rows.length === 0)
                    return Boom.notFound('Circuito não encontrado')
                   
                await pool.query('delete from circuitos where id = ?',id)
     
                return {sucess: true, message: 'Circuito removido com sucesso!'}
            } catch (err) {
               
                console.log(err)
     
                throw Boom.badRequest(err)
     
            }
     
        },
    }
        //Fim dos metodos de circuitos
    