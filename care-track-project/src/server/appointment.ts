"use server"
import prisma from "@/utils/db"

export const createAppointment = async (patientId: number, staffId: number, datetime: Date) => {
    try {
        const appoint = await prisma.appointment.create({
            data: {
                patientId: patientId,
                staffId: staffId,
                appointmentTime: datetime
            }
        })
        return { success: true, user: appoint };
    } catch (error) {
        console.error('Error creating medication:', error);
        return { success: false, error: 'Failed to create medication' };
    }
}

export const viewAppointments = async (staffId: number) => {
    const appoints = await prisma.appointment.findMany({
        where: {
            staffId
        }
    })
    return appoints
}

export const updateAppointment = async (
    appointmentTime : Date,
    id: number
) => {
    try {
        const updateAppointment = await prisma.appointment.update({
            where : {
                id : id
            },
            data: {
                appointmentTime: appointmentTime
            }
        }) 
        return { success: true, appointment: updateAppointment }
    } catch (error) {
        console.error('Error creating medication:', error);
        return { success: false, error: 'Failed to create medication' };
    }
}