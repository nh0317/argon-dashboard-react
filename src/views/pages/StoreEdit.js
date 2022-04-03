import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import useInput from "hooks/useInput";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

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
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  NavLink,
  Table,
  Container,
  Row,Button,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

const StoreEdit = ( props ) => {
//console.log(props.location.state.data);

const [data2, setData2] = useState([]);
  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);
  
  const [reload,setReload]=useState(1);

  const [brands, setBrands]=useState([]);
    const [storeImage, setStoreImage]=useState([]);

    
  const [nm, onChangeNm, setNm] = useInput();
  const [inf, onChangeInf, setInf] =useInput();
  const [pn, onChangePn, setPn] =useInput();
  const[bc, onChangeBc, setBc] =useInput();
  const [br, setBr] =useState();
  const [startTime, setST] =useState();
  const [endTime, setET] =useState();

  const [fss, setFss] =useState();
  const [ss, setSs] =useState();
  const [ps, setPs] =useState();
  const [lhs, setLhs] =useState();
  const [gs, setGs] =useState();
  const [ls, setLs] =useState();
  const [rs, setRs] =useState();
  const [cs, setCs] =useState();
  const [lc, onChangeLc, setLc] =useInput();
  //for files
  const [main, setMain]=useState();
  const [images, setImages]=useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
        try {
            setError(null);
            setLoading(true);
            
            const response = await axios.get("/stores/brand");
            setBrands(response.data.result);
            const d = await axios.get("/partner/myStore");
            console.log(d);
            setData2(d.data.result);
            setNm(d.data.result.storeName);
            setInf(d.data.result.storeInfo);
            setPn(d.data.result.storePhoneNumber);
            setBc(d.data.result.batCount);
            setBr(d.data.result.storeBrand);
            const str = d.data.result.storeTime.split(" ");
            if(str[2].split(":")[0]==24){
             str[2]="00:"+str[2].split(":")[1];
            }
            setST(str[0]);
            setET(str[2]);
            setFss(d.data.result.floorScreenStatus);
            setSs(d.data.result.storageStatus);
            setPs(d.data.result.parkingStatus);
            setLhs(d.data.result.lefthandStatus);
            setGs(d.data.result.groupSeatStatus);
            setLs(d.data.result.lessonStatus);
            setRs(d.data.result.reserveStatus);
            setCs(d.data.result.couponStatus);
           setLc(d.data.result.storeLocation);
           setStoreImage(d.data.result.storeImage);
         
        } catch (e){
            setError(e);
        }
        setLoading(false);
    };
    
    fetchData();
},[,reload]);

const onDrop= event =>{
  const value = (event.target.value);
  console.log(value);
  setBr(value);

}

const onTime= event =>{
  const value = (event.target.value);
  console.log(value);
  setST(value);
}

