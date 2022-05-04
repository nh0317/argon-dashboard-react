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

const CouponTable = (props) => {

    const coupon = props.coupon;

    const reload = props.reload;
    const setReload = props.setReload;

    const [nm, onChangeNm, setNm] = useInput();
    const [bc, onChangeBc, setBc] = useInput();
    const [endDate, setED] = useState();
    const [newCoupon, setNewCoupon] = useState(false);

    const onCouponDel = e => {
        axios.delete(`/partner/coupon/${e.target.value}`).then(response => {
            console.log(response);
        });
        setReload(reload + 1);
    }

    const onSubmitCoupon = e => {
        const newData = {
            "couponName": nm,
            "couponPercentage": bc,
            "couponDeadline": endDate
        };

        axios.post(`/partner/coupon`, newData).then(response => {
            if (response.data.isSuccess)
                setNewCoupon(false);
            setReload(reload + 1);
        });
    }


    return (
        <Row>
            <div className="col">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">쿠폰 관리</h3>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col"> 이름</th>
                                <th scope="col">퍼센트 </th>
                                <th scope="col">다운 가능 기간 </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupon.map(c =>
                                <tr key={c.couponIdx}>
                                    <th>{c.couponName} </th>
                                    <th> {c.couponPercentage}% </th>
                                    <td>  ~ {c.couponDeadline} </td>
                                    <th>
                                        <Button
                                            className="btn btn-primary btn-sm"
                                            value={c.couponIdx}
                                            onClick={e => onCouponDel(e)}
                                        >
                                            삭제
                                        </Button>
                                    </th>
                                </tr>)}
                            {newCoupon == true ?

                                <tr>

                                    <th width="250">
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            onChange={onChangeNm}
                                            value={nm}
                                            placeholder="이름"
                                        />
                                    </th>

                                    <td width="250">
                                        <Input
                                            className="form-control-alternative"
                                            type="number"
                                            onChange={onChangeBc}
                                            value={bc}
                                            placeholder="%"
                                        />
                                    </td>
                                    <th>

                                        ~   <input class="form-control-alternative m-2"
                                            type="date"
                                            value={endDate}
                                            onChange={e => setED(e.target.value)}

                                        />
                                    </th>
                                    <th>
                                        <Button className="btn btn-primary btn-sm"
                                            color="info"
                                            onClick={e => onSubmitCoupon(e)}
                                        >
                                            완료
                                        </Button>
                                        <Button className="btn btn-primary btn-sm"
                                            onClick={e => setNewCoupon(false)}
                                        >
                                            취소
                                        </Button>
                                    </th>
                                </tr>
                                : null}
                        </tbody>
                    </Table>
                </Card>

                {newCoupon == false ?
                    <Button className="mt-2 mb-4"
                        color="info"
                        onClick={e => setNewCoupon(true)}
                        name="coupon"
                    >
                        쿠폰 추가
                    </Button> :
                    null}
            </div>
        </Row>
    )
}
export default CouponTable;