
import { fetchBangers } from './data.js';
import { supabaseClient } from './supabase.js';

let bangersList = [];
let bangerIndex = 0;

async function renderBangers() {
    bangersList = await fetchBangers();
    const container = document.getElementById('bangers-container');
    const counter = document.getElementById('qk');
    
    if (!container) return;
    
    if (bangersList.length === 0) {
        container.innerHTML = '<p class="mut">No bangers yet. Admins can add quotes.</p>';
        counter.textContent = '';
        return;
    }

    const b = bangersList[bangerIndex];
    container.innerHTML = `
        <div class="qc" style="transform: scale(1); opacity: 1;">
            <i>“</i>
            <p>${b.banger_text}</p>
            <div class="qby"><b>${b.said_by}</b></div>
        </div>
    `;
    counter.textContent = `${bangerIndex + 1} / ${bangersList.length}`;
}

document.getElementById('qx')?.addEventListener('click', () => {
    if(bangersList.length) { bangerIndex = (bangerIndex + 1) % bangersList.length; renderBangers(); }
});
document.getElementById('qp')?.addEventListener('click', () => {
    if(bangersList.length) { bangerIndex = (bangerIndex - 1 + bangersList.length) % bangersList.length; renderBangers(); }
});

document.addEventListener('DOMContentLoaded', renderBangers);
