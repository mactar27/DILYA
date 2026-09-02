import { connect } from '@tidbcloud/serverless'
import 'dotenv/config'

const url = process.env.TIDB_URL || process.env.DATABASE_URL || ''
console.log('Connecting to URL:', url)
const conn = connect({ url })
conn.execute('SELECT 1').then(res => console.log('Result:', res)).catch(e => console.error('Error:', e))
