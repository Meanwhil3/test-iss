// app/home/page.tsx
"use client"
import {Link, Card, CardBody, CardFooter} from "@nextui-org/react";
import Navbar from "@/components/navbar/navbar";  // นำเข้า NavBar ที่นี่
import { useUser } from '@/context/UserProvider'
import { useEffect, useState } from "react";
import { Staff } from "@prisma/client";


export default function HomePage() {
    const user = useUser()
    const [staffs, setStaff] = useState<Staff[]>()
    const [loading, isLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const response = await fetch('/api/doctor');  // Fetch from API route
            const data = await response.json();
            setStaff(data);
            isLoading(false)
          } catch (error) {
            console.error("Failed to fetch doctors:", error);
          }
        };
        fetchDoctors();
      }, []);
    return (
        <div className="pb-24">
            <section className="px-4">
                <div className="bg-gradient-to-b from-[#C1D3E6] to-white to-65% rounded-b-3xl py-3 mb-3 -mx-4 px-5">
                    <div className="flex gap-3 h-10 items-center my-3">
                        <div className="w-10 h-10 rounded-3xl overflow-hidden">
                            <img src="https://nextui.org/images/hero-card-complete.jpeg" className="w-full h-full object-cover object-center" alt="" width={100} height={100} />
                        </div>
                        <div className="flex flex-col text-black">
                            <h1 className="text-xs font-bold">Good Morning.</h1>
                            <p className="text-xs">{ user?.username }</p>
                        </div>
                    </div>

                    <h1 className="text-black font-extralight text-5xl mt-8 my-3">How Are You<br></br>Felling Today?</h1>

                </div>
                
                <section className="">

                
                    <h1 className="text-gray-700 border-b pb-1 text-sm border-gray-700  w-fit">
                        ปรึกษาแพทย์ / หาที่ปรึกษาสุขภาพ
                    </h1>
                    {/* get all doctors */}
                    {
                        loading ? <div>loading</div> : staffs?.map((data, index) => (
                            <Card key={index} className="pt-2 pb-0 bg-white shadow-none  rounded-xl border-[1px] border-gray-200 my-4 mx-3">
                                <Link href={`/doctor/${data.id}`}>
                                    <CardBody className="overflow-visible py-2 grid grid-cols-7 gap-2 w-full h-24">
                                        <div className="col-span-2 overflow-hidden rounded-xl w-[80px] h-[80px]">
                                            <img className="object-cover object-center w-full h-20" src="https://www.tidalhealth.org/sites/default/files/styles/physician_photo_focal_point_245x303_/public/site_media/2023-03/Zee-Ali-PA-C.jpg?h=da6474f4&itok=rvqkEs9F"  alt="Profile" width={100} height={100} />
                                        </div>
                                        <div className="col-span-5 flex flex-col justify-between w-full text-black">
                                            <h1 className="text-lg uppercase font-bold">{data.firstname} {data.lastname}</h1>
                                            <div className="border-[0.5px] border-gray-600 px-2 rounded-md w-fit">
                                                <p className="text-xs text-gray-600">General Health</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <svg key={index} className="w-5 h-5 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-base font-medium">
                                                    300 ฿ <span className="font-normal text-sm">/ 15 นาที</span>
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Link>
                                <CardFooter className="pb-0 px-0">
                                    <div className="bg-[#86CBE9] w-full text-center flex justify-center items-center gap-2 py-2.5 border-t border-[#d8f3ff]">
                                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z" clipRule="evenodd"/>
                                        </svg>
                                        <p className="text-white">ปรึกษาทันที</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </section>
            </section>
            <Navbar />
        </div>
    );
  }
  