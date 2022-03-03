import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import useInput from "hooks/useInput";
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

  const [cost, setCost] =useState([]); //주말가격
  const [cost_, setCost_]=useState([]); //평일가격
  const [costPeriod, setCostPeriod] =useState([]); //특정기간주말가격
  const [costPeriod_, setCostPeriod_] =useState([]); //특정기간평일가격

  const [holi, setHoli] =useState([]); //주말요일 list
  const [holiArr, setHoliArr]=useState([]); //주말요일 arr 

  const [week, setWeek] =useState([]); //평일요일 list
  const [weekArr, setWeekArr]=useState([]); //평일요일 arr
  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);

  const[dayEdit, setDayEdit]=useState(false); //요일 설정 활성화
  const[eIdx, setEIdx]=useState(null); //가격 편집 활성화 idx
  const[newEdit, setNewEdit]=useState(false); //가격 추가 활성화 idx
  const[periodNewEdit, setPeriodNewEdit]=useState(false); //기간 가격 추가 활성화 idx


  //newData edit을 위한 값들 (input)
  const[nm, onChangeNm, setNm] =useInput(); //name
  const[bc, onChangeBc, setBc] =useInput(); //hole
  const [price, onChangePrice, setPrice] =useInput();
  const [startTime, setST] =useState();
  const [endTime, setET] =useState();
  const [startDate, setSD] =useState();
  const [endDate, setED] =useState();
  const [isHoli, setIsHoli] =useState();

  useEffect(()=>{
      const fetchData = async () =>{
          try {
              setError(null);
              setLoading(true);

              const i = await axios.get("/partner/get_storeIdx");
              const idx= i.data.result.storeIdx;
              console.log(idx);
              //idx로 불러오는 부분 수정이 필요함 
               const c1 = await axios.get(`/price/${idx}/week_price?isHoliday=true`);
               const c1_ = await axios.get(`/price/${idx}/week_price?isHoliday=false`)
               const c2 = await axios.get(`/price/${idx}/period_price?isHoliday=true`);
               const c2_ = await axios.get(`/price/${idx}/period_price?isHoliday=false`);

              const h = await axios.get("/price/week?isHoliday=true");
              const w = await axios.get("/price/week?isHoliday=false");

              setCost(c1.data.result);
              setCost_(c1_.data.result);

              setCostPeriod(c2.data.result);
              setCostPeriod_(c2_.data.result);

              setHoli(h.data.result);
              setWeek(w.data.result);


          } catch (e){
              console.log(e);
              setError(e);
          }
          setLoading(false);
      };
      fetchData();
  },[,eIdx,dayEdit,newEdit,periodNewEdit]);


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


  const onPriceEdit = e=>{
    //평일
   setEIdx(e.target.value);
   setNewEdit(false);
   setPeriodNewEdit(false);
if(e.target.name=="false"){
  const d = cost_.find(c=>c.storePriceIdx==e.target.value);
  setNm(d.name);
  setST(d.startTime);
   setET(d.endTime);
   setSD(d.startDate);
   setED(d.endDate);
   setPrice(d.price);
   setBc(d.hole);
   setIsHoli(d.isHoliday);
}
else if(e.target.name=="true"){ //주말
  const d = cost.find(c=>c.storePriceIdx==e.target.value);
  setNm(d.name);
  setST(d.startTime);
   setET(d.endTime);
   setSD(d.startDate);
   setED(d.endDate);
   setPrice(d.price);
   setBc(d.hole);
   setIsHoli(d.isHoliday);

}
else if(e.target.name=="false_period"){
  console.log("aa");
  const d = costPeriod_.find(c=>c.storePriceIdx==e.target.value);
  setNm(d.name);
  setST(d.startTime);
   setET(d.endTime);
   setSD(d.startDate);
   setED(d.endDate);
   setPrice(d.price);
   setBc(d.hole);
   setIsHoli(d.isHoliday);

}
else{
  const d = costPeriod.find(c=>c.storePriceIdx==e.target.value);
  setNm(d.name);
  setST(d.startTime);
   setET(d.endTime);
   setSD(d.startDate);
   setED(d.endDate);
   setPrice(d.price);
   setBc(d.hole);
   setIsHoli(d.isHoliday);

}
}

    
const onTime= event =>{
  const value = (event.target.value);
  setST(value);
}

