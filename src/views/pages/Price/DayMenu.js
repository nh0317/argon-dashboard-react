import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../style";

import {
    Card, 
    CardHeader,
    Media,
    Table,
    Row, Button,
} from "reactstrap";


const DayMenu = (props) => {

    const holi = props.holi;
    const setHoli = props.setHoli;
    const week = props.week;
    const setWeek = props.setWeek;
    
    const reload = props.reload;
    const setReload = props.setReload;

    const [holiArr, setHoliArr] = useState([]); //주말요일 arr 
    const [weekArr, setWeekArr] = useState([]); //평일요일 arr

    const [dayEdit, setDayEdit] = useState(false); //요일 설정 활성화

    const onDayChange = e => {
        if (dayEdit) {

            const newWeek = [];
            if (weekArr[0]) newWeek.push("월");
            if (weekArr[1]) newWeek.push("화");
            if (weekArr[2]) newWeek.push("수");
            if (weekArr[3]) newWeek.push("목");
            if (weekArr[4]) newWeek.push("금");
            if (weekArr[5]) newWeek.push("토");
            if (weekArr[6]) newWeek.push("일");
            const newData = {
                "weeks": newWeek,
                "isHoliday": false
            }

            const newHoli = [];
            if (holiArr[0]) newHoli.push("월");
            if (holiArr[1]) newHoli.push("화");
            if (holiArr[2]) newHoli.push("수");
            if (holiArr[3]) newHoli.push("목");
            if (holiArr[4]) newHoli.push("금");
            if (holiArr[5]) newHoli.push("토");
            if (holiArr[6]) newHoli.push("일");
            const newData_ = {
                "weeks": newHoli,
                "isHoliday": true
            }

            try {
                axios.post('/price/register_week', newData);
                axios.post('/price/register_week', newData_);
                setReload(reload+1);
            } catch (e) {
                console.log(e);
            };
        }
        setDayEdit(!dayEdit);
        setWeekArr([week.find(w => w === "월") != undefined, week.find(w => w == "화") != undefined, week.find(w => w == "수") != undefined, week.find(w => w == "목") != undefined, week.find(w => w == "금") != undefined, week.find(w => w == "토") != undefined, week.find(w => w == "일") != undefined]);
        setHoliArr([holi.find(w => w === "월") != undefined, holi.find(w => w == "화") != undefined, holi.find(w => w == "수") != undefined, holi.find(w => w == "목") != undefined, holi.find(w => w == "금") != undefined, holi.find(w => w == "토") != undefined, holi.find(w => w == "일") != undefined]);

    }
    const handleSelect = e => {
        e.target.checked ?
            (weekArr[e.target.value] = true) : (weekArr[e.target.value] = false);
    }
    const handleSelectH = e => {
        e.target.checked ?
            (holiArr[e.target.value] = true) : (holiArr[e.target.value] = false);
    }

    return (<Row>
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
                                dayEdit == false ?
                                    week.map(w => <a>{w + " "}</a>)
                                    :
                                    <Media>
                                        <S.CheckBox type="checkbox"
                                            name="월"
                                            value="0"
                                            defaultChecked={weekArr[0]}
                                            onChange={e => handleSelect(e)}
                                        /> 월
                                        <S.CheckBox type="checkbox"
                                            name="화"
                                            value="1"
                                            defaultChecked={weekArr[1]}
                                            onChange={e => handleSelect(e)}
                                        /> 화
                                        <S.CheckBox type="checkbox"
                                            name="수"
                                            value="2"
                                            defaultChecked={weekArr[2]}
                                            onChange={e => handleSelect(e)}
                                        /> 수
                                        <S.CheckBox type="checkbox"
                                            name="목"
                                            value="3"
                                            defaultChecked={weekArr[3]}
                                            onChange={e => handleSelect(e)}
                                        /> 목
                                        <S.CheckBox type="checkbox"
                                            name="금"
                                            value="4"
                                            defaultChecked={weekArr[4]}
                                            onChange={e => handleSelect(e)}
                                        /> 금
                                        <S.CheckBox type="checkbox"
                                            name="토"
                                            value="5"
                                            defaultChecked={weekArr[5]}
                                            onChange={e => handleSelect(e)}
                                        /> 토
                                        <S.CheckBox type="checkbox"
                                            name="일"
                                            value="6"
                                            defaultChecked={weekArr[6]}
                                            onChange={e => handleSelect(e)}
                                        /> 일
                                    </Media>
                            }</td>

                        </tr>              <tr>

                            <th width="100">
                                주말
                            </th>   <td width="250">  {
                                dayEdit == false ?
                                    holi.map(w => <a>{w + " "}</a>)
                                    :
                                    <Media>
                                        <S.CheckBox type="checkbox"
                                            name="월"
                                            value="0"
                                            defaultChecked={holiArr[0]}
                                            onChange={e => handleSelectH(e)}
                                        /> 월
                                        <S.CheckBox type="checkbox"
                                            name="화"
                                            value="1"
                                            defaultChecked={holiArr[1]}
                                            onChange={e => handleSelectH(e)}
                                        /> 화
                                        <S.CheckBox type="checkbox"
                                            name="수"
                                            value="2"
                                            defaultChecked={holiArr[2]}
                                            onChange={e => handleSelectH(e)}
                                        /> 수
                                        <S.CheckBox type="checkbox"
                                            name="목"
                                            value="3"
                                            defaultChecked={holiArr[3]}
                                            onChange={e => handleSelectH(e)}
                                        /> 목
                                        <S.CheckBox type="checkbox"
                                            name="금"
                                            value="4"
                                            defaultChecked={holiArr[4]}
                                            onChange={e => handleSelectH(e)}
                                        /> 금
                                        <S.CheckBox type="checkbox"
                                            name="토"
                                            value="5"
                                            defaultChecked={holiArr[5]}
                                            onChange={e => handleSelectH(e)}
                                        /> 토
                                        <S.CheckBox type="checkbox"
                                            name="일"
                                            value="6"
                                            defaultChecked={holiArr[6]}
                                            onChange={e => handleSelectH(e)}
                                        /> 일
                                    </Media>
                            }</td>


                        </tr>
                    </tbody>
                </Table>
            </Card>

            {dayEdit == false ?
                <Button className="mt-2 mb-4"
                    color="info"
                    onClick={e => onDayChange(e)}
                >
                    요일 정보 수정
                </Button> : <Button className="mt-2 mb-4"
                    color="info"
                    onClick={e => onDayChange(e)}
                >
                    수정 완료
                </Button>
            }
        </div>
    </Row>

    )

}

export default DayMenu;