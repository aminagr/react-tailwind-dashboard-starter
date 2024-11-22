import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ layout: Layout, element, ...rest }) => {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authToken = localStorage.getItem('auth_token');


  return isLoggedIn && authToken ? (
    <Layout>
      {element}
    </Layout>
  ) : (
    <Navigate to="/" replace /> 
  );
};

export default PrivateRoute;
