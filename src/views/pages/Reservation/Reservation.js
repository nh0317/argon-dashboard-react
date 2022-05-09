import React, {useCallback, useState, useEffect} from "react";
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader, CardGroup,Table,Button } from "reactstrap";
import Header from "components/Headers/Header.js";
import style from "views/pages/DashBoard/style";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import axios from "axios"
import './style.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { az } from "date-fns/locale";
import { ListItem } from "@mui/material";

//const newEvents = [];
const dateObj=new Date();
let sw=0;

const Reservation = () => {

  const [eventDb, setEventDb] = useState([]);
  //const [smalleventDb, setsmallEventDb] = useState([]);

  const [day, setDay] = useState({dateObj});

  const [fullyear, setFullyear] = useState();
  const [month, setMonth] = useState();

  const [error, setError]=useState();
  const [loading, setLoading]=useState();

  const [rooms, setRooms] = useState([]);
  const [resourcemap, setResourceMap] = useState([]);

  const [reservations, setReservations] = useState([]);
  
  //const [selectedDate, setSelectedDate] = useState();
  const [selectedyear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedmonth, setSelectedMonth] = useState((("0" + (new Date().getMonth()+1)).toString().slice(-2)));
  const [selecteddate, setSelectedDate] = useState((("0" + new Date().getDate()).toString().slice(-2)));

  const [caldata, setCaldata] = useState([]);

  const [category, setCategory] = useState();
  const [selected, setSelected] = useState();
  const [selectedTF, setSelectedTF] = useState(true);
  const [selectedslot, setSelectedSlot] = useState([]);

  let room=[];
  let res=[];

  let today = new Date();

  let format ={
    eventTimeRangeFormat:() =>{
      return null;
    },
    timeGutterFormat: (date, culture, localizer) => 
          localizer.format(date, 'H:mm', culture),
  }

  const onSelectDate = (date) => {
    const newDate= new Date(date);
    console.log(newDate);
    let s_date = ("0" + newDate.getDate()).toString().slice(-2);
    setDay(newDate);
    setSelectedYear(newDate.getFullYear());
    setSelectedMonth((("0" + (newDate.getMonth()+1)).toString().slice(-2)));
    setSelectedDate((("0" + newDate.getDate()).toString().slice(-2)));
  }

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      //backgroundColor: 'lightblue', // 캘린더 내부 색상
    },
  })
  
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment)

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    let roomroom=[];
    //console.log(selected);
    //console.log(rooms);
    console.log("selected 변화 감지");
    //console.log(rooms);
    try{
      for(var i=0;i<rooms.length;i++){
        if(rooms[i].roomType==selected){
          roomroom.push({resourceId: parseInt(rooms[i].roomIdx), resourceTitle: rooms[i].roomName, resourceCategory: rooms[i].roomType});
        }
      }
      //console.log(roomroom);
      setResourceMap(roomroom);
    } catch(e){

    }
  },[selected])

  const ResourceMap = () => {
    let roomroom=[];
    let roomcategory=[];
    let roomrooms=[];
    let cnt=0;
    try{
      for(var i=0 ; i<room.length ; i++){
        roomroom.push({resourceId: parseInt(room[i].roomIdx), resourceTitle: room[i].roomName, resourceCategory: room[i].roomType});
        if(roomcategory.includes(room[i].roomType)==false){
          roomcategory.push(room[i].roomType);
          //roomrooms.push(room[i].roomType)
          cnt++;
        }
      }
      //console.log(roomcategory);
      //console.log(roomroom);
      //setResourceMap(roomroom);
      setRooms(room);
      setCategory(roomcategory);
    } catch (e){
      console.log(e);
    }
  }

  const ReserveData = () => {
    //setEventDb([]);
    let reserv=[];
    console.log("RES");
    console.log(res);
    console.log("RESOURCEMAP");
    console.log(resourcemap);
    console.log(rooms);
    try{
      for(var i=0 ; i<res.length;i++){
        let roomname="";
        for(var j=0;j<rooms.length;j++){
          if(rooms[j].roomIdx == res[i].roomIdx){
            //console.log("카테고리기입");
            //console.log(rooms[j].roomType);
            roomname=rooms[j].roomType;
            break;
          }
        }
        reserv.push({
          title: res[i].request,
          id: 1,
          start: new Date(res[i].reservationTime)
          ,end: new Date(res[i].endTime),
          resourceId: res[i].roomIdx,
          data:{
            numberOfGame: res[i].numberOfGame,
            personCount: res[i].personCount,
            reservationIdx: res[i].reservationIdx,
            reservationPrice: res[i].reservePrice,
            selectedHall: res[i].selectedHall,
            useTime: res[i].useTime,
            resquest: res[i].request,
            roomname: roomname
          },
        });
      }
      console.log("asdf");
      console.log(reserv);
      setEventDb(reserv);
    } catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    const fetchDate = async() =>{
      try{
        console.log(selectedyear + " " + selectedmonth + " " + selecteddate);
        const reserve = await axios.get("/reservation-management/reservations/day?reservationDay="+selectedyear+"-"+selectedmonth+"-"+selecteddate);
        console.log(reserve.data.result);
        res=reserve.data.result;
        
        //setReservations(reserve.data.result);
        //console.log(reservations);
        ReserveData();
      }catch(e){
        console.log(e);
        setError(e);
      }
    setLoading(false);
    }
    fetchDate();
  },[selecteddate]);

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        //console.log("THISYEARMONTH");
        console.log(selectedyear+ " "+selectedmonth);
        setError(null);
        setLoading(true);
        setRooms(null);
        setReservations(null);

        //const refund = await axios.get("/pay/refund-list");
        //setRefunds(refund.data.result);

        const storeinfo = await axios.get("/partner/get_storeIdx");
        console.log(storeinfo.data.result);
        let stidx = storeinfo.data.result.storeIdx;
        console.log("Storeindex: "+stidx);

        const roomidx = await axios.get("/stores/roomName?storeIdx="+stidx);
        //console.log(roomidx.data.result);
        room=roomidx.data.result;
        setRooms(roomidx.data.result);
        //console.log(rooms);
        
        //console.log("fetchData");
        ResourceMap();

        let caldt =null;
        console.log(selectedyear + " "+selectedmonth);
        console.log(" ↑ 해, 달");
        caldt = await axios.get("/reservation-management/reservations/month?date="+selectedyear+"-"+selectedmonth);
        console.log(caldt.data.result);
        console.log(" ↑ 로딩 시 달력 리스트");        
        caldt.data.result.map(d=>{
          setCaldata(prev=>[...prev,{'title': d.cntReservation + "건", 'start': new Date(d.date), 'end': new Date(d.date)}]);
        });
        console.log("fetchData끝");
    } catch (e){
        console.log(e);
        setError(e);
    }
    setLoading(false);
    };
    fetchData();
  },[selectedyear, selectedmonth]);

  const onRefund=e=>{
  const re= 
  {
    "reservationIdx":Number(e.target.name),
    "cancelAmount":Number(e.target.value)
};
console.log(re);
  axios.post("/pay/approve_refund",re).then(response => {
    console.log(response);  
  });
//  window.location.reload();
}

