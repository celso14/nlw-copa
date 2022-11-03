import Fastify from "fastify";
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query'],
});

async function start(){
    const fastify = Fastify({
        logger: true, //Envia logs de tudo que acontece na aplicação
    })

    //Origin é o hosts que podem acessar a API
    await fastify.register(cors, {
        origin: true,
    });

    fastify.get('/pools/count', async () => {
        const pools = await prisma.pool.findMany({
            where:{
                code:{
                    startsWith: "c"
                }
            }
        });

        return { pools };
    })

    await fastify.listen({port:3333, host: '0.0.0.0' });
}

start();