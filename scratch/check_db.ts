import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkColumn() {
  const { data, error } = await supabase
    .from('content')
    .select('about')
    .eq('id', 'main')
    .maybeSingle()
  
  if (error) {
    console.error('Error checking column:', error.message)
    if (error.message.includes('column "about" does not exist')) {
      console.log('COLUMN_MISSING')
    }
  } else {
    console.log('COLUMN_EXISTS')
    console.log('DATA:', JSON.stringify(data))
  }
}

checkColumn()
