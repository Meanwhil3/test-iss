"use server"
import { MedicineForm } from '@/types/form.type';

import prisma from '@/utils/db'

export const createMedication = async ({
    patientId,
    heart_rate,
    hemoglobin,
    medicines,
  }: {
    patientId: number;
    heart_rate: number;
    hemoglobin: number;
    medicines: MedicineForm[];
  }) => {
    try {
        // Step 1: Create the medicines without connecting periods
        const med_allo = await prisma.medicationAllocation.create({
            data: {
                patientId: patientId,
                heart_rate: heart_rate,
                hemoglobin: hemoglobin,
                notified: false,
                medicine: {
                    createMany: {
                        data: medicines.map(med => ({
                            medicine_name: med.med_name,
                            dosage: parseInt(med.dosage.toString()),
                        })),
                    },
                },
            },
            include: {
                medicine: {
                    include: {
                        period: true,
                    },
                },
            },
        });

        // // Step 2: Update each created medicine to connect periods
        for (const med of medicines) {
            // Get the created medicine based on some unique criteria (like name or other fields)
            const createdMedicine = await prisma.medicine.findFirst({
                where: {
                    med_allocationId: med_allo.id,
                    medicine_name: med.med_name,
                },
            });
            console.log(createdMedicine)
            if (createdMedicine) {
                const timestampsArray = Array.from(med.timestamps).map((id: number) => ({ id: parseInt(id.toString()) }));
                // Step 3: Update the created medicine to connect the periods
                const update = await prisma.medicine.update({
                    where: { id: createdMedicine.id },
                    data: {
                        period: {
                            connect: timestampsArray, // Connect the periods
                        },
                    },
                    include: {
                        period: true
                    }
                });
                console.log(update)
            }
        }
        return { success: true, medicationAllocation: med_allo };
    } catch (error) {
        console.log('Error creating medication:', error);
        return { success: false, error: 'Failed to create medication' };
    }
};

export const createPeriod = async () => {
    const creates = await prisma.period.create({
        data: {
            period_name: "เย็น",
            time: new Date('1970-01-01T18:00:00.000Z')
        },
    });
    return creates
}

export const viewPeriod = async () => {
    return await prisma.period.findMany();
}

export const viewMedicines = async (patientId: number) => {
    const medicines = prisma.medicationAllocation.findMany({
        where: {
            patientId: patientId
        },
        include: {
            medicine: {
                include: {
                    period: true
                }
            }
        }
    })
    return medicines
}