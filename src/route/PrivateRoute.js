import React,{useEffect,useState} from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import axios from "axios";
import AdminLayout from "layouts/Admin"

function PrivateRoute ({ component: Component, ...rest }) {
    const history= useHistory();
    axios.post('/users/refresh').then(response => {
      if(response.data.isSuccess){
      }
      else{

                history.replace("/auth/signin");
      }
  });


    return (
        <Route
            {...rest}
            render = {props =>                 
                (
                    <AdminLayout {...props} />
                )
            }
        />
    )
}

export default PrivateRoute;
 