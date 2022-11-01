import Fastify from "fastify";

async function start(){
    const fastify = Fastify({
        logger: true, //Envia logs de tudo que acontece na aplicação
    })

    fastify.get('/pools/count', () => {
        return {count: 0 };
    })

    await fastify.listen({port:3333});
}

start();