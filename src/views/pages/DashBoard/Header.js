import React, {useState, useEffect} from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ( props ) => {
    const sales = ""+props.dayData.todaySales;
    const msales = ""+props.monthData.monthSales;
    //toString 사용시 null일때 오류
  return (
    <>
      <div className="header bg-gradient-info pb-7 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>   
              <Col lg="6" xl="4">
                <Card style={{height:"90%"}} className="card-stats mb-4 mb-xl-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted m-2"
                        >
                            현재 시각
                        </CardTitle>
                        <span className="h2 font-weight-bold m-2">
                            {props.datetimer}
                            </span>
                            <span className="h2 font-weight-normal m-2">
                            {props.clocktimer}
                        </span>
                      </div>
                      </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
              <Card style={{height:"90%"}} className="card-stats mb-4 mb-xl-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted m-2"
                        >
                          오늘의 예약
                        </CardTitle>
                        <span className="h2 font-weight-bold m-2">
                            {props.dayData.reservationCount} 건
                        </span>
                      </div>
                      <Col className="col-auto mt-2 mb-2">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
              <Card style={{height:"90%"}} className="card-stats mb-4 mb-xl-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted m-2"
                        >
                          오늘의 매출
                        </CardTitle>
                        <span className="h2 font-weight-bold m-2">
                        {sales.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                        </span>
                      </div>
                      <Col className="col-auto mt-2 mb-2">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
              <Card style={{height:"90%"}} className="card-stats mb-4 mb-xl-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted m-2"
                        >
                          매장 평점
                        </CardTitle>
                        <span className="h2 font-weight-bold m-2"> 4.5 </span>
                        <span className="h2 font-weight-normal text-muted m-2"> / 5.0 점 </span>
                      </div>
                      <Col className="col-auto mt-2 mb-2">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>   

              <Col lg="6" xl="4">
              <Card style={{height:"90%"}} className="card-stats mb-4 mb-xl-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted m-2"
                        >
                          이번 달의 예약
                        </CardTitle>
                        <span className="h2 font-weight-bold m-2">
                            {props.monthData.reservationCount} 건
                        </span>
                      </div>
                      <Col className="col-auto mt-2 mb-2">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
              <Card style={{height:"90%"}} className="card-stats mb-4 mb-xl-3">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted m-2"
                        >
                          이번 달의 매출
                        </CardTitle>
                        <span className="h2 font-weight-bold m-2">
                        {sales.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
                        </span>
                      </div>
                      <Col className="col-auto mt-2 mb-2">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
             
              
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;