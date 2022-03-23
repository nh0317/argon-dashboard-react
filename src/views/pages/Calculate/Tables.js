import React, {useState, useMemo} from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTable } from 'react-table'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker, {registerLocale} from '@mui/lab/DatePicker';

export function TableSearch(){
    const [time1value, settime1Value] = React.useState(null);
    const [time2value, settime2Value] = React.useState(null);
    const handleClick = () => {
      console.info('You clicked the Chip.');
    };
  
    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };
    return(
      <table width={"100%"}>
        <thead>
          <tr height={"80px"}>
            <th colSpan={1} >정산 등록일</th>
            <th colSpan={8}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    value={time1value}
                    onChange={(newValue) => {
                      settime1Value(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
  
                <span>부터</span>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    value={time2value}
                    onChange={(newValue) => {
                      settime2Value(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                까지
            </th>
          </tr>
          <tr height={"80px"}>
            <th colSpan={1}>정산 상태</th>
            <th colSpan={8}>
  
            <Stack direction="row" spacing={1}>
              <Chip
                label="전체"
                onClick={handleClick}/>
              <Chip
                label="부분 정산"
                variant="outlined"
                onClick={handleClick}/>
              <Chip
                label="정산 완료"
                variant="outlined"
                onClick={handleClick}/>
              <Chip
                label="정산 취소"
                variant="outlined"
                onClick={handleClick}/>
      </Stack>
  
            </th>
          </tr>     
        </thead>
      </table>
    )
  }
  
export function TableHeader(){
  
    return(
      <table width={"100%"}>
        <thead>
          <tr>
            <th rowSpan={2} colSpan={1}>매출</th>
            <th rowSpan={2} colSpan={1}>수수료</th>
            <th colsPan={2}>할인 쿠폰</th>
            <th rowSpan={2} colSpan={1}>총 산정 금액</th>
            <th rowSpan={2} colSpan={1}>정산 입금액</th>
            <th rowSpan={2} colSpan={1}>정산 상태</th>
            <th rowSpan={2} colSpan={1}>등록 일시</th>
            <th rowSpan={2} colSpan={1}>입금 일시</th>
          </tr>
          <tr>
            <th colSpan={1}>입점사 부담</th>
            <th colSpan={1}>본사 부담</th>
          </tr>     
        </thead>
      </table>
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
    // Render the UI for your table
    return (
      <table width={"100%"}{...getTableProps()}>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  
export function TableCalculateHeader(){
  
    return(
      <table width={"100%"}>
        <thead>
          <tr>
            <th rowSpan={2} colSpan={1}>입금일</th>
            <th rowSpan={2} colSpan={1}>수수료</th>
            <th rowSpan={2} colSpan={1}>수수료</th>
            <th colsPan={2}>할인 쿠폰</th>
            <th rowSpan={2} colSpan={1}>정산 입금액</th>
            <th rowSpan={2} colSpan={1}>정산 상태</th>
            <th rowSpan={2} colSpan={1}>등록 일시</th>
            <th rowSpan={2} colSpan={1}>정산일</th>
            <th rowSpan={2} colSpan={1}>정산하기</th>
          </tr>
          <tr>
            <th colSpan={1}>입점사 부담</th>
            <th colSpan={1}>본사 부담</th>
          </tr>     
        </thead>
      </table>
    )
  }

export function TableCalculate() {
    return (
      // TODO
      // 정산하기 탭 - 정산 정보 받아올 것
      <br></br>
    )
  }