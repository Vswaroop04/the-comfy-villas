const Redis = require('ioredis')

const getredisurl = () => {
  console.log(process.env.REDIS_URL)

  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL
  }

  throw new Error('Redis URL not found')
}

const redis = new Redis(getredisurl())

module.exports = redis