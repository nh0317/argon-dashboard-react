import React, {useState, useEffect} from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader, Table, Input ,Button} from "reactstrap";
import Header from "./Header.js";
import { useHistory } from 'react-router-dom';
import style from "views/pages/DashBoard/style";
import {Calendar, momentLocalizer} from 'react-big-calendar'
//import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "axios";
import useInput from "hooks/useInput";


const Dashboard = () => {

  const [datetimer, setDateTimer] = useState("00:00:00");
  const [clocktimer, setClockTimer] = useState("00:00:00");

  const currentDateTimer = () => {
    const date = new Date();
    const year= String(date.getFullYear());
    const month= String(date.getMonth()+1).padStart(2, "0");
    const day= String(date.getDate()).padStart(2, "0");
    setDateTimer(`${year}년 ${month}월 ${day}일`)
  }
  const currentClockTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setClockTimer(`${hours}:${minutes}:${seconds}`)
  }

  const startTimer = () => {
    setInterval(currentDateTimer, 1000)
    setInterval(currentClockTimer, 1000)
  }

  startTimer()

  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment)
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" }
  ];

  const [reload, setReload]=useState(1);
  const [dayData, setDayData ] = useState([]);
  const [monthData, setMonthData ] = useState([]);
  const [review, setReview]=useState([]);
  const [reserve, setReserve] =useState([]);
  const [memos, setMemos] =useState([]);
  const [newMemo, onChangeNewMemo, setNewMemo]=useInput();
  const [dateData, setDateData]=useState([]);
  const [dateDetail, setDateDetail] =useState(null);
  const [ifNew, setIfNew]=useState();
  const [loading, setLoading] =useState();
  const [error, setError]=useState();
  const history= useHistory();

  useEffect(()=>{

      const fetchData = async () =>{
          try {
              setError(null);
              setLoading(true);

              const i = await axios.get("/partner/get_storeIdx");
              if(i.data.code==3015) setIfNew(true);
              else if(i.data.code==3010 ){ //모바일 계정인 경우
                axios.post('/users/logout').then(response => {
                  console.log(response);
                  alert("로그아웃 되었습니다.");
                  history.replace("/auth/signin");
                  window.location.reload();
                  });
                }

              const d = await axios.get("/dashboard/today-sales");
              setDayData(d.data.result);
              // "reservationCount": 3,    "todaySales": 135000
              const d2 = await axios.get("/dashboard/month-sales");
              setMonthData(d2.data.result);   
              //    "reservationCount": 4, "monthSales": 189000
              const d3 = await axios.get("/dashboard/reservations");
              setReserve(d3.data.result);
              // "reservationTime": "15:30",  "selectedHall": 3, "personCount": 1, "numberOfGame": 2, "userTime": 60
             
              const d6= await axios.get("/partner/star_point");
              setReview(d6.data.result);
                        
              const d5 = await axios.get("/dashboard/calendar");
              d5.data.result.map(d=>{
                setDateData(prev=>[...prev,{
                  
                    'title': d.count + "건",
                    'allDay': true,
                    'start': new Date(d.date),
                    'end': new Date(d.date)
                }]);
              });
        
               } catch (e){
              console.log(e);
              setError(e);
          }
          setLoading(false);
      };
      fetchData();
  },[ ]);

  useEffect(()=>{
    const fetchMemo = async () =>{
        try {
            setError(null);
            setLoading(true);
            const d4 = await axios.get("/dashboard/memo");
            setMemos(d4.data.result);
        } catch (e){
            console.log(e);
            setError(e);
        }
        setLoading(false);
    };
    fetchMemo();
},[ ,reload]);

