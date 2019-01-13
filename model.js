const { db } = require('./db-conn')
const table = 'users'
const columns = ['id', 'title', 'first_name', 'surname', 'date_of_birth']

const getUser = async data => {
  const { userId } = data
  return db(table)
    .select(columns)
    .where('id', userId)
    .map(r => ({
      id: r.id,
      title: r.title,
      firstName: r.first_name,
      surname: r.surname,
      dateOfBirth: r.date_of_birth
    }))
    .then(r => r[0])
}

module.exports = {
  getUser
}
