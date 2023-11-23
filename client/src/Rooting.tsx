import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rooting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/auth');
  }, []);
  return <div></div>;
};

export default Rooting;