const onCreateMemo=e=>{
 const newData= {
  "content" : newMemo
}
try{
  axios.post('/dashboard/memo', newData).then(response => {
  console.log(response);
  setNewMemo("");
  setReload(reload+1);
  });
}catch(e){
  console.log(e);
}}
const onDelMemo=e=>{
  try{
    axios.delete(`/dashboard/memo/${e.target.value}`).then(response => {
    console.log(response);
    setReload(reload+1);
    });
  }catch(e){
    console.log(e);
  }
}
 const onSelectEvent=e=>{
   const date = e.start.toISOString().substr(0,10);
   try{
    axios.get(` /dashboard/reservations/day?reservationDay=${date}`).then(response => {
    setDateDetail(response.data.result);
    });
  }catch(e){
    console.log(e);
  }
  


 }


  return (
    <>      <Header dayData={dayData} monthData ={monthData} datetimer={datetimer} clocktimer={clocktimer} review={review} ifNew={ifNew}/>

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8" lg="8">
         
            <Card className="shadow" style={{height:"100%"}}>
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">오늘 예약 및 매장 현황</h3>
              </CardHeader>
              <CardBody>
              <Table>
                <thead className="thead-light">
                <tr>
                <th scope="col"> 시간</th>
                <th scope="col">홀</th>
                <th scope="col">인원 수 </th>
                <th scope="col">게임 수</th>
                <th scope="col">이용 시간</th>
                </tr></thead>
                <tbody>
                  {reserve?reserve.map(d=>
                      <tr key={d.reservationTime}>
                      <td>{d.reservationTime}</td>
                      <td>{d.selectedHall}</td>
                      <td>{d.personCount}</td>
                      <td>{d.numberOfGame}</td>
                      <td>{d.userTime}</td>
                      </tr>
                    ):null}
                </tbody>
              </Table>

                </CardBody>
                </Card>
          </Col>
              <Col lg="8" xl="4">
                <Card  className="shadow ">
                <CardHeader className="bg-info">
                <h3 className="mb-0">관리자 메모</h3>
              </CardHeader>
                  <CardBody>
                <Table>
                {memos?memos.map(d=>
                <tr key={d.memoIdx}>
                <td>
              <span className="h5">
             {d.memo}
              </span>  
              </td>
              <td>
              <button className="btn btn-outline-secondary btn-sm"
              value={d.memoIdx}
              onClick={e=>onDelMemo(e)}
              >
                 [ - ]
              </button>  
              </td>
            </tr>):null}
                    
                    <tr>    <th>
<Input style={{display:"inline-block" ,width:"85%"}}
                        className="form-control-alternative mr-2"
                        rows="3"
                        value={newMemo}
                        onChange={onChangeNewMemo}
                        placeholder="메모 추가"
                        type="textarea"
                      /> 
                  <Button
                  Input style={{verticalAlign:"top"}}
                   onClick={e=>onCreateMemo(e)} 
                color="info">
               추가
              </Button>
                    </th> 
                    </tr>
                </Table>
                  </CardBody>
                </Card>
              </Col>
              </Row>
              <br/>
            
          <Card className="card-stats mb-4 mb-xl-0 col-md-30 col-sm-60 h-100">
              <CardHeader className="bg-info">
                <h3 className="mb-0 text-white">이번 달 예약 현황</h3>
              </CardHeader>
                  <CardBody>
                    <Calendar
                      events={dateData}
                      startAccessor="start"
                      endAccessor="end"
                      defaultDate={moment().toDate()}
                      localizer={localizer}
                      style={{ height: 600 }}
                      onSelectEvent = {event => onSelectEvent(event)}
                    /> 
                  </CardBody>
                  { dateDetail?
                  <CardBody
                    style={{height: 300}}>
             <CardHeader className="bg-transparent">
                <h4 className="mb-0">선택 날짜 예약 현황</h4>
              </CardHeader>                  <Table>
                <thead className="thead-light">
                <tr>
                <th scope="col">예약 시간</th>
                <th scope="col">이용 시간</th>
                <th scope="col">홀</th>
                <th scope="col">인원 수 </th>
                <th scope="col">게임 수</th>
                </tr></thead>
                <tbody>
                  {dateDetail.map(d=>
                      <tr key={d.reservationTime}>
                      <th>{d.reservationTime}</th>
                      <th>{d.userTime}분</th>
                      <td>{d.selectedHall}홀</td>
                      <td>{d.personCount}명</td>
                      <td>{d.numberOfGame}회</td>
                      </tr>
                    )}
                </tbody>
              </Table>

                  </CardBody>:null}
                </Card>
        </Container>
    </>
  );
};

export default Dashboard;