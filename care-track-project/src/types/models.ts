export type LoginUser = {
    id        : string
    username  : string
    email     : string
    password  : string
    role      : string
}

export enum UserRoles {
    PATIENT = "PATIENT",
    STAFF = "STAFF",
}

export type RegisterUser = {
    username  : string
    email     : string
    password  : string
    role      : UserRoles
    firstname : string
    lastname  : string
}

export type User = {
    id: string;
    email: string;
    username: string;
    role: string
    patient?: Patient;
    staff?: Staff;
}

export type Patient = {
    id: number;
    firstname?: string | null;
    lastname?: string | null;
    medicationAllocations: MedicationAllocation[];
    appointments: Appointment[];
    userId: number;
    user: User;
  };
  
  // export type Staff = {
  //   id: number;
  //   firstname: string;
  //   lastname: string;
  //   appointments: Appointment[];
  //   userId: number;
  //   user: User;
  //   doctor_type: string | null;
  //   price: number | null;
  //   description: string | null;
  //   specification: string | null;
  //   work: string | null;
  // };
  
  export type Staff = {
    id: number;
    firstname: string;
    lastname: string;
    userId: number;
    doctor_type: string | null;
    price: number | null;
    description: string | null;
    specification: string | null;
    work: string | null;
};

  export type MedicationAllocation = {
    id: number;
    patientId: number;
    time_stamp: Date;
    notified: boolean;
    medicine: ViewMedicine[];
    heart_rate: number;
    hemoglobin: number;
  };

  export type ViewMedicine = {
    id: number;
    medicine_name: string;
    dosage: number;
    med_allocationId: number
    period: Period[]
  };
  
  export type Medicine = {
    id: number;
    med_name: string;
    dosage: number;
  };
  
  export type Period = {
    id: number;
    period_name: string;
    time: Date;
  };
  
  
  export type QueryMedicine = {
    id: number;
    medicine_name: string;
    dosage: number;
    period: Period[]
  };

  export type Appointment = {
    id: number;
    patientId: number;
    staffId: number;
    appointmentTime: Date;
  };