const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
	const alice = await prisma.user.upsert({
		where: { email: 'alice@prisma.io' },
		update: { name: 'Alison'},
		create: {
			email: `alice@prisma.io`,
			name: 'Alice',
            age: 21,
            posts:  {
                create: {
                    title: 'My name is alison'
                }
            }
		},
	});

    const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: `bob@prisma.io`,
      name: 'Bob',
      age: 35
    },
  })
  
//   const ariadne = await prisma.user.create({
// 		data: {
// 			email: 'ariadne@prisma.com',
// 			name: 'Ariadne',
//             age: 28,
// 			posts: {
// 				create: [
// 					{
// 						title: 'My first day at Prisma',
// 						categories: {
// 							create: {
// 								name: 'Office',
// 							},
// 						},
// 					},
// 					{
// 						title: 'How to connect to a SQLite database',
// 						categories: {
// 							create: [{ name: 'Databases' }, { name: 'Tutorials' }],
// 						},
// 					},
// 				],
// 			},
// 		},
// 	});

    const users = await prisma.user.findMany();
    
    console.log(users)
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