const handleSelectEvent = (data) => {
  //console.log("슬롯선택!");
  //console.log(data);
  setSelectedSlot(data);
  //reservationInfo(data);
}

function makeChips(){
  try{
    let chipList=[];
    if(category.length!=0){
      for(var i=0;i<category.length;i++){
        chipList.push({key:i+1, label: category[i]});
      }
    }
    if(chipList.length!=0){
      if(selected==null){
        setSelected(chipList[0].label);
        setSelectedTF(chipList[0].key);
      }
      return(
        <>
          <Stack direction="row" spacing={0}>
            {
              chipList.map((value) => {
                return(
                <ListItem key={value.key}>
                  <Chip
                    label={value.label}
                    onClick={() => {
                      setSelected(value.label)
                      setSelectedTF(value.key)
                    }}
                    color={selected && value.key==selectedTF ? "primary" : "default"}
                    id={`chip_${value.label}`}
                  />
                </ListItem>
                )
              })
            }
          </Stack>
        </>
      )
    }
    else{
      return(
        <>
          <span>　</span>
        </>
      )
    }
  } catch(e){
    //console.log(e);
  }
}

function makeBigCalendar(){
  //console.log("makeBigCalendar");
  //console.log(resourcemap);
  return(
    <Calendar
      //큰캘린더
      //popup={false}
      events={eventDb}
      localizer={localizer}
      defaultView={'day'}
      views ={['day']}
      timeslots={4}
      step={15}
      defaultDate={new Date()}
      formats={format}
      //onSelectEvent = {event => onSelectEvent(event)}
      min={new Date(today.getFullYear(),today.getMonth(), today.getDate(), 0)}
      //max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23)}
      resources={resourcemap}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      culture={moment.locale('ko-KR')}
      onSelectEvent={handleSelectEvent}
      //onSelectSlot={handleSelectSlot}
      date={day}
      messages={{
        today: "오늘",
        previous: "<",
        next: ">",
      }}
      style={{ height: 820 }}
      onNavigate={(date)=>{
        //console.log('#### date=',date)
        onSelectDate(date)
      }}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
    />
  )
}
const onSelectEvent = (event) => {
  //alert(`${selectedDate}, ${event.title}`);
  listenSlotClick();
};

