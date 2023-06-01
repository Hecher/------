import { Request, Response, Router} from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { text } from 'stream/consumers';

const prisma = new PrismaClient()
const router = Router();

router.route('/').get(async (req, res) => {
    const complexs = await prisma.complex.findMany();
    res.status(StatusCodes.OK).json(complexs);
})

router.route('/').post(async (req, res) => {
    const {complexType, startingTime, endingTime, addr, coordinates, class1} = req.body;
    const complex = await prisma.complex.create({ 
        data: {
             complexType: complexType, startingTime: startingTime, endingTime: endingTime, addr: addr, coordinates: coordinates, class1: class1
            }
    });
    if (complex) {
        res.status(StatusCodes.CREATED).json(complex);
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({code:"complex_not_created", message: "complex not created"});
    }
})

router.route('/:id').get(async (req, res) => {
    const {id:id} = req.params;
    const complex = await prisma.complex.findUnique({
        where: {
            id:+id,
        },
    });
    if (complex) {
        res.status(StatusCodes.OK).json(complex);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({code:"complex_not_found", message: "complex not found"});
    }
})

router.route('/:id').put(async (req, res) => {
    const {id:id} = req.params;
    const {complexType, startingTime, endingTime, addr, coordinates, class1} = req.body;
    const complex = await prisma.complex.update({
        where: {
            id:+id,
        },
        data: {
            complexType: complexType, startingTime: startingTime, endingTime: endingTime, addr: addr, coordinates: coordinates, class1: class1
        }
    })
    if (complex) {
        res.status(StatusCodes.OK).json(complex);
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({code:"complex_not_found", message: "complex not found"});
    }
})

router.route('/:id').delete(async (req, res) => {
    const {id:id} = req.params;
    const complex = await prisma.complex.delete({
        where: {
            id:+id,
        },
    });
    if (!complex) {
        res.status(StatusCodes.NOT_FOUND).json({code:"complex_not_found", message: "complex not found"});
    }
    else{
        res.status(StatusCodes.NO_CONTENT).json({code:"complex_deleted", message: "complex deleted"});
    }
});


export default router