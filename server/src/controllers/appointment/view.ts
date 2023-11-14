import prisma from '@/database/prismaClient';
import { NextFunction, Request, Response } from 'express';

export async function getAllAppointments(req: Request, res: Response, next: NextFunction) {
    try {
        // Retrieve all appointments from the database
        const appointments = await prisma.appointments.findMany();

        // Send them as a response
        res.status(200).json(appointments);
    } catch (error) {
        // Handle possible errors
        next(error);
    }
}



