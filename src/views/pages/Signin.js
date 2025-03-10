import React, {useState,useEffect} from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import axios from "axios"

import useInput from "../../hooks/useInput"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  
  
  const Signin = () => {
    const history = useHistory();
 
    const [id, onChangeId, setId] =useInput("");
    const [pw, onChangePw, setPw] =useInput("");


    const [err0, setErr0] = useState("");


    const onLogin = (e) => {
      e.preventDefault();
      console.log(e);
      
      const data = {
          "id" : id,
          "password" : pw
      };

      try{
        console.log(data)
      axios.post('/partner/login', data).then(res=>{
          if(onLoginSuccess(res))
          history.push("/admin/dashboard");
      })
      .catch(error => {
          setErr0("로그인에 실패했습니다.");
          console.log(error);
      })
  }catch(e){
      console.log(e);
  }}
  const onSilentRefresh = async () => {
      let response = await axios.post('/partner/refresh');
      console.log("refresh now");
      onLoginSuccess(response);
  }
  
  const onLoginSuccess = response => {
    const code = response.data.code;
    if(code==2000 || code==3000 || code==3010){
        setErr0("로그인에 실패했습니다.");
    }
    else if (code==2030){
        setErr0("비밀번호가 틀렸습니다.");
    }
    else
        {
            const  accessToken  = response.data.result.jwt;
            const jwtValidity = response.data.result.jwtValidity;
            
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;    
            setTimeout(onSilentRefresh, jwtValidity * 1000 - 60000);
             // accessToken 만료하기 1분 전에 로그인 연장
             return true;
        }
  }  
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-3">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>관리자 로그인</h1>
                <small>매장 관리를 위한 로그인 페이지입니다.</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form"
              onSubmit={onLogin}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="이메일"
                      type="email"
                      value={id}
                      onChange={onChangeId}
                      required     
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                     placeholder="비밀번호"
                     value={pw}
                    onChange={onChangePw}
                    required
                      type="password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  
                  <h5>
                      {err0}
                  </h5>
                </div>
                <div className="text-center">
                  <Button className="mb-5" color="primary" 
                  type="submit"
                  disabled={!id || !pw}
                  >
                  로그인
                  </Button>
                </div>
                <div className="text-center"
                onClick={e=>history.push("/auth/signup")}
                >
                <h5>처음이세요? 회원가입 페이지로</h5>
                </div>

              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small> .</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  };
  
  export default Signin;
  