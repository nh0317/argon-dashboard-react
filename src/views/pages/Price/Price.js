import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import DayMenu from "./DayMenu.js";
import PriceTable from "./PriceTable.js";
import CouponTable from "./CouponTable";

import {
  Container
} from "reactstrap";

const Price = () => {

  const [reload, setReload]=useState(0); 

  const [holi, setHoli]=useState([]);
  const [week, setWeek]=useState([]);
  const [cost, setCost] =useState([]); //주말가격
  const [cost_, setCost_]=useState([]); //평일가격
  const [cost18, setCost18] =useState([]); //주말가격18
  const [cost_18, setCost_18]=useState([]); //평일가격18
  const [costPeriod, setCostPeriod] =useState([]); //특정기간주말가격
  const [costPeriod_, setCostPeriod_] =useState([]); //특정기간평일가격
  const [costPeriod18, setCostPeriod18] =useState([]); //특정기간주말가격
  const [costPeriod_18, setCostPeriod_18] =useState([]); //특정기간평일가격
  const [coupon, setCoupon]=useState([]);
  
  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);
  
  useEffect(()=>{
      const fetchData = async () =>{
          try {
              setError(null);
              setLoading(true);

              const i = await axios.get("/partner/get_storeIdx");
              const idx= i.data.result.storeIdx;
               const c1 = await axios.get(`/price/${idx}/week_price?isHoliday=true`);
               const c1_ = await axios.get(`/price/${idx}/week_price?isHoliday=false`)
               const c2 = await axios.get(`/price/${idx}/period_price?isHoliday=true`);
               const c2_ = await axios.get(`/price/${idx}/period_price?isHoliday=false`);
              const h = await axios.get("/price/week?isHoliday=true");
              const w = await axios.get("/price/week?isHoliday=false");
              const c = await axios.get(`/stores/coupons?storeIdx=${idx}`);
              setHoli(h.data.result);
              setWeek(w.data.result);
              setCost(c1.data.result.filter(c=>c.hole==9));
              setCost_(c1_.data.result.filter(c=>c.hole==9));
              setCost18(c1.data.result.filter(c=>c.hole==18));
              setCost_18(c1_.data.result.filter(c=>c.hole==18));
              setCostPeriod(c2.data.result.filter(c=>c.hole==9));
              setCostPeriod_(c2_.data.result.filter(c=>c.hole==9));
              setCostPeriod18(c2.data.result.filter(c=>c.hole==18));
              setCostPeriod_18(c2_.data.result.filter(c=>c.hole==18));
              setCoupon(c.data.result);
          } catch (e){
              console.log(e);
              setError(e);
          }
          setLoading(false);
      };
      fetchData();
  },[,reload]);

  
  return (
    <>
      <Header />
      <br/> <br/> <br/> <br/> <br/> <br/>
      <Container className="mt--7" fluid>
      <DayMenu holi={holi} setHoli={setHoli} week={week} setWeek={setWeek} reload={reload} setReload={setReload} />
      <PriceTable costHoli={cost18} cost={cost_18} reload={reload} setReload={setReload} hole={18}/>
      <PriceTable costHoli={cost} cost={cost_} reload={reload} setReload={setReload} hole={9}/>
      <PriceTable costHoli={costPeriod18} cost={costPeriod_18} reload={reload} setReload={setReload} hole={18} special={true}/>
      <PriceTable costHoli={costPeriod} cost={costPeriod_} reload={reload} setReload={setReload} hole={9} special={true}/>
      <CouponTable coupon={coupon} reload={reload} setReload={setReload} />
        <br/>
        </Container>
    </>
  );
};

export default Price;

