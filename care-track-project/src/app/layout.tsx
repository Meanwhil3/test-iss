import { NextUIProvider } from "@nextui-org/react";
import "@/app/globals.css";
import { getUser } from "@/server/user";
import { auth } from "@/auth/auth";
import { UserProvider } from "@/context/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLogin } from "@/types/user.type";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let user: UserLogin | null = null;

  if (session?.user?.email) {
    const fetchedUser = await getUser(session.user.email);
    if (fetchedUser) {
      user = {
        ...fetchedUser,
        patient: fetchedUser.patient ?? undefined,
        staff: fetchedUser.staff ?? undefined,
      };
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <NextUIProvider>
          <UserProvider user={user}>
            <ToastContainer />
            <div className="flex-grow">{children}</div>
          </UserProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}