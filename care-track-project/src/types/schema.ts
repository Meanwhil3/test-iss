import { z } from 'zod';
import { UserRoles } from '@/types/models';

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum([UserRoles.PATIENT, UserRoles.STAFF]), // Fix the enum declaration
    firstname: z.string().min(1, "First name is required"), // Added firstname validation
    lastname: z.string().min(1, "Last name is required"), // Added lastname validation
});