import React, {useCallback, useState, useEffect} from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader, CardGroup,Table,Button } from "reactstrap";
import Header from "components/Headers/Header.js";
import style from "views/pages/DashBoard/style";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import axios from "axios"
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import Firebase from 'firebase';

const newEvents = [];
const dateObj=new Date();

const Reservation = () => {

  const [eventDb, setEventDb] = useState([]);

  const [day, setDay] = useState({dateObj});

  const [refunds, setRefunds]=useState([]);
  const [error, setError]=useState();
  const [loading, setLoading]=useState();

  useEffect(() => {
    //let ref = Firebase.database().ref('/events');
    //let ref;
  //ref.on('value' , snapshot => {
      //snapshot.forEach((childSnap) => {
      //let state = childSnap.val();
      //console.log(state);
          //newEvents.push({title: state.title, id: state.id, resourceId: state.resourceId,start: new Date(state.yearStart,state.monthStart,state.dayStart,state.hourStart,state.minuteStart,state.secondStart),end: new Date(state.yearStart,state.monthStart,state.dayStart,state.hourEnd,state.minuteEnd,state.secondEnd)}); 
          newEvents.push({title: "테스트입니다", id: 3, resourceId: 3,start: new Date('2022-02-15T14:30:00'),end: new Date('2022-02-15T18:30:00')}); 
          //setEventDb(eventDb => [...eventDb,{title: state.title, id: state.id, resourceId: state.resourceId,start: new Date(state.yearStart,state.monthStart,state.dayStart,state.hourStart,state.minuteStart,state.secondStart),end: new Date(state.yearStart,state.monthStart,state.dayStart,state.hourEnd,state.minuteEnd,state.secondEnd)}]);          
          setEventDb(eventDb => [...eventDb,{title: "asdf", id: 3, resourceId: 3,start: new Date('2022-02-15T14:30:00'),end: new Date('2022-02-15T18:30:00')}]);
  //});
  },[]);

console.log(newEvents);
  
  let today = new Date();

  let formats ={
    timeGutterFormat: (date, culture, localizer) => 
          localizer.format(date, 'H:mm', culture),
  }

  const onSelectDate = (date) => {
    const newDate= new Date(date);
    setDay(newDate);
    console.log("day: ",day)
  }

  /*const onSelectEvent = function(pEvent) {
    const r = window.confirm("Weet je zeker dat je de afspraak wilt verwijderen?'")
    if(r === true){
      //const idx = indexOf(pEvent)
      console.log(pEvent);
      var ref = Firebase.database().ref('events');
      ref.orderByChild('id').equalTo(pEvent.id).on('child_added', (snapshot) => {
      snapshot.ref.remove()
      });

      setEventDb(eventDb.filter(item => item.id !== pEvent.id));


    }
  }*/
  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      //backgroundColor: 'lightblue', // 캘린더 내부 색상
    },
  })
  
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment)
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" }
  ];
  const resourceMap = [
    { resourceId: 1, resourceTitle: 'SG 1' },
    { resourceId: 2, resourceTitle: 'SG 2' },
    { resourceId: 3, resourceTitle: 'SG 3' },
    { resourceId: 4, resourceTitle: 'SG 4' },
    { resourceId: 5, resourceTitle: 'SG 5' },
    { resourceId: 6, resourceTitle: 'SG 6' },
    { resourceId: 7, resourceTitle: 'SG 7' },
  ]

  useEffect(()=>{
    const fetchData = async () =>{
        try {
            setError(null);
            setLoading(true);

             const refund = await axios.get("/pay/refund-list");
            setRefunds(refund.data.result);
        } catch (e){
            console.log(e);
            setError(e);
        }
        setLoading(false);
    };
    fetchData();
},[]);

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


  return (
    <>
      <Header />

        <Container fluid>

          <Card className="card-stats mb-4 mb-xl-0 col-md-30 col-sm-60 h-100">

            <Row>

              <Col xl="8">

                <Calendar
                  //popup={false}
                  events={eventDb}
                  localizer={localizer}
                  defaultView={'day'}
                  views ={['day']}
                  timeslots={4}
                  step={15}
                  defaultDate={new Date()}
                  formats={formats}
                  //onSelectEvent = {event => onSelectEvent(event)}
                  min={new Date(today.getFullYear(),today.getMonth(), today.getDate(), 0)}
                  //max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23)}
                  resources={resourceMap}
                  resourceIdAccessor="resourceId"
                  resourceTitleAccessor="resourceTitle"
                  culture={moment.locale('ko-KR')}
                  //onSelectSlot={handleSelect}
                  date={day}
                  messages={{
                    today: "오늘",
                    previous: "<",
                    next: ">",
                  }}
                  onNavigate={console.log("nextprev)")}
                  components={{
                    timeSlotWrapper: ColoredDateCellWrapper,
                  }}
              />

              </Col>

              <Col>

                <Row>
                  
                  <Col lg="10" xl="12">
                    
                    {/* 타석 종류 */}
                    <Card className="card-stats mb-4 mb-xl-10 col-md-30 col-sm-60">
                    
                      <CardBody className="bg-primary">
                    
                        <div className="col">
                      
                          <CardTitle
                            tag="h1"
                            className="text-uppercase mb-0"
                          >
                            타석 종류
                          </CardTitle>
                      
                        </div>
                      
                      </CardBody>
  
                      <CardBody>
  
                        <Row>
  
                          <div>
  
                            <p>타석 종류 표시란</p>
  
                          </div>
  
                        </Row>
  
                      </CardBody>
  
                    </Card>
  
                  </Col>
  
                  <Col>

                    <Calendar
                      //events={eventDb}
                      localizer={localizer}
                      defaultView={'month'}
                      views ={['month']}
                      timeslots={4}
                      step={15}
                      defaultDate={new Date()}
                      formats={formats}
                      //onSelectEvent = {event => onSelectEvent(event)}
                      min={new Date(today.getFullYear(),today.getMonth(), today.getDate(), 0)}
                      max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23)}
                      resources={resourceMap}
                      resourceIdAccessor="resourceId"
                      resourceTitleAccessor="resourceTitle"
                      culture={moment.locale('ko-KR')}
                      messages={{
                        today: "오늘",
                        previous: "<",
                        next: ">",
                      }}
                      style={{ height: 300 }}
                      //selectable={true}
                      onNavigate={(date)=>{
                        //console.log('#### date=',date)
                        onSelectDate(date)
                      }}
                    />
              
                  </Col>
                
                  <Col lg="10" xl="12">
                  
                  {/* 예약 상세 내용 */}
                    <Card className="card-stats mb-4 mb-xl-10 col-md-30 col-sm-60">
                      
                      <CardBody className="bg-primary">
                      
                        <div className="col">
                      
                          <CardTitle
                            tag="h1"
                            className="text-uppercase mb-0"
                          >
                          
                          예약 상세 내용
                          </CardTitle>
                      
                        </div>
                      
                      </CardBody>
                      
                      <CardBody>
                      
                        <Row>
                      
                          <div>
                      
                            <p>예약 상세 내용란</p>
                      
                          </div>
                      
                        </Row>
                      
                      </CardBody>
                  
                    </Card>

                  </Col>
                
                </Row>
              
              </Col>

            </Row>
            
            <CardBody>

            </CardBody>
            
            <CardBody
              style={{height: 300}}>
              asdf
            </CardBody>

          </Card>


