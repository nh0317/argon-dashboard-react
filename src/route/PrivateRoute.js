import React,{useEffect,useState} from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import axios from "axios";
import AdminLayout from "layouts/Admin"

function PrivateRoute ({ component: Component, ...rest }) {
    const history= useHistory();
    axios.post('/partner/refresh').then(response => {
      if(response.data.isSuccess){
      }
      else if(response.data.code==403){
        axios.post('/users/logout').then(response => {
            console.log(response);
            alert("로그아웃 되었습니다.");
            history.replace("/auth/signin");
            window.location.reload();
            });
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
 