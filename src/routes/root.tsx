import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';

export default function Root() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}