<br/>
          <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">취소 요청 중 예약 관리</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> 
                    idx</th>
                    <th scope="col">merchantUid </th>
                    <th scope="col">유저명 </th>
                    <th scope="col">예약 시간</th>
                    <th scope="col">가격 </th>
                    <th scope="col">취소 사유</th>
                    <th scope="col">상태 </th>
                    <th scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                    {refunds.filter(r=>r.refundStatus!=="환불 완료").map(r=>
                    <tr>
                      <th  width="40">{r.reservationIdx} </th>
                      <th width="200"> {r.merchantUid} </th>
                      <td width="100"> {r.userName} </td>
                      <th width="180"> {r.reservationTime} </th>
                      <th width="180"> {r.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </th>
                      <td width="200"> {r.refundReason} </td>
                      <td width="180"> {r.refundStatus} </td>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onRefund(e)}
                name={r.reservationIdx}
                value={r.amount}
              >
               환불 수락
              </Button>
              </th>   
                    </tr>
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
                <h3 className="mb-0">취소 완료된 예약</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> 
                    idx</th>
                    <th scope="col">merchantUid </th>
                    <th scope="col">유저명 </th>
                    <th scope="col">예약 시간</th>
                    <th scope="col">가격 </th>
                    <th scope="col">취소 사유</th>
                    <th scope="col">상태 </th>
                    <th scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                    {refunds.filter(r=>r.refundStatus==="환불 완료").map(r=>
                  
                    <tr>
                      <th  width="40">{r.reservationIdx} </th>
                      <th width="200"> {r.merchantUid} </th>
                      <td width="100"> {r.userName} </td>
                      <th width="180"> {r.reservationTime} </th>
                      <th width="180"> {r.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </th>
                      <td width="200"> {r.refundReason} </td>
                      <td width="180"> {r.refundStatus} </td>
                      <th> 

              </th>   
                    </tr>
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

export default Reservation;