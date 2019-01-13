const knex = require('knex')
const queries = {}
let count = 0

const knexResponseTimeThresholdMsec = process.env.KNEX_RESPONSE_TIME_THRESHOLD_MSEC || 500
const knexTrackingConnMaxCnt = process.env.KNEX_TRACKING_CONN_MAX_COUNT || 1000
const knexMinPoolCnt = process.env.KNEX_POOL_MIN || 2
const knexMaxPoolCnt = process.env.KNEX_POOL_MAX || 10

const onQuery = query => {
  if (count > knexTrackingConnMaxCnt) count = 0
  const uid = query.__knexQueryUid
  queries[uid] = {
    position: count,
    method: query.method,
    sql: query.sql,
    queriedAt: new Date().getTime()
  }
  count += 1
}

const onQueryResponse = (response, query) => {
  const uid = query.__knexQueryUid
  if (queries[uid]) {
    const diff = new Date().getTime() - queries[uid].queriedAt
    if (diff > knexResponseTimeThresholdMsec) {
      const perfLog = {
        position: queries[uid].position,
        method: queries[uid].method,
        sql: queries[uid].sql,
        diff
      }
      console.log(`RESPONSE_TIME: ${diff} ms > ${knexResponseTimeThresholdMsec}`, perfLog)
    }
    delete queries[uid]
  }
}

const db = knex({
  client: 'mysql',
  connection: {
    timezone: 'UTC',
    host: process.env.SERVICE_MYSQL_ADDRESS,
    user: process.env.SERVICE_MYSQL_USER,
    password: process.env.SERVICE_MYSQL_PASSWORD,
    database: process.env.SERVICE_MYSQL_DATABASE
  },
  pool: {
    min: parseInt(process.env.KNEX_POOL_MIN, 10) || 2,
    max: parseInt(process.env.KNEX_POOL_MAX, 10) || 10
  }
}).on('query', onQuery).on('query-response', onQueryResponse)

module.exports = {
  db
}
