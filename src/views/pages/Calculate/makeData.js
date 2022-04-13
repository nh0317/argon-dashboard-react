import namor from 'namor'
import React, { useEffect,useState } from 'react';
import axios from "axios";

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = async () => {
  const statusChance = Math.random()
  const arr = await axios.get("/calculate-management/calculation").then(res=>res.data.result)

  const data = arr.map(v => ({
    cel1: v.sales,
    cel2: v.fees,
    cel3: v.price,
    cel4: v.calculateStatus,
    cel5: v.sales,
    cel6: v.price,
    cel7: v.calculateStatus,
    cel8: v.createdAt,
    cel9: v.calculatedAt,
    status:
        statusChance > 0.66
            ? 'relationship'
            : statusChance > 0.33
            ? 'complicated'
            : 'single',
  }))

  return data
}

export default async function makeData(...lens) {
  const makeDataLevel = async (depth = 0) => {
    //const len = lens[depth]
    const data = await newPerson()
    console.log(data)
    return data.map(d => {
      return {
        ...d,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return await makeDataLevel()
}