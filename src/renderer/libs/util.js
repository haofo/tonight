import xlsx from 'node-xlsx'

function isUndef(v) {
  return v === undefined || v === null
}

function parse(dialog) {
  return new Promise((resolve) => {
    dialog.showOpenDialog({ properties: ['openFile'] }, (files) => {
      if (files) {
        const result = xlsx.parse(files[0])
        resolve(result)
      }
    })
  })
}

function compactObj(obj) {
  const option = {}
  const list = Object.keys(obj)
  list.forEach((val) => {
    const value = obj[val]
    if (!isUndef(value) && value !== '') {
      option[val] = value
    }
  })
  return option
}

export { parse, compactObj }
