import namor from 'namor'
import React, { useEffect, useState } from 'react';
import axios from "axios";

const newPerson = async (status, props) => {

  let arr
  if (props.time1value == "")
    arr = await axios.get("/calculate-management/calculation").then(res => res.data.result)
  else
  status=="정산 완료"?
    arr = await axios.get(`/calculate-management/calculation-list?startDate=${props.time1value}&endDate=${props.time2value}&calculationStatus=1`).then(res => res.data.result):
    arr = await axios.get(`/calculate-management/calculation-list?startDate=${props.time1value}&endDate=${props.time2value}&calculationStatus=0`).then(res => res.data.result)


  const data = arr.filter(v => v.calculateStatus == status).map(v => ({
    cel0: v.partnerPaymentIdx,
    cel1: v.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cel2: v.fees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cel3: v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cel4: 0,
    cel5: v.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cel6: v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    cel7: v.calculateStatus,
    cel8: v.createdAt,
    cel9: v.calculatedAt,
  }))

  return data
}

export default async function makeData(props, ...lens) {
  const makeDataLevel = async (depth = 0) => {
    const data = await newPerson("정산 미완료", props)
    const data2 = await newPerson("정산 완료", props)
    return [data.map(d => {
      return {
        ...d,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    }),
    data2.map(d => {
      return {
        ...d,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })]

  }

  return await makeDataLevel()
}