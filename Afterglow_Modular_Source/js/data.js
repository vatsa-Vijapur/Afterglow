
import { supabaseClient } from './supabase.js';

export async function fetchBangers() {
    const { data, error } = await supabaseClient.from('bangers').select('*').order('created_at', { ascending: false });
    return error ? [] : data;
}

export async function fetchComments(memoryId) {
    const { data, error } = await supabaseClient
        .from('comments')
        .select('*')
        .eq('memory_id', memoryId)
        .order('created_at', { ascending: true });
    return error ? [] : data;
}

export async function postComment(memoryId, username, text) {
    const { error } = await supabaseClient.from('comments').insert([
        { memory_id: memoryId, username: username, comment_text: text }
    ]);
    return !error;
}
