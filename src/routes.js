/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import Reservation from "views/pages/Reservation/Reservation"
import Price from "views/pages/Price/Price.js"
import Dashboard from "views/pages/DashBoard/DashBoard";
import Calculate from "views/pages/Calculate/Calculate";
import Store from "views/pages/Store.js";
import Review from "views/pages/Review.js";
import Signin from "views/pages/Signin";
import Signup from "views/pages/Signup";
import StoreEdit from "views/pages/StoreEdit/StoreEdit";
import Refund from "views/pages/Refund";
var routes = [
  {
    path: "/dashboard",
    name: "대시 보드",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/storeedit",
    name: "매장 정보 설정",
    icon: "ni ni-favourite-28",
    component: StoreEdit,
    layout: "/admin",
  },
  {
    path: "/store",
    name: "매장 관리",
    icon: "ni ni-shop",
    component: Store,
    layout: "/admin",
  },
  {
    path: "/reservation",
    name: "예약 관리",
    icon: "ni ni-calendar-grid-58",
    component: Reservation,
    layout: "/admin",
  },
  {
    path: "/refund",
    name: "환불 관리",
    icon: "ni ni-archive-2",
    component: Refund,
    layout: "/admin",
  },
  {
    path: "/calculate",
    name: "정산 관리",
    icon: "ni ni-archive-2",
    component: Calculate,
    layout: "/admin",
  },
  {
    path: "/price",
    name: "가격 관리",
    icon: "ni ni-money-coins",
    component: Price,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "로그인(signin)",
    icon: "ni ni-favourite-28",
    component: Signin,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "회원가입(signup)",
    icon: "ni ni-favourite-28",
    component: Signup,
    layout: "/auth",
  },
];
export default routes;
