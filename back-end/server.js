import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Criar um novo usuário (POST)
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);        // 201 - tudo certo e criou o usuário
});

// Listar os usuários (GET)
app.get('/usuarios', async (req, res) => {

    let users = [];

    // Filtro para buscar usuários por email, nome ou idade, caso seja passado algum parâmetro na query  
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                email: req.query.email,
                name: req.query.name,
                age: req.query.age
            }
        });
    } else {        // Caso não passe nenhum parâmetro na query, ele vai listar todos os usuários
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
});

// Alterar um usuário (PUT)
app.put('/usuarios/:id', async (req, res) => {          // :id indica que é uma variável que vai receber o id do usuário que será alterado

    await prisma.user.update({
        where: {            // where fala ONDE vai ser alterado
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(200).json(req.body);
});

// Deletar um usuário (DELETE)
app.delete('/usuarios/:id', async (req, res) => {
    
    await prisma.user.delete({
        where: {            
            id: req.params.id
        }
    });             // não coloquei dados (data) nenhum porque não vou passar nenhum dado, só quero deletar o usuário
    
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

app.listen(3000);