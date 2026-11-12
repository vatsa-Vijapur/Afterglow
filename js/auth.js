
import { supabaseClient } from './supabase.js';

const isLoginPage = window.location.pathname.includes('login.html');

async function checkSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (!session && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (session && isLoginPage) {
        window.location.href = 'index.html';
    }
}

// Handle Login
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.onclick = async () => {
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value;
        const err = document.getElementById('login-error');
        err.textContent = '';
        
        if(!user || !pass) {
            err.textContent = 'Enter username and password.';
            return;
        }

        // Map username to a hidden email for Supabase Auth
        const mappedEmail = user + '@afterglow.local';
        
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: mappedEmail,
            password: pass
        });

        if (error) {
            err.textContent = 'Invalid credentials. Try again.';
        } else {
            window.location.href = 'index.html';
        }
    };
}

// Handle Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.onclick = async () => {
        await supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    };
}

checkSession();
