"use client"
import Navbar from "@/components/navbar/navbar";
import { Staff } from "@/types/models";
import { Card, CardBody, Tabs, Tab, Input, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserProvider";
import { createAppointment } from "@/server/appointment";
import { toast } from "react-toastify";


export default function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [doctor, setDoctor] = useState<Staff | null>(null);
  const user = useUser()

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) return;  // Ensure the `id` is available
      try {
        const response = await fetch(`/api/doctor/${id}`);
        const data = await response.json();
        console.log(data)
        setDoctor(data);
      } catch (error) {
        console.log('Failed to fetch doctor:', error);
      }
    };
    fetchDoctor();
  }, [id]);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const selectedDateTime = new Date(`${appointmentDate}T${appointmentTime}Z`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDateTime < today) {
      setError("Please select a date and time that is not in the past.");
      return;
    }
    setError("");
    if (user && user.patient){
        const result = await createAppointment(user.patient.id, Number(id), selectedDateTime);
        if (result.success) {
            toast.success("Appointment created successfully!");
        } else {
            toast.error(result.error || "Failed to create appointment.");
        }
    }
    
  };

  return (
    <div className="bg-white">
      <Card className="shadow-none">
        <CardBody className="py-2 flex flex-row gap-2">
          <div className="overflow-hidden rounded-xl w-28 h-28">
            <img
              className="w-full h-full object-cover object-top"
              src="https://img.freepik.com/free-photo/smiling-asian-female-doctor-shows-thumbs-up-wears-rubber-gloves-clinic-uniform-stands-white-background_1258-83376.jpg?w=1800&t=st=1728510701~exp=1728511301~hmac=eb05fac4365a8459e0e743c984fc0d38a0b74ca4d0d541e417758a27ba8beb4e"
              alt="Doctor"
            />
          </div>

          <div>
            <div className="flex flex-col justify-between w-full text-black">
              <h1 className="text-sm uppercase font-bold mb-2">{doctor?.firstname} {doctor?.lastname}</h1>
              <div className="border-[0.5px] border-gray-600 px-2 rounded-md w-fit my-1">
                <p className="text-[0.6rem] text-gray-600">{doctor?.doctor_type}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <svg className="w-3 h-3 text-[#86CBE9]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd"/>
                </svg>
                <p className="text-xs text-[#86CBE9]">Queen Sirikrit National</p>
              </div>

              <div className="flex flex-row justify-start items-center gap-1">
                <svg className="w-3 h-3 text-[#86CBE9]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 .087.586l2.977-7.937A1 1 0 0 1 6 10h12V9a2 2 0 0 0-2-2h-4.532l-1.9-2.28A2 2 0 0 0 8.032 4H4Zm2.693 8H6.5l-3 8H18l3-8H6.693Z" clipRule="evenodd"/>
                </svg>
                <p className="text-xs text-[#86CBE9]">100+ cases</p>
              </div>
              
              <section className="flex flex-row gap-5 items-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg key={index} className="w-5 h-5 text-yellow-400 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-base font-medium">
                  {doctor?.price} ฿ <span className="font-normal text-sm">/ 15 นาที</span>
                </p>
              </section>
            </div>    
          </div>
        </CardBody>
      </Card>

      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="About" title="About">
            <Card>
              <CardBody>
                {doctor?.description}
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="Specification" title="Specification">
            <Card>
              <CardBody>
                {doctor?.specification}
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="Works" title="Works">
            <Card>
              <CardBody>
                {doctor?.work}
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div> 

      <form onSubmit={handleSubmit}>
        <h1 className="my-5 font-medium">Bookings</h1>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-3">
          <Input
            type="date"
            label="Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-wrap gap-4 my-3">
          <Input
            type="time"
            label="Event Time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" color="primary">
          ยืนยันการจอง
        </Button>
      </form>
      <Navbar />
    </div>
  );
}