// user.type.ts
// Define the Patient type
type Patient = {
    id: number;
    firstname: string | null;
    lastname: string | null;
    userId: number;
  };

  // Define the Staff type
  type Staff = {
    firstname: string;
    lastname: string;
    id: number;
    userId: number;
    doctor_type: string | null;
    price: number | null;
    description: string | null;
    specification: string | null;
    work: string | null;
  };

  // Define the User type
export type UserLogin = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    patient: Patient | undefined;
    staff: Staff | undefined;
  };