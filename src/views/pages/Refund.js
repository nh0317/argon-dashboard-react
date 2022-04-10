import React, {useCallback, useState, useEffect} from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader, CardGroup,Table,Button } from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios"

const Refund = () => {

    const [refunds, setRefunds]=useState([]);
    const [error, setError]=useState();
    const [loading, setLoading]=useState();
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
      );};
      export default Refund;