const onETime= event =>{
  const value = (event.target.value);
  setET(value);
}


    const onPriceEditDone = e=>{
      const newData ={
        "name": nm,
        "price":price,
        "startTime":startTime,
        "endTime": endTime,
        "startDate":startDate,
        "endDate":endDate,
        "hole":bc,
        "isHoliday": isHoli
    };
    console.log(newData);
      axios.post(`/price/register_price/${eIdx}`, newData).then(response => {
        console.log(response);  
          
      });
      
    setEIdx(null);

  }
  const onPriceDel=e=>{
    axios.delete(`/price/${e.target.value}`).then(response => {
      console.log(response);  
      setEIdx(undefined);
    });
  }


  const onNewPrice=e=>{
    if(e.target.name=="default"){
        setNewEdit(true);
        setPeriodNewEdit(false);
    }
    else{
      setNewEdit(false);
      setPeriodNewEdit(true);
    }

    setNm(null);
  setST(null);
   setET(null);
   setSD(null);
   setED(null);
   setPrice(null);
   setBc(null);
   setIsHoli(false);
        setEIdx(null);
  }
      
const onHandleSelect=e=>{
  setIsHoli(e.target.value);

}
const onSubmitNew = e=>{
  const newData ={
    "name": nm,
    "price":price,
    "startTime":startTime,
    "endTime": endTime,
    "startDate":startDate,
    "endDate":endDate,
    "hole":bc,
    "isHoliday":isHoli
};
console.log(newData);

  axios.post(`/price/register_price`, newData).then(response => {
   if(response.data.isSuccess)
     setNewEdit(false);
     setPeriodNewEdit(false);

  });
  
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
        {dayEdit==false?
        <Button className="mt-2 mb-4"   
                color="info"
                onClick={e=>onDayChange(e)}
              >
               요일 정보 수정
              </Button>:<Button className="mt-2 mb-4"   
                color="info"
                onClick={e=>onDayChange(e)}
              >
               수정 완료
              </Button>
}

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
                    <th scope="col"> </th>

                  </tr>
                </thead>
                <tbody>
                  {cost_.length!=0?
                    <td  rowSpan={cost_.length+1} width="130">
                            평일
                    </td>
                    :null
                    }
                    {cost_.map(c=>
                        c.storePriceIdx!=eIdx?
                    <tr>
                      <th  width="250">{c.name} </th>
                      <th width="250"> {c.startTime+" ~ "+c.endTime} </th>
                      <td width="180"> {c.hole}홀 </td>
                      <th width="250"> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onPriceEdit(e)}
                value={c.storePriceIdx}
                name="false"
              >
               편집
              </Button>
              <Button 
              className="btn btn-primary btn-sm"   
                onClick={e=>onPriceDel(e)}
                value={c.storePriceIdx}
              >
               삭제
              </Button>
              </th>   
                    </tr>:
                    <tr>
                    <th  width="250">
                   {c.name}</th>
                    <th width="250">
                      
<input 
className="btn btn-secondary btn-sm"
type="time"
value={startTime} 
onChange={e=>onTime(e)}
defaultValue={c.startTime}
/>
~

<input 
className="btn btn-secondary btn-sm"
type="time"
value={endTime} 
onChange={e=>onETime(e)}
defaultValue={c.endTime}
/>
                      
                      
               </th>
                    <td width="180"> 
                    <Input
                            className="form-control-alternative"
                            type="number"
                            onChange={onChangeBc}
                            value={bc}
                            defaultValue={c.hole}
                            placeholder="홀"
                          /> 
                           </td>
                    <th width="250">
                    <Input
                            className="form-control-alternative"
                            type="number"
                            onChange={onChangePrice}
                            value={price}
                            defaultValue={c.price}
                            placeholder="가격"

                          /> 
                     </th>
                    <th> 
      <Button className="btn btn-primary btn-sm"   
              color="info"
              onClick={e=>onPriceEditDone(e)}
              value={c.storePriceIdx}
            >
             완료
            </Button>
            <Button 
            className="btn btn-primary btn-sm"   
              onClick={e=>onPriceDel(e)}
              value={c.storePriceIdx}

            >
             삭제
            </Button>
            </th>   
                  </tr>

                   
                    )}
                    {cost.length!=0?
                  <td  rowSpan={cost.length+1}>
                           주말
                    </td>:null}
                    {cost.map(c=>   c.storePriceIdx!=eIdx?
                    <tr>
                      <th scope="row">{c.name} </th>
                      <th> {c.startTime+" ~ "+c.endTime} </th>
                      <td> {c.hole}홀 </td>
                      <th> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onPriceEdit(e)}
                value={c.storePriceIdx}
                name="true"
              >
               편집
              </Button>
              <Button className="btn btn-primary btn-sm"   
                onClick={e=>onPriceDel(e)}
                value={c.storePriceIdx}

              >
               삭제
              </Button>
              
              </th>    
                    </tr>
                      :
                      <tr>
                      <th  width="250">
                     {c.name}</th>
                      <th width="250">
                        
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={startTime} 
  onChange={e=>onTime(e)}
  defaultValue={c.startTime}
  />
  ~
  
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={endTime} 
  onChange={e=>onETime(e)}
  defaultValue={c.endTime}
  />
                        
                        
                 </th>
                      <td width="250"> 
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangeBc}
                              value={bc}
                              defaultValue={c.hole}
                              placeholder="홀"
                            /> 
                             </td>
                      <th width="250">
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangePrice}
                              value={price}
                              defaultValue={c.price}
                              placeholder="가격"
  
                            /> 
                       </th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onPriceEditDone(e)}
                value={c.storePriceIdx}
              >
               완료
              </Button>
              <Button 
              className="btn btn-primary btn-sm"   
                onClick={e=>onPriceDel(e)}
                value={c.storePriceIdx}

              >
               삭제
              </Button>
              </th>   
                    </tr>
                      )}


