import prisma from '@/database/prismaClient';
import { NextFunction, Request, Response } from 'express';

export async function deleteAppointment(req: Request, res: Response, next: NextFunction) {
    try {
        const  appointmentId  = req.body.appointmentId; //  the ID is sent as a URL parameter
        console.log(appointmentId)
        // Delete the appointment from the database
        await prisma.appointments.delete({
            where: { id: appointmentId },
        });

        // Send a success response
        res.status(204).send({message : "Deleted Succesfully"});
    } catch (error) {
        // Handle possible errors
        next(error);
    }
}
