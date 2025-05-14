import { toast } from 'react-toastify';

export const handleLogout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.warning('You have been logged out because your session expired, Please Login again', {
        position: toast.POSITION.center,
        autoClose: 2000,
    });
    navigate('/login');
};


//Using this in your logout button

// import { handleLogout } from '../utils/auth';
// import { useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();

//   return (
//     <button onClick={() => handleLogout(navigate)}>
//       Logout
//     </button>
//   );
// }