const onETime= event =>{
  const value = (event.target.value);
  console.log(value);
  setET(value);
}

  const onHandleImage=e=>{
    e.preventDefault();
    const formData = new FormData();
    
    //대표
    formData.append(
      "mainStoreImage",
      main
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
   
    try{
      axios.post('/partner/register_image', formData).then(response => {
     // window.location.reload();

    });
    }catch(e){
      console.log(e);
    }
    setReload(reload+1);
    

  }
    const onHandleImages=e=>{
      const formData = new FormData();
    
    //전체
    for(let i=0; i<images.length;i++){
      formData.append(
        "storeImages",
        images[i]);
      }
      
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
   
try{
  axios.post('/partner/register_image', formData).then(response => {
  console.log(response);
  window.location.reload();

      
  });
}catch(e){
  console.log(e);
}


  }

  
  const onDeleteImage=e=>{ 
    /*
      axios.delete(`/partner/image/${e.target.value}`).then(response => {
        console.log(response);  

    })
    */
   // window.location.reload();
    
  }


const onSubmit =event =>{
  
 const newData= {
  "storeName": nm,
  "storeInfo": inf,
  "storePhoneNumber": pn,
  "storeBrand": br,
  "storeLocation": lc,
  "storeImage": [],
  "storeTime": startTime+" ~ "+endTime,
  "batCount": bc,
  "lefthandStatus": lhs,
  "parkingStatus": ps,
  "groupSeatStatus": gs,
  "floorScreenStatus": fss,
  "storageStatus": ss,
  "lessonStatus": ls,
  "reserveStatus": rs,
  "couponStatus": cs
}

console.log(newData);
try{

  axios.post('/partner/register', newData).then(response => {
  console.log(response);
      
  });
}catch(e){
  console.log(e);
}}





  return (
    <>
      <Header />
      {/* Page content */}
      <br/> <br/> <br/> <br/> <br/> <br/>
      <Container className="mt--7" fluid>
        {/* Table */}
       <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">매장 정보</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col"> </th>
                  
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <th scope="row">
                      <Media className="align-items-center">
      
                          <span className="mb-0 text-sm">
                            매장 이름
                          </span>
                      </Media>
                    </th>
                    <td> 
                    <Input
                            className="form-control-alternative"
                            type="text"
                            onChange={onChangeNm}
                            value={nm}
                          />
                       </td>
                    
                  </tr>
                 
         

                <tr>

<th scope="row">
  <Media className="align-items-center">
   
    <Media>
      <span className="mb-0 text-sm">
       매장 소개
      </span>
    </Media>
  </Media>
</th>
<td>
<Input
                        className="form-control-alternative"
                        rows="4"
                        value={inf}
                        onChange={onChangeInf}
                        type="textarea"
                      /> </td>

</tr>





   <tr>

                    <th scope="row">
                      <Media className="align-items-center">
                       
                        <Media>
                          <span className="mb-0 text-sm">
                            전화번호
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                    <Input
                            className="form-control-alternative"
                            type="tel"
                            required
                            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                            maxlength="12"
                            onChange={onChangePn}
                            value={pn}
                          /> </td>
                    
                  </tr>
                     <tr>

                    <th scope="row">
                      <Media className="align-items-center">
                       
                        <Media>
                          <span className="mb-0 text-sm">
                           주소
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td> <Input
                            className="form-control-alternative"
                            type="text"
                            onChange={onChangeLc}
                            value={lc}
                          /> </td>
                    
                  </tr>
                  <tr>

<th scope="row">
  <Media className="align-items-center">
   
    <Media>
      <span className="mb-0 text-sm">
       브랜드
      </span>
    </Media>
  </Media>
</th>
<td>


<UncontrolledDropdown>
                  <DropdownToggle
                    className="btn btn-secondary dropdown-toggle"
                    role="button"
                    type="button"
                    data-toggle="dropdown"
                    
                    >
                    {br? <a>{br}</a>:<a>브랜드 선택</a>}
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu
                  className="dropdown-menu-arrow" right

                  >
                  {brands.map(b=><DropdownItem
 value={b.brandName}
 onClick={e => onDrop(e)}

 >{b.brandName}</DropdownItem>)}
</DropdownMenu>
                </UncontrolledDropdown>

                           </td>

</tr>

<tr>

<th scope="row">
      <span className="mb-0 text-sm">
        운영시간
      </span>

</th>
<td>
<input 
className="btn btn-secondary btn-lg"
type="time"
value={startTime} 
onChange={e=>onTime(e)}
/>
<input 
className="btn btn-secondary btn-lg"
type="time"
value={endTime} 
onChange={e=>onETime(e)}
/>
   </td>

</tr>

<tr>

<th scope="row">
  <Media className="align-items-center">
   
    <Media>
      <span className="mb-0 text-sm">
       타석 수
      </span>
    </Media>
  </Media>
</th>
<td>  <Input
                            className="form-control-alternative"
                            type="number"
                            onChange={onChangeBc}
                            value={bc}
                          /> </td>

</tr>
<tr >

<th scope="row">
   
      <span className="mb-0 text-sm">
       편의 시설
      </span>
</th>
<td> 
   </td>
</tr>

<tr >
<th scope="row">
      <span className="ml-3">
       바닥 스크린
      </span>
</th>
<td>
    <S.ReserveStatusContainer>                     
    <S.RadioButton
          type="radio"
           defaultChecked={fss}
           name="fss"
           onClick={e=>setFss(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           defaultChecked={!fss}
           name="fss"
           onClick={e=>setFss(false)}
                 /><h3>X</h3>         
</S.ReserveStatusContainer>

</td>
   </tr>


   <tr >
<th scope="row">
      <span className="ml-3">
      장비 보관 
      </span>
</th>
  <td>  <S.ReserveStatusContainer>                     
  <S.RadioButton
            type="radio"
            defaultChecked={ss}
            name="ss"
            onClick={e=>setSs(true)}
             />
             <h3>O</h3>
               
             <S.RadioButton
            type="radio"
            defaultChecked={!ss}
            name="ss"
            onClick={e=>setSs(false)}   
                   /><h3>X</h3>         
  </S.ReserveStatusContainer>
  </td>
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      주차 시설
      </span>
</th>
  <td> 
  <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="ps"
           defaultChecked={ps}
           onClick={e=>setPs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="ps"
           defaultChecked={!ps}
           onClick={e=>setPs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer></td> 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
     왼손 전용
      </span>
</th> <td> 
  <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="lhs"
           defaultChecked={lhs}
           onClick={()=>setLhs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="lhs"
           defaultChecked={!lhs}
           onClick={()=>setLhs(false)}     
/><h3>X</h3>         
</S.ReserveStatusContainer></td> 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      그룹 석 
      </span>
</th><td> 
  <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="gs"
           defaultChecked={gs}
           onClick={e=>setGs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="gs"
           defaultChecked={!gs}
           onClick={e=>setGs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer></td></tr>
<tr>
<th scope="row">
      <span className="ml-3">
      레슨 제공
      </span>
</th>
  <td> <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           defaultChecked={ls}
           name="ls"
           onClick={e=>setLs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="ls"
           defaultChecked={!ls}
           onClick={e=>setLs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer> </td>  
   </tr>
   <tr >
<th scope="row">
      <span className="mb-0 text-sm">
      예약 가능 여부 
      </span>
</th>
  <td> 
    <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           defaultChecked={rs}
           name="rs"
           onClick={e=>setRs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
          defaultChecked={!rs}
          name="rs"
           onClick={e=>setRs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer>
</td>  
   </tr>
   <tr >
<th scope="row">
      <span className="mb-0 text-sm">
  쿠폰 여부
      </span>
</th>
  <td> 
    <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="cs"
           defaultChecked={cs}
           onClick={e=>setCs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="cs"
           defaultChecked={!cs}
           onClick={e=>setCs(false)}     
                 />
                 <h3>X</h3>         
</S.ReserveStatusContainer></td>
   </tr>
 


                  
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
         
   <br/>
  
        <Button 
                     onClick={e=>onSubmit(e)}
                color="info"

                >
               정보 수정
              </Button>
        
        <br/>
        <Row>
        <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">매장 사진 관리</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col"> </th>
                  
                  </tr>
                </thead>
                <tbody>
          <tr>
                  <th scope="row">
                  
                  <span className="mb-0 text-sm">
                    매장 대표 사진
                  </span>
            
            </th>
            <td>
            <S.Image>

               <img src={data2.mainStoreImage}/>
               </S.Image>

               <Input type="file" class="form-control"
                onChange={e=>setMain(e.target.files[0])}
                />
        <Button
        onClick={e=>onHandleImage(e)} 
                color="info">
               변경
              </Button>



             </td></tr>
             <tr>
<th scope="row">

  <span className="mb-0 text-sm">
    추가 사진
  </span>

</th>
<td>
<S.Image>
{storeImage.map((d,index)=><Media>
<img width="300px" src={d}/>
<Button
onClick={e=>onDeleteImage(e)}
value={index}
class="form-control sm">
               삭제
              </Button>
<br/></Media>
)}
       </S.Image> 
       <Input type="file" class="form-control"
                multiple
                onChange={e=>setImages(e.target.files)}
                />
        <Button
        onClick={e=>onHandleImages(e)} 
                color="info">
               사진 추가
              </Button>


</td>
            </tr>
            </tbody>
            </Table>
        </Card>
        </div>
        </Row>
       
       
      </Container>
    </>
  );
};

export default StoreEdit;
