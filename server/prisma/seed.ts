import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            avatarUrl: "https://github.com/celso14.png"
        }
    })

    //criações encadeadas, usando o relacionamento de tabelas
    const pool = await prisma.pool.create({
        data:{
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            Participant: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-05T12:00:00.492Z',
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR"
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-05T12:00:00.492Z',
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create:{
                    firstTeamPoints: 3,
                    secondTeamPoints: 0,

                    partipant:{
                        connect:{
                            userId_poolId: {
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}


main();