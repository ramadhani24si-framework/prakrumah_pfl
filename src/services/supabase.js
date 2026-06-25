import { createClient } from '@supabase/supabase-js'

// ============================================
// GANTI DENGAN CREDENTIAL SUPABASE KAMU!
// ============================================
const SUPABASE_URL = "https://nqcibhygfcefrxxzbwuq.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_l2k6jEMYDZNFWGw6LfHzoA_O-tUZusL"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================
// API untuk CRUD Users
// ============================================
export const usersAPI = {
  // 📌 Ambil semua users
  async fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data
  },

  // 📌 Tambah user baru
  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // 📌 Update user
  async updateUser(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // 📌 Hapus user
  async deleteUser(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // 📌 Login user (cari user berdasarkan email & password)
  async loginUser(email, password) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle()
    
    if (error) throw error
    return data
  },

  // 📌 Register user baru
  async registerUser(email, password, name) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, name, role: 'user' }])
      .select()
    
    if (error) throw error
    return data[0]
  }
}