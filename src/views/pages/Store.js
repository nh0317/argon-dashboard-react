import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {
  Badge,
  Card,Col,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavLink,
  
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,

  Row,Button,
  UncontrolledTooltip,
} from "reactstrap";
import * as S from "./style";


const Store = () => {

  const [data, setData] = useState([]);

  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);
  const [images, setImages]=useState([]);
  const [roomData, setRoomData] =useState([]);
  const [bc, setBc] =useState(0);

  useEffect(()=>{
    const fetchData = async () =>{
        try {
            setError(null);
            setLoading(true);
            const d1 = await axios.get("/partner/myStore");
            setData(d1.data.result);
            const i = await axios.get("/partner/get_storeIdx");
            if(i.data.isSuccess){
              console.log(d1);
              setImages(d1.data.result.storeImage);
              const idx= i.data.result.storeIdx;
            const d2 = await axios.get(`/stores/roomIdx?storeIdx=${idx}`);
            setRoomData(d2.data.result);
            d2.data.result.map(d=>{
            setBc(prev=>prev+d.roomIdx.length);
            });
            }
            else{
              setError(-1);
            }
        } catch (e){
            console.log(e);
        }
        setLoading(false);
    };
    
    fetchData();
},[]);

  return (
    <>
      <Header />
      {/* Page content */}
      <br/> <br/> <br/> <br/> <br/> <br/>
      {error==-1 ?
        <Container className="mt--7" fluid>
          <Card className="card-stats mb-4 mb-xl-3">
            <CardBody>
              <Row>
                <div className="col">
                  <div className="h3 font-weight-bold m-3">
                    아직 매장을 등록하지 않으셨나요?

                  </div>
                  <NavLink to={{ pathname: "/admin/storeedit" }}
                    tag={NavLinkRRD}
                    activeClassName="active"
                  >
                    <Button
                      className="mb-1"
                      color="info">
                      매장 등록하러 가기
                    </Button>
                  </NavLink>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Container>
  :
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

                          <span className="mb-0 text-sm">
                            매장 이름
                          </span>
                    </th>
                    <td> {data.storeName} </td>
                    
                  </tr>
                  <tr>

                <th scope="row">
                  
                      <span className="mb-0 text-sm">
                        매장 대표 사진
                      </span>
                
                </th>
                <td>
                <S.Image>

                   <img src={data.mainStoreImage}/>
                   </S.Image>
             
                 </td></tr>
                 <tr>
<th scope="row">
  
      <span className="mb-0 text-sm">
       추가 사진
      </span>

  </th>
<td>
   <S.Image>
{images.map((d)=><Media>
  <img width="300px" src={d}/>
<br/></Media>
)}
           </S.Image> 
 </td>
                </tr>

                <tr>

<th scope="row">

      <span className="mb-0 text-sm">
       매장 소개
      </span>
  
</th>
<td> {data.storeInfo} </td>

</tr>





   <tr>

                    <th scope="row">
                   
                          <span className="mb-0 text-sm">
                            전화번호
                          </span>
                     
                    </th>
                    <td>{data.storePhoneNumber} </td>
                    
                  </tr>
                     <tr>

                    <th scope="row">
                 
                          <span className="mb-0 text-sm">
                           주소
                          </span>
                   
                    </th>
                    <td> {data.storeLocation} </td>
                    
                  </tr>
                  <tr>

<th scope="row">

      <span className="mb-0 text-sm">
       브랜드
      </span>
  
</th>
<td> {data.storeBrand} </td>

</tr>

<tr>

<th scope="row">

      <span className="mb-0 text-sm">
        운영시간
      </span>
   
</th>
<td> {data.storeTime} </td>

</tr>
<tr>
<th scope="row">
        <span className="mb-0 text-sm">
       방 관리
      </span>
</th>
<td>
                <Card className="mt-2">
              <Table >
                <thead>
                  <th style={{"width":"5%"}}>방 종류</th><th style={{"width":"5%"}}>개수</th><th>방 현황 (idx)</th>
                </thead>
                <tbody>
                  {roomData? roomData.map(d=>
                     <tr>
                     <th>
                    {d.roomType}
                     </th>
                     <td>
                       {d.roomIdx.length}
                     </td>
                     <td>
                       {d.roomIdx.map( (i,index )=>
                       <span>
                       <div style={{"display":"inline-block"}}className="mr-3">
                         {i}번방
                       </div>
                        {(index+1)%10==0?
                        <br/>:null}
                      </span>
                       )}
                     </td>
                   </tr>
                    ):null}
               
                </tbody>
              </Table>
              </Card>

                          </td>

</tr>

<tr>
<th scope="row">
        <span className="mb-0 text-sm">
      총 타석 수
      </span>
</th>
<td> {bc} </td>
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
{data.floorScreenStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>


   <tr >
<th scope="row">
      <span className="ml-3">
      장비 보관 
      </span>
</th>
{data.storageStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      주차 시설
      </span>
</th>
{data.parkingStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
     왼손 전용
      </span>
</th>
{data.lefthandStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      그룹 석 
      </span>
</th>
{data.groupSeatStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      레슨 제공
      </span>
</th>
{data.lessonStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>
   <tr >
<th scope="row">
      <span className="mb-0 text-sm">
      예약 가능 여부 
      </span>
</th>
{data.reserveStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>
                
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        
        
       
        
   <br/>
   <NavLink
             to=
             {{
               pathname:"/admin/storeedit",
               state:{
              data: data}}}

             tag={NavLinkRRD}
             activeClassName="active"
          >  
        <Button 
                color="info"
              >
               정보 수정
              </Button>
              </NavLink>
                  </Container>}
    </>
  );
};

export default Store;
