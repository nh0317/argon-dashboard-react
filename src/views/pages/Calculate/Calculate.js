import React, { useState, useMemo, useEffect } from "react";
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from "components/Headers/Header.js";
//import DatePicker from "react-datepicker";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTable } from 'react-table'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker, { registerLocale } from '@mui/lab/DatePicker';
import ko from 'date-fns/locale/ko'

import makeData from './makeData'

import {
    TableSearch, TableHeader, TableCalculateHeader, TableCalculate, TableCal,
} from "./Tables";
import {
    Card, Col,
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
    Row, Button
} from "reactstrap";
import axios from "axios";

const Calculate = () => {

    const columns = React.useMemo(
        () => [{
            Header: 'IDX',
            columns: [
                {
                    Header: '',
                    accessor: 'cel0',
                },
            ],
        },
        {
            Header: '정산 기간',
            columns: [
                {
                    Header: '',
                    accessor: 'cel1',
                },
            ],
        },
        {
            Header: '매출',
            columns: [
                {
                    Header: '',
                    accessor: 'cel2',
                },
            ],
        },
        {
            Header: '수수료',
            columns: [
                {
                    Header: '수수료',
                    accessor: 'cel3',
                },
            ],
        },
        {
            Header: '할인 쿠폰',
            columns: [
                {
                    Header: '입점사 부담',
                    accessor: 'cel4',
                },
                {
                    Header: '본사 부담',
                    accessor: 'cel5',
                },
            ],
        },
        {
            Header: '총 산정 금액',
            columns: [
                {
                    Header: '',
                    accessor: 'cel6',
                },
            ],
        },
        {
            Header: '정산 상태',
            columns: [
                {
                    Header: '',
                    accessor: 'cel7',
                },
            ],
        },
        {
            Header: '등록일시',
            columns: [
                {
                    Header: '',
                    accessor: 'cel8',
                },
            ],
        },
        {
            Header: '입금일시',
            columns: [
                {
                    Header: '',
                    accessor: 'cel9',
                },
            ],
        },

        ],
        []
    )

    const [data, setData] = useState([]); //정산
    const [data2, setData2] = useState([]); //미정산

    const [time1value, settime1Value] = React.useState("");
    const [time2value, settime2Value] = React.useState("");
    const [reload, setReload]=useState(0); //reload 값이 변경될 때 time정보o 반영해서 data reload

    useEffect(() => {
        async function fetchData() {
            const props={
                "time1value": time1value,
                "time2value": time2value
            }
            const d = await makeData(props)
            setData(d[0])
            setData2(d[1])
        }
        fetchData()
    }, [,reload]
    )

    return (
        <>
            <Header />
            <Box sx={{ p: 3 }}>
                <Card className="shadow mb-4">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">날짜 검색</h3>
                    </CardHeader>
                    <TableSearch time1value={time1value} settime1Value={settime1Value}
                        time2value={time2value} settime2Value={settime2Value}
                        reload={reload} setReload={setReload}
                    />
                </Card>
                <Card>
                    <CardHeader className="border-0">
                        <h3 className="mb-0">미 정산 내역</h3>
                    </CardHeader>
                    <TableCal columns={columns} data={data} />
                </Card>
                <br />
                <Card>
                    <CardHeader className="border-0">
                        <h3 className="mb-0">정산 내역</h3>
                    </CardHeader>
                    <TableCal columns={columns} data={data2} />
                </Card>

            </Box>
        </>
    );
};

export default Calculate;