{newEdit==true?
       
<tr>
<th>
<select class="form-control form-control-alternative mr-0"
onClick={e=>onHandleSelect(e)}
>
  <option value="false">평일</option>
  <option value="true">주말</option>

</select>
  </th>  
                      <th  width="250">
                      <Input
                              className="form-control-alternative"
                              type="text"
                              onChange={onChangeNm}
                              value={nm}
                              placeholder="이름"
  
                            /> 
                     </th>
                      <th width="250">
                        
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={startTime} 
  onChange={e=>onTime(e)}
  />
  ~
  
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={endTime} 
  onChange={e=>onETime(e)}
  />
                        
                        
                 </th>
                      <td width="250"> 
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangeBc}
                              value={bc}
                              placeholder="홀"
                            /> 
                             </td>
                      <th width="250">
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangePrice}
                              value={price}
                              placeholder="가격"
  
                            /> 
                       </th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onSubmitNew(e)}
              >
               완료
              </Button>
        <Button className="btn btn-primary btn-sm"   
                onClick={e=>setNewEdit(false)}
              >
               취소
              </Button>
              </th>   
                    </tr>
:null}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {newEdit==false?
        <Button className="mt-2 mb-4"   
                color="info"
                onClick={e=>onNewPrice(e)}
                name="default"
              >
               평일/주말 가격 추가
              </Button>:
              null}
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
                    <th scope="col">날짜 </th>
                    <th scope="col">시간 </th>
                    <th scope="col">홀수</th>
                    <th scope="col">가격 </th>
                    <th scope="col"> </th>

                  </tr>
                </thead>
                <tbody>
                {costPeriod_.length!=0?
                 
                    <td  rowSpan={costPeriod_.length+1} width="130">
                            평일
                    </td>:null}
                    {costPeriod_.map(c=>
                        c.storePriceIdx!=eIdx?
                    <tr>
                      <th  width="250">{c.name} </th>
                      <th width="250"> {c.startDate+" ~ "+c.endDate} </th>
                      <th width="250"> {c.startTime+" ~ "+c.endTime} </th>
                      <td width="180"> {c.hole}홀 </td>
                      <th width="250"> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onPriceEdit(e)}
                name="false_period"
                value={c.storePriceIdx}
              >
               편집
              </Button>
              <Button 
              className="btn btn-primary btn-sm"   
                onClick={e=>onPriceDel(e)}
                value={c.storePriceIdx}
              >
               삭제
              </Button>
              </th>   
                    </tr>:
                    <tr>
                    <th  width="250">
                   {c.name}</th>
                   <th width="250">
                      
                      <input 
                      className="btn btn-secondary btn-sm"
                      type="time"
                      value={startTime} 
                      onChange={e=>onTime(e)}
                      defaultValue={c.startTime}
                      />
                      ~
                      
                      <input 
                      className="btn btn-secondary btn-sm"
                      type="time"
                      value={endTime} 
                      onChange={e=>onETime(e)}
                      defaultValue={c.endTime}
                      />
                                            
                                            
                                     </th>

                    <th width="250">
                      
<input 
className="btn btn-secondary btn-sm"
type="time"
value={startTime} 
onChange={e=>onTime(e)}
defaultValue={c.startTime}
/>
~

<input 
className="btn btn-secondary btn-sm"
type="time"
value={endTime} 
onChange={e=>onETime(e)}
defaultValue={c.endTime}
/>
                      
                      
               </th>
                    <td width="180"> 
                    <Input
                            className="form-control-alternative"
                            type="number"
                            onChange={onChangeBc}
                            value={bc}
                            defaultValue={c.hole}
                            placeholder="홀"
                          /> 
                           </td>
                    <th width="250">
                    <Input
                            className="form-control-alternative"
                            type="number"
                            onChange={onChangePrice}
                            value={price}
                            defaultValue={c.price}
                            placeholder="가격"

                          /> 
                     </th>
                    <th> 
      <Button className="btn btn-primary btn-sm"   
              color="info"
              onClick={e=>onPriceEditDone(e)}
              value={c.storePriceIdx}
            >
             완료
            </Button>
            <Button 
            className="btn btn-primary btn-sm"   
              onClick={e=>onPriceDel(e)}
              value={c.storePriceIdx}

            >
             삭제
            </Button>
            </th>   
                  </tr>

                   
                    )}
                  {costPeriod.length!=0?
                  <td  rowSpan={costPeriod.length+1}>
                           주말
                    </td>:null}
                    {costPeriod.map(c=>c.storePriceIdx!=eIdx?
                    <tr>
                      <th scope="row">{c.name} </th>
                      <th width="250"> {c.startDate+" ~ "+c.endDate} </th>
                      <th> {c.startTime+" ~ "+c.endTime} </th>
                      <td> {c.hole}홀 </td>
                      <th> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onPriceEdit(e)}
                name="true_period"
                value={c.storePriceIdx}
              >
               편집
              </Button>
              <Button className="btn btn-primary btn-sm"   
                onClick={e=>onPriceDel(e)}
                value={c.storePriceIdx}

              >
               삭제
              </Button>
              
              </th>    
                    </tr>
                      :
                      <tr>
                      <th  width="250">
                     {c.name}</th>

                     <th width="250">

<input class="form-control-alternative m-2" 
type="date" 
value={startDate}
defaultValue={c.startDate}
 onChange={e=>  setSD(e.target.value) }

/>
~<br/>
<input class="form-control-alternative m-2" 
type="date" 
value={endDate}
defaultValue={c.endDate}
onChange={e=>  setED(e.target.value) }

/>
</th>
                      <th width="250">
                        
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={startTime} 
  onChange={e=>onTime(e)}
  defaultValue={c.startTime}
  />
  ~
  
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={endTime} 
  onChange={e=>onETime(e)}
  defaultValue={c.endTime}
  />
                        
                        
                 </th>
                      <td width="250"> 
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangeBc}
                              value={bc}
                              defaultValue={c.hole}
                              placeholder="홀"
                            /> 
                             </td>
                      <th width="250">
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangePrice}
                              value={price}
                              defaultValue={c.price}
                              placeholder="가격"
  
                            /> 
                       </th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onPriceEditDone(e)}
                value={c.storePriceIdx}
              >
               완료
              </Button>
              <Button 
              className="btn btn-primary btn-sm"   
                onClick={e=>onPriceDel(e)}
                value={c.storePriceIdx}

              >
               삭제
              </Button>
              </th>   
                    </tr>
                      )}


