import {createClient} from '@supabase/supabase-js'
import AcyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase=createClient(supabaseUrl,supabaseAnonKey,{
    auth:{
        storage:AcyncStorage,
        autoRefreshToken:true,
        persistSession:true,
        detectSessionInUrl:false,
    },
});