const roomInfo = () =>{
  let d_dt=null;
  try{
    if(selectedslot.length!=0){
      //console.log(selectedslot);
      //console.log(selectedslot.data.roomname);
      return(
        <>
          <span>{selectedslot.data.roomname}</span>
        </>
      )
    }
    else{
      return(
        <>
          <div>　</div>
        </>
      )
    }
  } catch(e){
    console.log(e);
  }
}

const reservationInfo = () =>{
  let d_dt=null;
  try{
    if(selectedslot.length!=0){

      return(
        <div style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
          <p className="h4 font-weight-bold m-2">예약번호 : {selectedslot.data.reservationIdx}</p>
          <p className="h4 font-weight-bold m-2">예약시간 : {selectedslot.start.getFullYear()}년 {selectedslot.start.getMonth()+1}월 {selectedslot.start.getDate()}일 {selectedslot.start.getHours()}:{("0" + selectedslot.start.getMinutes()).toString().slice(-2)}</p>
          <p className="h4 font-weight-bold m-2">이용시간 : {selectedslot.data.useTime}분</p>
          <p className="h4 font-weight-bold m-2">게임 수　: {selectedslot.data.numberOfGame}회</p>
          <p className="h4 font-weight-bold m-2">인원 수　: {selectedslot.data.personCount}명</p>
          <p className="h4 font-weight-bold m-2">홀　 수　: {selectedslot.data.selectedHall}번 홀</p>
          <p className="h4 font-weight-bold m-2">이용요금 : {selectedslot.data.reservationPrice}원</p>
          <p className="h4 font-weight-bold m-2">요청사항 : {selectedslot.data.resquest}</p>
        </div>
      )
    }
    else{
      return(
        <>
        <p className="h4 font-weight-bold m-2">예약번호 : </p>
        <p className="h4 font-weight-bold m-2">예약시간 : </p>
        <p className="h4 font-weight-bold m-2">이용시간 : </p>
        <p className="h4 font-weight-bold m-2">게임 수　: </p>
        <p className="h4 font-weight-bold m-2">인원 수　: </p>
        <p className="h4 font-weight-bold m-2">홀　 수　: </p>
        <p className="h4 font-weight-bold m-2">이용요금 : </p>
        <p className="h4 font-weight-bold m-2">요청사항 : </p>
      </>
      )
    }
  } catch(e){
    console.log(e);
  }
}

const listenSlotClick = (event) => {
};

  return (
    <>
      <Header />
        <Container fluid>
          <Card className="card-stats mb-4 mb-xl-0 col-md-30 col-sm-60 h-100">
            <Row>
              <Col lg="12" xl="8">
                <Card className="mb-0 shadow">
                  <CardBody>
                    {makeChips()}
                  </CardBody>
                </Card>
                <Card className="mb-0 shadow">
                  <CardBody>
                    {makeBigCalendar()}
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Row>
                  <Col lg="12" xl="14">
                    <Card className="mb-1 shadow">
                      <CardHeader className="bg-info">
                        <CardTitle tag="h3" className="mb-0">타석 종류</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <div>
                            <p className="h4 font-weight-bold m-2">{roomInfo()}</p>
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>  
                  <Col lg="12" xl="12">
                    <Card className="mb-1 shadow">
                      <CardBody>
                        <Calendar
                          //작은캘린더
                          events={caldata} 
                          localizer={localizer}
                          defaultView={'month'}
                          views ={['month']}
                          timeslots={4}
                          step={15}
                          defaultDate={new Date()}
                          formats={format}
                          culture={moment.locale('ko-KR')}
                          messages={{
                            today: "오늘",
                            previous: "<",
                            next: ">",
                          }}
                          style={{ height: 320 }}
                          onNavigate={(date)=>{onSelectDate(date)}}
                          onSelectEvent={(smalleventDb)=>{onSelectDate(smalleventDb.start)}}
                        />    
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12" xl="12">
                    <Card className="shadow ">
                      <CardHeader className="bg-info">
                        <CardTitle tag="h3" className="mb-0">예약 상세 내용</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <div>
                            {reservationInfo()}
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Container>
    </>
  );
};

export default Reservation;