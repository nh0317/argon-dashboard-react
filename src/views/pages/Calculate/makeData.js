import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    cel1: namor.generate({ words: 1, numbers: 1 }),
    cel2: namor.generate({ words: 0, numbers: 1 }),
    cel3: namor.generate({ words: 0, numbers: 1 }),
    cel4: namor.generate({ words: 2, numbers: 1 }),
    cel5: namor.generate({ words: 0, numbers: 1 }),
    cel6: namor.generate({ words: 0, numbers: 1 }),
    cel7: namor.generate({ words: 0, numbers: 1 }),
    cel8: namor.generate({ words: 0, numbers: 1 }),
    cel9: namor.generate({ words: 0, numbers: 1 }),
    //firstName: namor.generate({ words: 1, numbers: 0 }),
    //lastName: namor.generate({ words: 1, numbers: 0 }),
    //age: Math.floor(Math.random() * 30),
    //visits: Math.floor(Math.random() * 100),
    //progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
