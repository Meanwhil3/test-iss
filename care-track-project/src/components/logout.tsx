import { logout } from '@/lib/actions';

const Logout = () => {
 
 return (
  <form
   action={logout}
   className='h-screen w-screen flex flex-col justify-center items-center gap-10'
  >
   <button type='submit' className='w-40'>
    logout
   </button>
  </form>
 );
};

export default Logout;