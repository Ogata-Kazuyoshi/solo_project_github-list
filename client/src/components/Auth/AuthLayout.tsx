import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, []);
  return (
    <div>
      {/* AuthLayout */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
