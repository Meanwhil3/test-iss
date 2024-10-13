import Logout from '@/components/logout'
// import { createAppointment } from '@/server/appointment'
// import { createPeriod } from '@/server/medication'
// import { getSelectDoctor } from '@/server/user'


const Page = async () => {
    // Test Create
    // const createPeriods = await createPeriod()
    // console.log(createPeriods)
// Create MedicationAllocation
    //   const createMed = await createMedication(
    //     1, 100, 200, "yakult", 1, [1,2]
    //   )
    //   console.log(createMed)
// Create Appointment
    // const createApp = await createAppointment(
    //     1, 1, new Date('1970-01-01T08:00:00.000Z')
    // )
    // console.log(createApp)
// View Appointments
    // const viewApp = await viewAppointments(1)
    // console.log(viewApp)
// กรอกข้อมูลหมอ
//  const viewApp = await getSelectDoctor(1)
//     console.log(viewApp)
  return (
    <div>
        <Logout />
    </div>
  )
}

export default Page