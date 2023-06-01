import { Request, Response, Router} from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { text } from 'stream/consumers';

const prisma = new PrismaClient()
const router = Router();

router.route('/').get(async (req, res) => {
    const dtps = await prisma.dtp.findMany();
    res.status(StatusCodes.OK).json(dtps);
})

router.route('/').post(async (req, res) => {
    const {category, description, dateAndTime, addr, coordinates, class1} = req.body;
    const dtp = await prisma.dtp.create({ 
        data: { category: category, description: description, dateAndTime: dateAndTime, addr: addr, coordinates: coordinates, class1: class1}
    });
    if (dtp) {
        res.status(StatusCodes.CREATED).json(dtp);
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({code:"dtp_not_created", message: "dtp not created"});
    }
})

router.route('/:id').get(async (req, res) => {
    const {id:id} = req.params;
    const dtp = await prisma.dtp.findUnique({
        where: {
            id:+id,
        },
    });
    if (dtp) {
        res.status(StatusCodes.OK).json(dtp);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({code:"dtp_not_found", message: "dtp not found"});
    }
})

router.route('/:id').put(async (req, res) => {
    const {id:id} = req.params;
    const  {category, description, dateAndTime, addr, coordinates, class1} = req.body;
    const dtp = await prisma.dtp.update({
        where: {
            id:+id,
        },
        data: {
            category: category, description: description, dateAndTime: dateAndTime, addr: addr, coordinates: coordinates, class1: class1
        }
    })
    if (dtp) {
        res.status(StatusCodes.OK).json(dtp);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({code:"dtp_not_found", message: "dtp not found"});
    }
})

router.route('/:id').delete(async (req, res) => {
    const {id:id} = req.params;
    const dtp = await prisma.dtp.delete({
        where: {
            id:+id,
        },
    });
    if (!dtp) {
        res.status(StatusCodes.NOT_FOUND).json({code:"dtp_not_found", message: "dtp not found"});
    }
    else{
        res.status(StatusCodes.NO_CONTENT).json({code:"dtp_deleted", message: "dtp deleted"});
    }
});


export default router