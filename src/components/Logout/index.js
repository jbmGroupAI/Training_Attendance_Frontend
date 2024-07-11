import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.setItem('is_authenticated', false);
    Swal.fire({
      icon: 'question',
      iconColor:"var(--primary)",
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor:"var(--secondary2-trans)",
      cancelButtonAriaLabel:"var(--secondary2)",
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            navigate('/ta/login', { replace: true });
          },
        });
      }
    });
  };

  return (
    <button
      // style={{ marginLeft: '12px' }}
      className="btn-login"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;

