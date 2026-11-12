
import { supabaseClient } from './supabase.js';

const uploadBtn = document.getElementById('upload-btn');
const uploadScreen = document.getElementById('upload-screen');
const closeUpload = document.getElementById('close-upload');
const confirmUpload = document.getElementById('confirm-upload');

if (uploadBtn) uploadBtn.onclick = () => uploadScreen.classList.remove('hide');
if (closeUpload) closeUpload.onclick = () => uploadScreen.classList.add('hide');

if (confirmUpload) {
    confirmUpload.onclick = async () => {
        const files = document.getElementById('upload-file').files;
        if(files.length === 0) return alert('Select a file.');
        
        confirmUpload.textContent = 'Uploading...';
        confirmUpload.disabled = true;

        for (const file of files) {
            // 1. Upload to Cloudinary
            const fd = new FormData();
            fd.append('file', file);
            fd.append('upload_preset', 'afterglow');
            
            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/fcmostal/upload`, { method: 'POST', body: fd });
                const data = await res.json();
                
                // 2. Save to Supabase
                await supabaseClient.from('memories').insert([{
                    src: data.secure_url,
                    v: file.type.startsWith('video'),
                    created_at: document.getElementById('upload-datetime').value || new Date().toISOString(),
                    loc: document.getElementById('upload-location').value
                }]);
            } catch(err) {
                console.error('Upload failed', err);
            }
        }
        
        confirmUpload.textContent = 'Upload';
        confirmUpload.disabled = false;
        uploadScreen.classList.add('hide');
        alert('Upload complete!');
    };
}
