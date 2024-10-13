// app/activity/page.tsx
"use client";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import Navbar from "@/components/navbar/navbar";  // นำเข้า NavBar ที่นี่
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserProvider";
import { MedicationAllocation } from "@/types/models";
import { viewMedicines } from "@/server/medication";

export default function ActivityPage() {
  const [medicine_allos, setMeds] = useState<MedicationAllocation[] | undefined>([])
  const user = useUser()
  useEffect(() => {
    const fetchData = async () => {
      if (user?.patient?.id) {
        const medicines = await viewMedicines(user?.patient?.id)
        setMeds(medicines)
      }
    }
    fetchData()
  }, [user])
  console.log(medicine_allos)
  return (
    <div className="pb-24">
      <section className="px-4">
        <div className="rounded-b-3xl px-3 py-3 mb-3">
          <div className="flex gap-3 h-10 items-center my-3">
            <h1 className="text-3xl text-black font-medium">Activity</h1>
          </div>
        </div>
        <Accordion variant="splitted" showDivider={false}  className="">
          {medicine_allos ? medicine_allos.map((med, index) => (
            <AccordionItem key={index} className="bg-white  rounded-3xl -mx-2 px-2 py-0 mb-3"
              startContent={
                <div className="">
                  <div className="flex relative justify-between items-center gap-4">
                    <div className="w-20 h-20 overflow-hidden rounded-full border border-[#86CBE9]">
                      <svg className="w-full h-full p-4 text-[#86CBE9]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                      </svg>
                    </div>
                    <div className="text-black text-start">
                      <h1>จ่ายยาครั้งที่ { med.id }</h1>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-[#86CBE9]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd"/>
                        </svg>
                        <p className="text-xs">{ med.time_stamp.toDateString() }</p>
                      </div>
                    </div>
                  </div>
                </div>
              }>
              <div className="flex w-full flex-col">
                <Tabs aria-label="Options">
                  <Tab key="การจ่ายยา" title="การจ่ายยา">
                    <Card className="border-0 shadow-none bg-none rounded-none bg-transparent p-0">
                      <CardBody className="py-3 pb-8 border-0 bg-none p-0">
                      
                        {med.medicine ? med.medicine.map((med_count, index) => (
                          <div key={index}>
                            <section className="bg-white border border-gray-300 rounded-2xl px-4 py-3 pb-5 mb-6">
                              <h1 className="text-lg font-medium">{med_count.medicine_name}</h1> 
                              <p className="text-xl text-gray-500">รับประทาน <span className="text-2xl font-semibold text-gray-600">{ med_count.dosage }</span> แคปซูล</p>
                              <div className="flex gap-1 mt-3">
                              { med_count.period.map((period, indexs) => (
                                <div key={indexs} className="w-24 px-2 rounded-lg bg-[#E0F1EE]">
                                  <p className="text-[#69BBAC] text-xs py-1 w-full text-nowrap">{period.period_name}</p>
                                </div>
                              ))}                                 
                              </div>
                            </section>
                          </div>
                        )) : <></>}
                      </CardBody>
                    </Card>  
                  </Tab>
                  <Tab key="สุขภาพพื้นฐาน" title="สุขภาพพื้นฐาน">
                    <Card className="border-0 shadow-none bg-none rounded-none bg-transparent p-0">
                      <CardBody className="py-3 pb-8 border-0 bg-none p-0">
                        <div className="flex justify-between gap-3">
                          <div className="border border-gray-300 w-1/2 px-3 py-2 rounded-xl">
                            <div className="bg-white w-6 h-6">
                              <svg className="w-full h-full text-[#16AF87]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.495.93A.5.5 0 0 0 6.5 13c0 1.19.644 2.438 1.618 3.375C9.099 17.319 10.469 18 12 18c1.531 0 2.9-.681 3.882-1.625.974-.937 1.618-2.184 1.618-3.375a.5.5 0 0 0-.995-.07.764.764 0 0 1-.156.096c-.214.106-.554.208-1.006.295-.896.173-2.111.262-3.343.262-1.232 0-2.447-.09-3.343-.262-.452-.087-.792-.19-1.005-.295a.762.762 0 0 1-.157-.096ZM8.99 8a1 1 0 0 0 0 2H9a1 1 0 1 0 0-2h-.01Zm6 0a1 1 0 1 0 0 2H15a1 1 0 1 0 0-2h-.01Z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <h1 className="font-semibold">Health Rate</h1>
                            <p className="text-xs">Your Health Rate is<br></br>Normal</p>

                            <h1 className="text-2xl font-semibold py-3">{med.heart_rate}<span className="text-xs font-normal ml-2">bpms</span></h1>
                          </div>

                          <div className="border border-gray-300 w-1/2 px-3 py-2 rounded-xl">
                            <div className="bg-white w-6 h-6">
                              <svg className="w-full h-full text-[#FE7173]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.495.93A.5.5 0 0 0 6.5 13c0 1.19.644 2.438 1.618 3.375C9.099 17.319 10.469 18 12 18c1.531 0 2.9-.681 3.882-1.625.974-.937 1.618-2.184 1.618-3.375a.5.5 0 0 0-.995-.07.764.764 0 0 1-.156.096c-.214.106-.554.208-1.006.295-.896.173-2.111.262-3.343.262-1.232 0-2.447-.09-3.343-.262-.452-.087-.792-.19-1.005-.295a.762.762 0 0 1-.157-.096ZM8.99 8a1 1 0 0 0 0 2H9a1 1 0 1 0 0-2h-.01Zm6 0a1 1 0 1 0 0 2H15a1 1 0 1 0 0-2h-.01Z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <h1 className="font-semibold">Hemoglobin</h1>
                            <p className="text-xs">Your hemoglobin<br></br>level is <span>Normal</span></p>

                            <h1 className="text-2xl font-semibold py-3">{med.hemoglobin}<span className="text-xs font-normal ml-2">mmHg</span></h1>
                          </div>
                        </div>
                      </CardBody>
                    </Card>  
                  </Tab>
                </Tabs>
              </div>  
            </AccordionItem>
          )): <></>}
      </Accordion>
    </section>
  
        
    

    <Navbar />  
    </div>
    
  );
}
