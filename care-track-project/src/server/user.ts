"use server"
import prisma from "@/utils/db"

export const getUser = async (email: string) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                patient: true, // Include patient model if exists
                staff: true,   // Include staff model if exists
            },
        });
        return user;
    } catch (error) {
        console.error('Error creating medication:', error);
        return null;
    }
};

export const getSelectDoctor = async (doctorId: number) => {
    return await prisma.staff.findFirst({
        where: {
            id: doctorId
        }
    })
}

export const getAllDoctor = async () => {
    return await prisma.staff.findMany()
}

export const updateDoctor = async (
    userId : number,
    firstname : string,
    lastname : string,
    doctor_type : string,
    price : number,
    description : string,
    work : string
) => {
    try {
        const updateStaff = await prisma.staff.update({
            where : {
                userId: userId
            },
            data: {
                firstname,
                lastname,
                doctor_type,
                price,
                description,
                work
            }
        }) 
        return { success: true, doctor: updateStaff }
    } catch (error) {
        console.error('Error creating medication:', error);
        return { success: false, error: 'Failed to create medication' };
    }
}

export const getAllPatient = async () => {
    return await prisma.patient.findMany()
}