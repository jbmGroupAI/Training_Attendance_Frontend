import React from 'react';
import Swal from 'sweetalert2';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
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
            setIsAuthenticated(false);
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
