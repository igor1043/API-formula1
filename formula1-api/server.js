const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const circuitosRoute = require('./routes/circuitos.routes');
const corridasRoute = require('./routes/corridas.routes');
const equipesRoute = require('./routes/equipes.routes');
const paisesRoute = require('./routes/paises.routes');
const pilotoCorridaRoute = require('./routes/pilotoCorrida.routes');
const pilotosRoute = require('./routes/pilotos.routes');

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });
    
    const swaggerOptions = {
        info: {
                title: 'formula API DOcumentation',
                version: Pack.version,
            },
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register({
        plugin:require('hapi-mysql2'),
        options: {
            settings: {
                connectionLimit: 10,
                host:'localhost',
                user:'root',
                password:'',
                database:'formula1_db'
            },
            decorate: true
        }
    })
    
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }
    
    server.route(circuitosRoute);
    server.route(corridasRoute);
    server.route(equipesRoute);
    server.route(paisesRoute);
    server.route(pilotoCorridaRoute);
    server.route(pilotosRoute);
})();