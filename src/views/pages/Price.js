import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import * as S from "./style";

import {
  Badge,
  Card,Col,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavLink,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,Button,
  UncontrolledTooltip,
} from "reactstrap";

const Price = () => {

  const [cost, setCost] =useState([]);
  const [costPeriod, setCostPeriod] =useState([]);

  const [holi, setHoli] =useState([]);
  const [holiArr, setHoliArr]=useState([]);

  const [week, setWeek] =useState([]);
  const [weekArr, setWeekArr]=useState([]);
  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);

  const[dayEdit, setDayEdit]=useState(false);

  useEffect(()=>{
      const fetchData = async () =>{
          try {
              setError(null);
              setLoading(true);

              //idx로 불러오는 부분 수정이 필요함 
               const c1 = await axios.get(`/price/1/week_price`);
               const c2 = await axios.get(`/price/1/period_price`);

              const h = await axios.get("/price/week?isHoliday=true");
              const w = await axios.get("/price/week?isHoliday=false");
              setCost(c1.data.result);
              setCostPeriod(c2.data.result);
              setHoli(h.data.result);
              setWeek(w.data.result);


          } catch (e){
              console.log(e);
              setError(e);
          }
          setLoading(false);
      };
      fetchData();
  },[]);

  const  onDayChange=e=>{
    if(dayEdit){
      
      const newWeek=[];
      if(weekArr[0])newWeek.push("월");
      if(weekArr[1])newWeek.push("화");
      if(weekArr[2])newWeek.push("수");
      if(weekArr[3])newWeek.push("목");
      if(weekArr[4])newWeek.push("금");
      if(weekArr[5])newWeek.push("토");
      if(weekArr[6])newWeek.push("일");
      const newData={
        "weeks":newWeek,
        "isHoliday":false
      }

      const newHoli=[];
      if(holiArr[0])newHoli.push("월");
      if(holiArr[1])newHoli.push("화");
      if(holiArr[2])newHoli.push("수");
      if(holiArr[3])newHoli.push("목");
      if(holiArr[4])newHoli.push("금");
      if(holiArr[5])newHoli.push("토");
      if(holiArr[6])newHoli.push("일");
      const newData_={
        "weeks":newHoli,
        "isHoliday":true
      }

      try{
        axios.post('/price/register_week', newData);
        axios.post('/price/register_week', newData_);
      }catch(e){
        console.log(e);        
        };
      setWeek(newWeek);
      setHoli(newHoli);

       }
    setDayEdit(!dayEdit);
    setWeekArr([week.find(w=>w==="월")!=undefined,week.find(w=>w=="화")!=undefined,week.find(w=>w=="수")!=undefined,week.find(w=>w=="목")!=undefined,week.find(w=>w=="금")!=undefined,week.find(w=>w=="토")!=undefined,week.find(w=>w=="일")!=undefined]);
    setHoliArr([holi.find(w=>w==="월")!=undefined,holi.find(w=>w=="화")!=undefined,holi.find(w=>w=="수")!=undefined,holi.find(w=>w=="목")!=undefined,holi.find(w=>w=="금")!=undefined,holi.find(w=>w=="토")!=undefined,holi.find(w=>w=="일")!=undefined]);

  }
  const handleSelect=e=>{
    e.target.checked?
    (weekArr[e.target.value]=true): (weekArr[e.target.value]=false);
  }
  const handleSelectH=e=>{
    e.target.checked?
    (holiArr[e.target.value]=true): (holiArr[e.target.value]=false);
  }
  return (
    <>
      <Header />
      <br/> <br/> <br/> <br/> <br/> <br/>
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">평일/주말 요일 설정</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> 
                    구분</th>
                    <th scope="col">요일 </th>
                    
                  </tr>
                </thead>
                <tbody>
                <tr>

                    <th width="100">
                            평일
                    </th>

                      <td width="250">  {
                      dayEdit==false?
                      week.map(w=><a>{w+" "}</a>)
                    :
                    <Media>
                    <S.CheckBox type="checkbox"
                     name="월"
                     value="0"
                     defaultChecked={weekArr[0]}
                     onChange={e=>handleSelect(e)}     
                    /> 월
  <S.CheckBox type="checkbox"
   name="화"
   value="1"
   defaultChecked={weekArr[1]}
   onChange={e=>handleSelect(e)}     
  /> 화
    <S.CheckBox type="checkbox"
   name="수"
   value="2"
   defaultChecked={weekArr[2]}
   onChange={e=>handleSelect(e)}     
  /> 수
    <S.CheckBox type="checkbox"
   name="목"
   value="3"
   defaultChecked={weekArr[3]}
   onChange={e=>handleSelect(e)}     
  /> 목
    <S.CheckBox type="checkbox"
   name="금"
   value="4"
   defaultChecked={weekArr[4]}
   onChange={e=>handleSelect(e)}     
  /> 금
    <S.CheckBox type="checkbox"
   name="토"
   value="5"
   defaultChecked={weekArr[5]}
   onChange={e=>handleSelect(e)}     
  /> 토
    <S.CheckBox type="checkbox"
   name="일"
   value="6"
   defaultChecked={weekArr[6]}
   onChange={e=>handleSelect(e)}     
  /> 일
</Media>
                    }</td>
                    
                    </tr>              <tr>

<th width="100">
        주말
</th>   <td width="250">  {
                      dayEdit==false?
                      holi.map(w=><a>{w+" "}</a>)
                    :
                    <Media>
                    <S.CheckBox type="checkbox"
                     name="월"
                     value="0"
                     defaultChecked={holiArr[0]}
                     onChange={e=>handleSelectH(e)}     
                    /> 월
  <S.CheckBox type="checkbox"
   name="화"
   value="1"
   defaultChecked={holiArr[1]}
   onChange={e=>handleSelectH(e)}     
  /> 화
    <S.CheckBox type="checkbox"
   name="수"
   value="2"
   defaultChecked={holiArr[2]}
   onChange={e=>handleSelectH(e)}     
  /> 수
    <S.CheckBox type="checkbox"
   name="목"
   value="3"
   defaultChecked={holiArr[3]}
   onChange={e=>handleSelectH(e)}     
  /> 목
    <S.CheckBox type="checkbox"
   name="금"
   value="4"
   defaultChecked={holiArr[4]}
   onChange={e=>handleSelectH(e)}     
  /> 금
    <S.CheckBox type="checkbox"
   name="토"
   value="5"
   defaultChecked={holiArr[5]}
   onChange={e=>handleSelectH(e)}     
  /> 토
    <S.CheckBox type="checkbox"
   name="일"
   value="6"
   defaultChecked={holiArr[6]}
   onChange={e=>handleSelectH(e)}     
  /> 일
</Media>
                    }</td>
                    

</tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Button className="mt-2 mb-4"   
                color="info"
                onClick={e=>onDayChange(e)}
              >
               요일 정보 수정
              </Button>

       <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">평일/주말 가격 정보</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> 
                    구분</th>
                    <th scope="col">이름 </th>
                    <th scope="col">시간 </th>
                    <th scope="col">홀수</th>
                    <th scope="col">가격 </th>
                  </tr>
                </thead>
                <tbody>
                    <td  rowSpan={cost.filter(c=>c.isHoliday==false).length+1} width="100">
                            평일
                    </td>
                    {cost.map(c=>c.isHoliday==false ? 
                    <tr>
                      <th  width="250">{c.name} </th>
                      <th width="250"> {c.startTime+" ~ "+c.endTime} </th>
                      <td width="250"> {c.hole}홀 </td>
                      <th> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                    </tr>
                      :null
                      )}
                  
                  <td  rowSpan={cost.filter(c=>c.isHoliday==true).length+1}>
                           주말
                    </td>
                    {cost.map(c=>c.isHoliday==true ? 
                    <tr>
                      <th scope="row">{c.name} </th>
                      <th> {c.startTime+" ~ "+c.endTime} </th>
                      <td> {c.hole}홀 </td>
                      <th> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                    </tr>
                      :null
                      )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <br/>

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">특수 기간 가격 정보</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> 
                    구분</th>
                    <th scope="col">이름 </th>
                    <th scope="col">기간 </th>

                    <th scope="col">시간 </th>
                    <th scope="col">홀수</th>
                    <th scope="col">가격 </th>
                  </tr>
                </thead>
                <tbody>
                      {costPeriod.filter(c=>c.isHoliday==false).length!=0 ?
                    <td  rowSpan={costPeriod.filter(c=>c.isHoliday==false).length+1} width="100">
                            평일
                    </td>
                    : null}
                    {costPeriod.map(c=>c.isHoliday==false ? 
                    <tr>
                      <th  width="250">{c.name} </th>
                      <td width="250"> {c.startDate+" ~ "+c.endDate} </td>
                      <td width="250"> {c.startTime+" ~ "+c.endTime} </td>
                      <td width="250"> {c.hole}홀 </td>
                      <th> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                    </tr>
                      :null
                      )}
                                        {costPeriod.filter(c=>c.isHoliday==true).length!=0 ?

                  <td  rowSpan={cost.filter(c=>c.isHoliday==true).length+1}>
                           주말
                    </td>:null}
                    {costPeriod.map(c=>c.isHoliday==true ? 
                    <tr>
                      <th scope="row">{c.name} </th>
                      <td width="250"> {c.startDate+" ~ "+c.endDate} </td>
                      <td width="250"> {c.startTime+" ~ "+c.endTime} </td>
                      <td width="250"> {c.hole}홀 </td>
                      <th width="250"> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                    </tr>
                      :null
                      )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>

        </Container>
    </>
  );
};

export default Price;