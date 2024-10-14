// app/notification/page.tsx
"use client";
import Navbar from "@/components/navbar/navbar"; // นำเข้า NavBar ที่นี่
import { viewMedicines } from "@/server/medication";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserProvider";
import { MedicationAllocation, QueryMedicine} from "@/types/models"; 
import { Period } from "@/types/models";

export default function NotificationPage() {
  const [medicine_allos, setMeds] = useState<
    MedicationAllocation[] | undefined
  >([]);
  const user = useUser();
  useEffect(() => {
    const fetchData = async () => {
      if (user?.patient?.id) {
        const medicines = await viewMedicines(user?.patient?.id);
        setMeds(medicines);
      }
    };
    fetchData();
  }, [user]);
  console.log(medicine_allos);
  return (
    <div className="pb-24">
      <section className="px-4">
        <div className="bg-gradient-to-b from-[#C1D3E6] to-white to-65% -mx-4 pb-24">
          <div className="rounded-b-3xl px-3 py-3 mb-3">
            <div className="flex gap-3 h-10 items-center my-3">
              <h1 className="text-3xl text-black font-medium">
                Medicine reminder
              </h1>
            </div>
          </div>
          {/* <h1>{user?.patient?.id}</h1> */}
          {medicine_allos?.map((med: MedicationAllocation) =>
            med.medicine?.map((medicine: QueryMedicine) => (
              <div
                key={medicine.id}
                className="bg-white rounded-3xl mx-3 px-4 py-6 mb-5 shadow-md relative"
              >
                <div className="flex relative items-center gap-3">
                  <div className="w-16 h-16 rounded-full border border-[#B2E0F4] overflow-hidden relative">
                    <svg
                      className="text-[#B2E0F4] p-3"
                      fill="#B2E0F4"
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 520.532 520.532"
                    >
                      <g>
                        <path d="M407.666,147.391H112.875C50.637,147.391,0,198.025,0,260.263c0,62.24,50.637,112.878,112.875,112.878h294.791   c62.229,0,112.866-50.638,112.866-112.878C520.532,198.025,469.9,147.391,407.666,147.391z M142.727,192.363   c-78.586,0-83.98,41.81-84.021,42.238c-0.618,5.739-5.467,10.001-11.121,10.001c-0.393,0-0.798-0.018-1.197-0.068   c-6.156-0.653-10.604-6.18-9.945-12.32c0.272-2.545,7.802-62.241,106.284-62.241c6.18,0,11.198,5.012,11.198,11.198   S148.913,192.363,142.727,192.363z M407.666,345.153h-95.151V175.379h95.151c46.808,0,84.885,38.083,84.885,84.884   C492.55,307.07,454.473,345.153,407.666,345.153z" />
                      </g>
                    </svg>
                  </div>

                  <div className="text-black text-start">
                    <h1 className="text-xl font-medium">
                      {medicine.medicine_name}
                    </h1>
                    <p className="text-xl">{medicine.dosage} เม็ด</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {medicine.period ? (
                    medicine.period.map((p: Period) => (
                      <div className="w-24 px-2 rounded-lg bg-[#E0F1EE]" key={p.id}>
                        <p className="text-[#69BBAC] text-xs py-1 w-full text-nowrap">
                          {p.period_name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <div className="top-0 right-0 absolute -mt-1 -mr-1">
                  <svg
                    className="w-8 h-8 p-1 bg-[#86CBE9] rounded-full"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <Navbar />
    </div>
  );
}
