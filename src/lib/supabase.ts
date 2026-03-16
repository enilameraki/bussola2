import { createClient } from '@supabase/supabase-js'

// Substitua pelos seus dados reais do projeto Supabase
const supabaseUrl = 'https://ajbihqosanlhnxvnnaqr.supabase.co'
const supabaseKey = 'sb_publishable_D4JpcamX9UxnYoZOpNGjXA_cAQVtTao'

export const supabase = createClient(supabaseUrl, supabaseKey)
