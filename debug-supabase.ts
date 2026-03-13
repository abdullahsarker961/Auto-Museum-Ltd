import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function test() {
  const result = supabase.storage.from('automuseum').getPublicUrl('test-path.jpg');
  console.log('getPublicUrl result:', JSON.stringify(result, null, 2));
}

test();
