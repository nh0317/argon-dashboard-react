import React, {useState, useMemo} from "react";
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
import DatePicker, {registerLocale} from '@mui/lab/DatePicker';
import ko from 'date-fns/locale/ko'

import makeData from './makeData'

import { TableSearch, TableHeader, TableCalculateHeader, TableCalculate, TableCal } from "./Tables";

const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid gray;
    table-layout: fixed;
    background-color: white;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      vertical-align: middle;
      word-break: break-all;

      :last-child {
      }
    }
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  //const data = React.useMemo(() => , [])

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Calculate = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const columns = React.useMemo(
    () => [
      {
        Header: '매출',
        columns: [
          {
            Header: '',
            accessor: 'cel1',
          },
        ],
      },
      {
        Header: '수수료',
        columns: [
          {
            Header: '수수료',
            accessor: 'cel2',
          },
        ],
      },
      {
        Header: '할인 쿠폰',
        columns: [
          {
            Header: '입점사 부담',
            accessor: 'cel3',
          },
          {
            Header: '본사 부담',
            accessor: 'cel4',
          },
        ],
      },
      {
        Header: '총 산정 금액',
        columns: [
          {
            Header: '',
            accessor: 'cel5',
          },
        ],
      },
      {
        Header: '정산 입금액',
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

  const data = React.useMemo(() => makeData(10), [])

  //const columns = useMemo(() => COLUMNS, [])
  //const data = useMemo(() => makeData(10), [])

  return (
    <>
      <Header />
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="정산 내역 검색" {...a11yProps(0)} />
          <Tab label="정산하기" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>    
        <Styles>
          <TableSearch/>
          <br/>
          <br/>
          <TableHeader/>
          <TableCal columns={columns} data={data} />
        </Styles>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <Styles>
          <TableCalculateHeader/>
          <TableCalculate/>
        </Styles>
      </TabPanel>
    </Box>
    </>
  );
};

export default Calculate;