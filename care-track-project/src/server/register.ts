"use server";

import { registerSchema } from "@/types/schema";
import { UserRoles } from "@/types/models";
import prisma from "@/utils/db";
import { hash } from "bcrypt";
import { ZodError } from "zod";

export async function createUser(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;

    try {
        // Validate the input data
        const validatedData = registerSchema.parse({
            username,
            email,
            password,
            role,
            firstname,
            lastname,
        });

        const userRole = validatedData.role as UserRoles;

        // Hash the password
        const hashedPassword = await hash(validatedData.password, 10);
        
        const newuser = await prisma.user.create({
            data: {
                username: validatedData.username,
                email: validatedData.email,
                password: hashedPassword,
                role: userRole,
            },
        });

        // Create the corresponding role-specific record
        if (newuser.role === "PATIENT") {
            await prisma.patient.create({
                data: {
                    firstname: validatedData.firstname,
                    lastname: validatedData.lastname,
                    userId: newuser.id,
                },
            });
        } else if (newuser.role === "STAFF") {
            await prisma.staff.create({
                data: {
                    firstname: validatedData.firstname,
                    lastname: validatedData.lastname,
                    userId: newuser.id,
                    doctor_type: "", // Set to null if not provided
                    price: 0,             // Set to null if not provided
                    description: "", // Set to null if not provided
                    specification: "", // Set to null if not provided
                    work: "",               // Set to null if not provided
                },
            });
        }

        return { success: true, user: newuser };
    } catch (error) {
        if (error instanceof ZodError) {
            // Format Zod validation errors
            const formattedErrors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            throw new Error(formattedErrors.join(", "));
        }
        // Handle other types of errors
        throw new Error("An unexpected error occurred during user creation.");
    }
}
