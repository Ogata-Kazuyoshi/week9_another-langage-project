import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Top = (props) => {
  const { setIsAuth } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(true);
    navigate('personal/main');
  }, []);
  return <div></div>;
};

export default Top;
