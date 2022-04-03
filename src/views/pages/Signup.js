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
  
  const Signup = () => {
    const history=useHistory();

    const [id, onChangeId, setId] =useInput("");
    const [pw, onChangePw, setPw] =useInput("");
    const [pwc, onChangePwc, setPwc] =useInput("");
    const [nk, onChangeNk, setNk] =useInput("");
    const [nm, onChangeNm, setNm] =useInput("");
    
    const [err0, setErr0] = useState("");
    const [err1, setErr1] = useState("");

    
    const onSignUp = (e) => {
      e.preventDefault();
       
       const data = {
           "email" : id,
           "password" : pw,
           "confirmPassword" : pwc,
           "nickname" : nk,
           "name" : nm,
       };
       try{

       axios.post('/partner/sign_up', data).then(response => {
       console.log(response);
           
       const code = response.data.code;
       if(code==2020){
           setErr0("이메일 형식을 확인해주세요.");
       }
       else if (code==2031){
           setErr0("");
           setErr1("일치하지 않습니다.");
       }
       else if(code==3011){
           setErr0("이미 존재하는 아이디입니다.");
       }
       else{
          history.push("/auth/signin");
          
           setErr0("");
           setErr1("");
       }

       });
   }catch(e){
       console.log(e);
   }
}

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-2">
                <h1>관리자 회원가입</h1>
                <small>매장을 관리하기 위한 회원 가입 페이지입니다.</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="이름" type="text" 
                     value={nm}
                     onChange={onChangeNm}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="닉네임" type="text" 
                     value={nk}
                     onChange={onChangeNk}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="이메일"
                      value={id}
                      onChange={onChangeId}
                      required
                      type="email"
                      autoComplete="new-email"
                    />
                  </InputGroup>
                  <h5>{err0}</h5>
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
                      type="password"
                      value={pw}
                      onChange={onChangePw}
                      required
                      autoComplete="new-password"
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
                      placeholder="비밀번호 확인"
                      type="password"
                      value={pwc}
                      onChange={onChangePwc}
                      required
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <h5>{err1}</h5>
            
                  
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button"
                  onClick={e=>onSignUp(e)}>
                    회원 가입
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };
  
  export default Signup;
  