
import { supabaseClient } from './supabase.js';

export let currentUserRole = 'user';

export async function applyRoleUI() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if(!user) return;

    // Fetch role from profiles table
    const { data } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
    currentUserRole = data ? data.role : 'user';

    const isAdmin = currentUserRole === 'admin' || currentUserRole === 'co-admin';
    
    // Show/hide admin elements
    document.querySelectorAll('.admin-only').forEach(el => {
        el.classList.toggle('hide', !isAdmin);
    });
}

document.addEventListener('DOMContentLoaded', applyRoleUI);
