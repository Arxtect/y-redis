#!/usr/bin/env node

import { createYWebsocketServer } from '../src/ws.js'
import * as env from 'lib0/environment'
import * as number from 'lib0/number'

const port = number.parseInt(env.getConf('port') || '3000')
// postgres://username:password@host:port/database
const postgresUrl = env.getConf('postgres')
const redisPrefix = env.getConf('redis-prefix') || 'y'

let storage
if (postgresUrl) {
  const { createPostgresStorage } = await import('../src/storage/postgres.js')
  storage = await createPostgresStorage()
} else {
  const { createMemoryStorage } = await import('../src/storage/memory.js')
  storage = createMemoryStorage()
}

createYWebsocketServer(port, storage, { redisPrefix })
