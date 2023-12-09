import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Top = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('personal/main');
  }, []);
  return <div></div>;
};

export default Top;
