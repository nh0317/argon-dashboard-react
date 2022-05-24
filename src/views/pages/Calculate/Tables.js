import React, { useState, useMemo } from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTable } from 'react-table'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker, { registerLocale } from '@mui/lab/DatePicker';
import { Button, Table } from "reactstrap";
import axios from "axios";

export function TableSearch(props) {
  const time1value = props.time1value;
  const settime1Value = props.settime1Value;
  const time2value = props.time2value;
  const settime2Value = props.settime2Value;
  const reload = props.reload;
  const setReload = props.setReload;

  return (
    <Table className="align-items-center table-flush" responsive>
      <tr>
        <th >정산 등록일</th>
        <th>
          <div class="row">
            <div class="col-md-4">
              <input class="form-control"
                type="date"
                value={time1value}
                onChange={e => settime1Value(e.target.value)} />      </div>
            <div class="col-md-4">
              <input class="form-control"
                type="date"
                value={time2value}
                onChange={e => settime2Value(e.target.value)} />      </div>
            <Button
              onClick={e => time1value && time2value ? setReload(reload + 1) : null}
              color="info">검색</Button>
            <Button
              onClick={e => {settime1Value("");settime2Value(""); setReload(reload + 1)}}
              >초기화</Button>
          </div>
        </th>
      </tr>
    </Table>
  )
}

export function TableCal({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  const onSubmit = (e) => {
    axios.post(`/calculate-management/calculation?partnerPaymentIdx=${e.target.value}`)
    .then(res=>{
      console.log(res)
      window.location.reload()});
  }
  return (
    <Table {...getTableProps()}>
      <thead className="thead-light">
        <tr>
          <th rowSpan={2} colSpan={1}>idx</th>
          <th rowSpan={2} colSpan={1}>정산 기간</th>
          <th rowSpan={2} colSpan={1}>매출</th>
          <th rowSpan={2} colSpan={1}>수수료</th>
          <th className="text-center" colsPan={2}>할인 쿠폰</th>
          <th rowSpan={2} colSpan={1}>총 산정 금액</th>
          <th rowSpan={2} colSpan={1}>정산 상태</th>
          <th rowSpan={2} colSpan={1}>등록 일시</th>
          <th rowSpan={2} colSpan={1}>입금 일시</th>
          <th rowSpan={2} colSpan={1}>정산</th>
        </tr>
        <tr>
          <th colSpan={1}>입점사 부담</th>
          <th colSpan={1}>본사 부담</th>
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
              {row.values.cel7 == "정산 미완료" ?
                <td><Button
                  value={row.values.cel0}
                  onClick={e => onSubmit(e)}
                  className="btn-sm"
                  color="info"
                >정산</Button></td> : <td>완료</td>}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}