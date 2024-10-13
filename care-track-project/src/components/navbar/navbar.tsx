// components/navbar/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // นำเข้า usePathname

export default function Navbar() {
  const pathname = usePathname(); // ดึงเส้นทางปัจจุบัน
  return (
    <nav className="bg-[#B2E0F4] border-t rounded-t-[2.5rem] mt-6 pb-6 p-4 fixed bottom-0 w-full shadow-inner">
      <ul className="flex justify-around items-center">
        <li>
          <Link href="/home" className="text-white hover:text-gray-300">
            <div>
                <svg 
                    className={`w-9 h-9 p-1 
                      ${
                        pathname === "/home" ? "bg-white w-9 h-9 p-1 rounded-xl text-[#B2E0F4]" : "text-white"
                      }
                    `}
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                </svg>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/activity" className="text-white hover:text-gray-300">
            <div>
                <svg
                    className={`w-9 h-9 p-1 
                      ${
                        pathname === "/activity" ? "bg-white w-9 h-9 p-1 rounded-xl text-[#B2E0F4]" : "text-white"
                      }
                    `} 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd"/>
                </svg>

            </div>
          </Link>
        </li>
        <li>
          <Link href="/notification" className="text-white hover:text-gray-300">
            <div>
                <svg
                    className={`w-9 h-9 p-1 
                      ${
                        pathname === "/notification" ? "bg-white w-9 h-9 p-1 rounded-xl text-[#B2E0F4]" : "text-white"
                      }
                    `} 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd"/>
                </svg>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
