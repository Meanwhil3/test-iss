// app/hospital/page.tsx
"use client";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useUser } from "@/context/UserProvider";
import { MedicineForm } from "@/types/form.type";
import { createMedication } from "@/server/medication"; // Import the server action
import { viewPeriod } from "@/server/medication";
import { Period } from "@/types/models";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar/navbar";

export default function HospitalPage() {
  const user = useUser();
  const [patientId, setPatientId] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [period, setPeriod] = useState<Period[]>([])
  const [medicines, setMedicines] = useState<MedicineForm[]>([
    { id: Date.now(), med_name: "", dosage: 0, timestamps: [] }
  ]);
  const [successMessage] = useState("");

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { id: Date.now(), med_name: "", dosage: 0, timestamps: [] }
    ]);
  };

  const removeMedicine = (id: number) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== id));
  };

  const updateMedicine = (id: number, field: keyof MedicineForm, value: string | string[]) => {
    setMedicines(
      medicines.map((medicine) =>
        medicine.id === id ? { ...medicine, [field]: value } : medicine
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
        const getPeriod = await viewPeriod()
        setPeriod(getPeriod)
    }
    fetchData();
  }, [])
  // Update the handleSubmit function to directly call the server action
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      // Call the server-side action
      const result = await createMedication({
        patientId: parseInt(patientId),
        heart_rate: parseInt(heartRate),
        hemoglobin: parseInt(hemoglobin),
        medicines: medicines.map((med) => ({
          med_name: med.med_name,
          dosage: med.dosage,
          timestamps: med.timestamps,
          id: 2,
        }))
      });

      if (result.success) {
        // console.log("Medication created:", result.medicationAllocation);
        toast.success("Create Allocation Successfully")
        setPatientId("");
        setHeartRate("");
        setHemoglobin("");
        setMedicines([{ id: Date.now(), med_name: "", dosage: 0, timestamps: [] }]); // Reset medicines
      } else {
        console.log("Error:", result.error);
      }
    } catch (error) {
      console.error("Error creating medication:", error);
    }
  };

  return (
    <div className="bg-[#EFEFEF] w-full min-h-screen relative">
        {successMessage && ( // Display success message if exists
            <div className="text-green-600 text-center mb-4">{successMessage}</div>
          )}
      <form onSubmit={handleSubmit}>
        <section className="max-w-3xl m-auto relative py-20">
          <h1 className="text-2xl text-center my-3">ใบจ่ายยา</h1>
          <section className="bg-white px-5 py-6 rounded-lg">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-3">
              <Input
                type="text"
                name="patient_id"
                label="Patient ID"
                placeholder="Enter your Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>

            <h1>สุขภาพพื้นฐาน</h1>

            <section className="flex flex-row gap-5 py-3">
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  name="heart_rate"
                  label="Heart Rate"
                  placeholder="Enter your Heart Rate"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </div>

              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  name="hemoglobin"
                  label="Hemoglobin"
                  placeholder="Enter your Hemoglobin"
                  value={hemoglobin}
                  onChange={(e) => setHemoglobin(e.target.value)}
                />
              </div>
            </section>

            <div className="flex gap-1 items-center cursor-pointer" onClick={addMedicine}>
              <h1>การจ่ายยา</h1>
              <svg className="w-4 h-4 text-gray-800 -mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
              </svg>
            </div>

            <section>
              {medicines.map((medicine) => (
                <div key={medicine.id} className="bg-gray-100 px-2 py-2 rounded-xl relative my-3">
                  <section className="flex flex-row gap-5 py-3">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        type="text"
                        label="Medicine Name"
                        placeholder="ชื่อยา"
                        value={medicine.med_name}
                        onChange={(e) => updateMedicine(medicine.id, "med_name", e.target.value)}
                      />
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        type="text"
                        label="Amount/Dosage"
                        placeholder="ปริมาณที่ต้องรับประทานต่อครั้ง"
                        value={medicine.dosage.toString()}
                        onChange={(e) => updateMedicine(medicine.id, "dosage", e.target.value)}
                      />
                    </div>
                  </section>

                  <Select
                    label="Timestamps"
                    placeholder="เลือกช่วงเวลา"
                    selectionMode="multiple"
                    className="w-full"
                    onSelectionChange={(values) => updateMedicine(medicine.id, "timestamps", values as unknown as string[])}
                  >
                    {period.map((timestamp) => (
                      <SelectItem key={timestamp.id}>{timestamp.period_name}</SelectItem>
                    ))}
                  </Select>

                  <div className="absolute top-0 right-0 -mt-1.5 -mr-1.5">
                    <svg
                      onClick={() => removeMedicine(medicine.id)}
                      className="cursor-pointer w-9 h-9 bg-white border-2 border-gray-400 p-1 rounded-full text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                  </div>
                </div>
              ))}
            </section>

            <Button type="submit" className="px-5 mt-5">
              ยืนยันข้อมูล
            </Button>
          </section>
        </section>
      </form>
      <Navbar />
    </div>
  );
}

