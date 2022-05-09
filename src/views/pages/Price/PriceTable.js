import React, { useState, useEffect } from "react";
import axios from "axios";
import useInput from "hooks/useInput";

import {
    Card,
    CardHeader,
    Input,
    Table,
    Row, Button,
} from "reactstrap";

const PriceTable = (props) => {

    const reload = props.reload;
    const setReload = props.setReload;
    const costHoli = props.costHoli;
    const cost = props.cost;
    const hole = props.hole;

    const [eIdx, setEIdx] = useState(null); //가격 편집 활성화 idx
    const [newEdit, setNewEdit] = useState(false);// 추가 활성화 idx

    //newData edit을 위한 값들 (input)
    const [nm, onChangeNm, setNm] = useInput(); //name
    const [price, onChangePrice, setPrice] = useInput();
    const [startTime, setST] = useState();
    const [endTime, setET] = useState();
    const [startDate, setSD] = useState();
    const [endDate, setED] = useState();
    const [isHoli, setIsHoli] = useState();

    const onPriceEdit = e => {
        setEIdx(e.target.value);

        let d = [];
        if (e.target.name == "false")    // 평일
            d = cost.find(c => c.storePriceIdx == e.target.value);
        else if (e.target.name == "true") //주말 
            d = costHoli.find(c => c.storePriceIdx == e.target.value);
        setNm(d.name);
        setST(d.startTime);
        setET(d.endTime);
        setSD(d.startDate);
        setED(d.endDate);
        setPrice(d.price);
        setIsHoli(d.isHoliday);
    }

    const onPriceEditDone = e => {
        const newData = {
            "name": nm,
            "price": price,
            "startTime": startTime,
            "endTime": endTime,
            "startDate": startDate,
            "endDate": endDate,
            "hole": hole,
            "isHoliday": isHoli
        };
        console.log(newData);
        if (eIdx != null) {
            axios.post(`/price/register_price/${eIdx}`, newData).then(response => {
                if (response.data.code == 2050)
                    alert("영업시간 내의 시간을 입력해주세요.");
                if (response.data.isSuccess==true){
                    setEIdx(null);
                    setReload(reload+1);
                }
            });
        }
        else {
            axios.post(`/price/register_price`, newData).then(response => {
                console.log(response)
                if (response.data.code == 2050)
                    alert("영업시간 내의 시간을 입력해주세요.");
                if (response.data.isSuccess==true){
                    setReload(reload+1);
                    setEIdx(null);
                    setNewEdit(false);
                }});
        }
    }
    const onPriceDel = e => {
        console.log(e.target.value);
        axios.delete(`/price/${e.target.value}`).then(response => {
            console.log(response);
            setEIdx(undefined);
        });
        setReload(reload+1);
    }


    const onNewPrice = e => {
        setNewEdit(true);
        setNm(null);
        setST(null);
        setET(null);
        setSD(null);
        setED(null);
        setPrice(null);
        setIsHoli(false);
        setEIdx(null);
    }

    return (
        <Row>
            <div className="col">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">{props.special!=true?"평일/주말":"특수 기간"} 가격 정보 - {hole}홀</h3>
                    </CardHeader>

                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">
                                    구분</th>
                                <th scope="col">이름 </th>
                                {props.special==true?  <th scope="col">날짜 </th>:null}
                                <th scope="col">시간 </th>
                                <th scope="col">홀수</th>
                                <th scope="col">가격 </th>
                                <th scope="col"> </th>

                            </tr>
                        </thead>
                        <tbody>
                            

                            {cost.length != 0 ?
                                <td rowSpan={cost.length + 1} width="130">
                                    평일
                                </td>
                                : null
                            }
                            {cost.map(c =>
                                c.storePriceIdx != eIdx ?
                                    <tr>
                                        <th width="250">{c.name} </th>
                                        {props.special==true?
                                        <th width="250"> {c.startDate+" ~ "+c.endDate} </th>:null}
                                        <th width="250"> {c.startTime + " ~ " + c.endTime} </th>
                                        <td width="180"> {c.hole}홀 </td>
                                        <th width="250"> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                                        <th>
                                            <Button className="btn btn-primary btn-sm"
                                                color="info"
                                                onClick={e => onPriceEdit(e)}
                                                value={c.storePriceIdx}
                                                name="false"
                                            >
                                                편집
                                            </Button>
                                            <Button
                                                className="btn btn-primary btn-sm"
                                                onClick={e => onPriceDel(e)}
                                                value={c.storePriceIdx}
                                            >
                                                삭제
                                            </Button>
                                        </th>
                                    </tr> :
                                    <tr>
                                        <th width="250">
                                            {c.name}</th>
                                            {props.special==true?
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
                                       </th>    :null
                                    }
                                        <th width="250">

                                            <input
                                                className="btn btn-secondary btn-sm"
                                                type="time"
                                                value={startTime}
                                                onChange={e => setST(e.target.value)}
                                                defaultValue={c.startTime}
                                            />
                                            ~

                                            <input
                                                className="btn btn-secondary btn-sm"
                                                type="time"
                                                value={endTime}
                                                onChange={e => setET(e.target.value)}
                                                defaultValue={c.endTime}
                                            />


                                        </th>
                                        <td width="180">
                                            {hole} 홀
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
                                                onClick={e => onPriceEditDone(e)}
                                                value={c.storePriceIdx}
                                            >
                                                완료
                                            </Button>
                                            <Button
                                                className="btn btn-primary btn-sm"
                                                onClick={e => onPriceDel(e)}
                                                value={c.storePriceIdx}

                                            >
                                                삭제
                                            </Button>
                                        </th>
                                    </tr>


                            )}
                            {costHoli.length != 0 ?
                                <td rowSpan={costHoli.length + 1}>
                                    주말
                                </td> : null}
                            {costHoli.map(c => c.storePriceIdx != eIdx ?
                                <tr>
                                    <th scope="row">{c.name} </th>
                                    {props.special==true?
                                        <th width="250"> {c.startDate+" ~ "+c.endDate} </th>:null}
                                    <th> {c.startTime + " ~ " + c.endTime} </th>
                                    <td> {c.hole}홀 </td>
                                    <th> {c.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</th>
                                    <th>
                                        <Button className="btn btn-primary btn-sm"
                                            color="info"
                                            onClick={e => onPriceEdit(e)}
                                            value={c.storePriceIdx}
                                            name="true"
                                        >
                                            편집
                                        </Button>
                                        <Button className="btn btn-primary btn-sm"
                                            onClick={e => onPriceDel(e)}
                                            value={c.storePriceIdx}
                                        >
                                            삭제
                                        </Button>

                                    </th>
                                </tr>
                                :
                                <tr>
                                    <th width="250">
                                        {c.name}</th>
                                        {props.special==true?
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
                                       </th>    :null
                                    }
                                    <th width="250">

                                        <input
                                            className="btn btn-secondary btn-sm"
                                            type="time"
                                            value={startTime}
                                            onChange={e => setST(e.target.value)}
                                            defaultValue={c.startTime}
                                        />
                                        ~

                                        <input
                                            className="btn btn-secondary btn-sm"
                                            type="time"
                                            value={endTime}
                                            onChange={e => setET(e.target.value)}
                                            defaultValue={c.endTime}
                                        />


                                    </th>
                                    <td width="250">
                                        {hole} 홀
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
                                            onClick={e => onPriceEditDone(e)}
                                            value={c.storePriceIdx}
                                        >
                                            완료
                                        </Button>
                                        <Button
                                            className="btn btn-primary btn-sm"
                                            onClick={e => onPriceDel(e)}
                                            value={c.storePriceIdx}

                                        >
                                            삭제
                                        </Button>
                                    </th>
                                </tr>
                            )}


                            {newEdit == true ?

                                <tr>
                                    <th>
                                        <select class="form-control form-control-alternative mr-0"
                                            onClick={e =>  setIsHoli(e.target.value)}
                                        >
                                            <option value="false">평일</option>
                                            <option value="true">주말</option>

                                        </select>
                                    </th>
                                    <th width="250">
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            onChange={onChangeNm}
                                            value={nm}
                                            placeholder="이름"

                                        />
                                    </th>
                                    {props.special==true?
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
                                       </th>    :null
                                    }
                                    <th width="250">

                                        <input
                                            className="btn btn-secondary btn-sm"
                                            type="time"
                                            value={startTime}
                                            defaultValue="00:00"
                                            onChange={e =>setST(e.target.value)}
                                        />
                                        ~

                                        <input
                                            className="btn btn-secondary btn-sm"
                                            type="time"
                                            value={endTime}
                                            defaultValue="00:00"
                                            onChange={e =>setET(e.target.value)}
                                        />


                                    </th>
                                    <td width="250">
                                        {hole} 홀
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
                                            onClick={e => onPriceEditDone(e)}
                                        >
                                            완료
                                        </Button>
                                        <Button className="btn btn-primary btn-sm"
                                            onClick={e => setNewEdit(false)}
                                        >
                                            취소
                                        </Button>
                                    </th>
                                </tr>
                                : null}
                        </tbody>
                    </Table>
                </Card>


                {newEdit == false ?
                    <Button className="mt-2 mb-4"
                        color="info"
                        onClick={e => onNewPrice(e)}
                        name="default"
                    >
                        {props.special==true?"특수 기간 ":null}{hole}홀 가격 추가
                    </Button> :
                    null}
                <br />
            </div>
        </Row>
    )


}
export default PriceTable;