{periodNewEdit==true?
       
<tr>
<th width="170">
<select class="form-control form-control-alternative mr-0"
onClick={e=>onHandleSelect(e)}
>
  <option value="false">평일</option>
  <option value="true">주말</option>

</select>
  </th>  
                      <th  width="300">
                      <Input
                              className="form-control-alternative"
                              type="text"
                              onChange={onChangeNm}
                              value={nm}
                              placeholder="이름"
  
                            /> 
                     </th>
                     <th width="250">

                     <input class="form-control-alternative m-2" 
                     type="date" 
                     value={startDate}
                      onChange={e=>  setSD(e.target.value) }
            
                     />
                     ~<br/>
                     <input class="form-control-alternative m-2" 
                     type="date" 
                     value={endDate}
                     onChange={e=>  setED(e.target.value) }

                     />
</th>
                      <th width="250">
                        
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={startTime} 
  onChange={e=>onTime(e)}
  />
  ~
  
  <input 
  className="btn btn-secondary btn-sm"
  type="time"
  value={endTime} 
  onChange={e=>onETime(e)}
  />
                        
                        
                 </th>
                      <td width="150"> 
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangeBc}
                              value={bc}
                              placeholder="홀"
                            /> 
                             </td>
                      <th width="300">
                      <Input
                              className="form-control-alternative"
                              type="number"
                              onChange={onChangePrice}
                              value={price}
                              placeholder="가격"
  
                            /> 
                       </th>
                      <th> 
        <Button className="btn btn-primary btn-sm"   
                color="info"
                onClick={e=>onSubmitNew(e)}
              >
               완료
              </Button>
        <Button className="btn btn-primary btn-sm"   
                onClick={e=>setPeriodNewEdit(false)}
              >
               취소
              </Button>
              </th>   
                    </tr>
:null}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {periodNewEdit==false?
        <Button className="mt-2 mb-4"   
                color="info"
                onClick={e=>onNewPrice(e)}
                name="period"
              >
               평일/주말 가격 추가
              </Button>:
              null}
        <br/>
        
        
        </Container>
    </>
  );
};

export default Price;

