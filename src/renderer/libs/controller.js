import Vue from 'vue'

// 插入数据
function $insert(db, doc) {
  return new Promise((resolve, reject) => {
    db.insert(doc, (err, newDocs) => {
      if (err) {
        this.$message({
          message: '数据插入失败',
          type: 'error'
        })
        reject(err)
      } else {
        resolve(newDocs)
      }
    })
  })
}

// 删除数据
function $remove(db, doc, isMuti = true) {
  return new Promise((resolve, reject) => {
    if (isMuti) {
      db.remove(doc, { multi: true }, (err, numRemoved) => {
        if (err) {
          this.$message({
            message: '数据删除失败',
            type: 'error'
          })
          reject(err)
        } else {
          resolve(numRemoved)
        }
      })
    } else {
      db.remove(doc, (err, numRemoved) => {
        if (err) {
          this.$message({
            message: '数据删除失败',
            type: 'error'
          })
          reject(err)
        } else {
          resolve(numRemoved)
        }
      })
    }
  })
}

// 修改数据
function $update(db, doc, newdata) {
  return new Promise((resolve, reject) => {
    db.update(doc, newdata, (err, numReplaced) => {
      if (err) {
        this.$message({
          message: '数据修改失败',
          type: 'error'
        })
        reject(err)
      } else {
        resolve(numReplaced)
      }
    })
  })
}

// 查询数据
function $find(db, condition, option) {
  return new Promise((resolve, reject) => {
    db.find(condition).sort(option).exec((err, docs) => {
      if (err) {
        this.$message({
          message: '数据查询失败',
          type: 'error'
        })
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}

// 查询并排序
function $paging(db, option, sortOption, currentPage = 0) {
  return new Promise((resolve, reject) => {
    const skip = currentPage > 0 ? (currentPage - 1) * 10 : 0
    db.find(option).sort(sortOption).skip(skip).limit(10)
      .exec((err, docs) => {
        if (err) {
          this.$message({
            message: '数据查询失败',
            type: 'error'
          })
          reject(err)
        } else {
          resolve(docs)
        }
      })
  })
}

// 查询一个
function $findOne(db, condition) {
  return new Promise((resolve, reject) => {
    db.find(condition).exec((err, docs) => {
      if (err) {
        this.$message({
          message: '数据查询失败',
          type: 'error'
        })
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })
}

Vue.mixin({
  methods: {
    $insert,
    $remove,
    $update,
    $find,
    $paging,
    $findOne
  }
})
