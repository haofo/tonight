import Datastore from 'nedb'
import path from 'path'

function newdb(remote) {
  const db = {}
  db.store = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/store.db')
  })
  db.record = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/record.db')
  })
  db.prescription = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/prescription.db')
  })
  return db
}
export default newdb
