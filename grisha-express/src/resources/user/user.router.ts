import { Request, Response, Router} from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { text } from 'stream/consumers';

const prisma = new PrismaClient()
const router = Router();

router.route('/').get(async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(StatusCodes.OK).json(users);
})

router.route('/').post(async (req, res) => {
    const {email, name, secondName, password, area, admin} = req.body;
    const user = await prisma.user.create({ 
        data: { email: email, name: name, secondName: secondName, password: password, area: area, admin: admin}
    });
    if (user) {
        res.status(StatusCodes.CREATED).json(user);
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({code:"user_not_created", message: "User not created"});
    }
})

router.route('/:id').get(async (req, res) => {
    const {id:id} = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id:+id,
        },
    });
    if (user) {
        res.status(StatusCodes.OK).json(user);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({code:"user_not_found", message: "User not found"});
    }
})

router.route('/:id').put(async (req, res) => {
    const {id:id} = req.params;
    const {email, name, secondName, password, area, admin} = req.body;
    const user = await prisma.user.update({
        where: {
            id:+id,
        },
        data: {
            email: email, name: name, secondName: secondName, password: password, area: area, admin: admin
        }
    })
    if (user) {
        res.status(StatusCodes.OK).json(user);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({code:"user_not_found", message: "User not found"});
    }
})

router.route('/:id').delete(async (req, res) => {
    const {id:id} = req.params;
    const user = await prisma.user.delete({
        where: {
            id:+id,
        },
    });
    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({code:"user_not_found", message: "User not found"});
    }
    else{
        res.status(StatusCodes.NO_CONTENT).json({code:"user_deleted", message: "User deleted"});
    }
});

export default router