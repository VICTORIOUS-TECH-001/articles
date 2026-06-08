  const firebaseConfig = {
        apiKey: "AIzaSyDqKzvN8ELCgAIxLgsQLe0fYD8hhWFt8oo",
        authDomain: "legalarticles-d3697.firebaseapp.com",
        projectId: "legalarticles-d3697",
        storageBucket: "legalarticles-d3697.firebasestorage.app",
        messagingSenderId: "846980162136",
        appId: "1:846980162136:web:4c4878150cfaaa835ce02d"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    async function getPlainText(docId) {
        const docSnap = await db.collection('passwords').doc(docId).get();
        return docSnap.exists ? docSnap.data().plainText : null;
    }
    async function setPlainText(docId, text) {
        await db.collection('passwords').doc(docId).set({ plainText: text }, { merge: true });
    }
    async function verifyAdminPassword(pwd) {
        const stored = await getPlainText('admin_password');
        return { success: pwd === stored };
    }
    async function verifyDownloadPassword(pwd) {
        const stored = await getPlainText('download_password');
        return { success: pwd === stored };
    }
    async function updateAdminPassword(current, newPw) {
        const currentPlain = await getPlainText('admin_password');
        if (current !== currentPlain) return { success: false, message: 'Current password incorrect' };
        if (newPw.length < 4) return { success: false, message: 'Minimum 4 characters' };
        await setPlainText('admin_password', newPw);
        return { success: true, message: 'Admin password updated!' };
    }
    async function updateDownloadPassword(current, newPw) {
        const currentPlain = await getPlainText('download_password');
        if (current !== currentPlain) return { success: false, message: 'Current key incorrect' };
        if (newPw.length < 4) return { success: false, message: 'Minimum 4 characters' };
        await setPlainText('download_password', newPw);
        return { success: true, message: 'Download key updated!' };
    }
    async function resetPasswordsToDefault() {
        await setPlainText('admin_password', '042AAA');
        await setPlainText('download_password', 'Download@2025');
        showToast('✅ Passwords reset to defaults');
        setTimeout(() => location.reload(), 1500);
    }
    async function initPasswords() {
        const adminRef = db.collection('passwords').doc('admin_password');
        const downloadRef = db.collection('passwords').doc('download_password');
        const [adminDoc, downloadDoc] = await Promise.all([adminRef.get(), downloadRef.get()]);
        if (!adminDoc.exists) await adminRef.set({ plainText: '042AAA' });
        if (!downloadDoc.exists) await downloadRef.set({ plainText: 'Download@2025' });
    }
    initPasswords();

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    window.addEventListener('load', function() {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.add('fade-out');
                setTimeout(() => { preloader.style.display = 'none'; }, 600);
            }
        }, 1000);
    });
     let articlesArray = [];
    let pdfDoc = null, currentPage = 1, currentScale = 1.3;
    let pendingDownloadId = null;
    let selectedFileBase64 = null;
    let userSavedArticles = JSON.parse(localStorage.getItem('vt_user_saved_articles') || '[]');

    function saveUserArticlesToLocal() { localStorage.setItem('vt_user_saved_articles', JSON.stringify(userSavedArticles)); }
    function showToast(msg, isError = false) {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'border-l-rose-500 bg-rose-900/80' : 'border-l-amber-500 bg-slate-800/90'}`;
        toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>${msg}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    function escapeHtml(str) { return str?.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m])) || ''; }

    async function loadArticles() {
        try {
            const snapshot = await db.collection('articles').orderBy('createdAt', 'desc').get();
            articlesArray = [];
            snapshot.forEach(doc => articlesArray.push({ id: doc.id, ...doc.data() }));
            if (articlesArray.length === 0) {
                const dummyUrl = "";
                const sample = await db.collection('articles').add({
                    title: "Foundations of Legal Research",
                    content: "Introduction to legal frameworks.",
                    area: "Legal Theory", keywords: "research",
                    pdfUrl: dummyUrl, isExternal: true, createdAt: new Date().toISOString()
                });
                articlesArray.push({ id: sample.id, title: "Foundations of Legal Research", content: "Introduction to legal frameworks.", area: "Legal Theory", keywords: "research", pdfUrl: dummyUrl, isExternal: true, createdAt: new Date().toISOString() });
            }
            renderLibrary();
            renderDashboard();
            const adminPanel = document.getElementById('adminContentArea');
            if (adminPanel && !adminPanel.classList.contains('hidden')) renderAdminList();
        } catch(e) { showToast("Error: " + e.message, true); }
    }

    async function createArticle(title, content, area, keywords, pdfBase64) {
        try {
            const articleData = { title, content, area: area || 'General', keywords: keywords || '', pdfData: pdfBase64, isExternal: false, createdAt: new Date().toISOString() };
            const docRef = await db.collection('articles').add(articleData);
            articlesArray.unshift({ id: docRef.id, ...articleData });
            renderLibrary(); renderAdminList();
            showToast(`✅ "${title}" published!`);
            return true;
        } catch(e) { showToast("Upload failed: " + e.message, true); return false; }
    }

    async function deleteArticle(articleId) {
        try {
            await db.collection('articles').doc(articleId).delete();
            articlesArray = articlesArray.filter(a => a.id !== articleId);
            userSavedArticles = userSavedArticles.filter(s => s.id !== articleId);
            saveUserArticlesToLocal();
            renderLibrary(); renderDashboard(); renderAdminList();
            showToast("🗑️ Article deleted");
        } catch(err) { showToast("Delete failed", true); }
    }

    async function updateArticle(articleId, updates) {
        await db.collection('articles').doc(articleId).update(updates);
        const idx = articlesArray.findIndex(a => a.id === articleId);
        if (idx !== -1) articlesArray[idx] = { ...articlesArray[idx], ...updates };
        renderLibrary(); renderAdminList(); showToast("Article updated");
    }

    function getPdfUrl(article) { return article.isExternal ? article.pdfUrl : (article.pdfData || null); }

    function renderLibrary() {
        const term = document.getElementById('searchInput')?.value.toLowerCase() || "";
        let filtered = articlesArray.filter(a => (a.title || '').toLowerCase().includes(term) || (a.area || '').toLowerCase().includes(term));
        const grid = document.getElementById('articlesGrid');
        if (!grid) return;
        if (filtered.length === 0) grid.innerHTML = '<div class="col-span-3 text-center py-16 text-slate-500">No matching articles.</div>';
        else {
            grid.innerHTML = filtered.map(a => `
                <div class="glass-card p-5"><div class="flex justify-between items-start"><h3 class="font-bold text-xl text-white">${escapeHtml(a.title)}</h3><i class="fas fa-file-pdf text-indigo-400 text-2xl"></i></div>
                <p class="text-slate-300 text-sm mt-2">${escapeHtml((a.content || '').substring(0,100))}...</p>
                <div class="flex gap-2 mt-3"><span class="text-xs bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full">${escapeHtml(a.area || 'General')}</span></div>
                <div class="mt-4 flex justify-between items-center"><span class="text-xs text-slate-500">${new Date(a.createdAt).toLocaleDateString()}</span>
                <div class="flex gap-2"><button class="read-btn bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-full" data-url="${escapeHtml(getPdfUrl(a))}" data-title="${escapeHtml(a.title)}"><i class="fas fa-eye mr-1"></i> Read</button>
                <button class="save-to-dashboard-btn bg-amber-600 hover:bg-amber-700 text-white text-sm px-3 py-1.5 rounded-full" data-id="${a.id}"><i class="fas fa-bookmark mr-1"></i> Save</button></div></div></div>`).join('');
        }
        document.querySelectorAll('.read-btn').forEach(btn => btn.addEventListener('click', () => openPdfViewer(btn.dataset.url, btn.dataset.title)));
        document.querySelectorAll('.save-to-dashboard-btn').forEach(btn => btn.addEventListener('click', () => { pendingDownloadId = btn.dataset.id; document.getElementById('downloadModal').classList.remove('hidden'); }));
    }

    function renderDashboard() {
        const savedGrid = document.getElementById('savedGrid'); const emptyMsg = document.getElementById('emptyDashboardMsg');
        if (!savedGrid) return;
        if (userSavedArticles.length === 0) { savedGrid.innerHTML = ''; if(emptyMsg) emptyMsg.classList.remove('hidden'); return; }
        if(emptyMsg) emptyMsg.classList.add('hidden');
        savedGrid.innerHTML = userSavedArticles.map(save => {
            const full = articlesArray.find(a => a.id === save.id);
            const title = full ? full.title : save.title;
            const area = full ? (full.area || 'General') : (save.area || 'Legal');
            const pdfData = save.pdfData || (full ? getPdfUrl(full) : null);
            return `<div class="glass-card p-5 saved-card"><div class="flex justify-between items-start"><h3 class="font-bold text-xl text-white">${escapeHtml(title)}</h3><i class="fas fa-check-circle text-emerald-400 text-xl"></i></div>
            <p class="text-slate-300 text-sm mt-2">Saved to your personal library</p><div class="flex gap-2 mt-3"><span class="text-xs bg-emerald-900/40 text-emerald-300 px-3 py-1 rounded-full">${escapeHtml(area)}</span></div>
            <div class="mt-4 flex justify-between items-center"><span class="text-xs text-slate-500">${new Date(save.savedAt).toLocaleDateString()}</span>
            <div class="flex gap-2"><button class="read-saved-btn bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-full" data-url="${escapeHtml(pdfData)}" data-title="${escapeHtml(title)}"><i class="fas fa-eye mr-1"></i> Read</button>
            <button class="remove-saved-btn bg-rose-600 hover:bg-rose-700 text-white text-sm px-3 py-1.5 rounded-full" data-id="${save.id}"><i class="fas fa-trash-alt mr-1"></i> Remove</button></div></div></div>`;
        }).join('');
        document.querySelectorAll('.read-saved-btn').forEach(btn => btn.addEventListener('click', () => openPdfViewer(btn.dataset.url, btn.dataset.title)));
        document.querySelectorAll('.remove-saved-btn').forEach(btn => btn.addEventListener('click', () => { const id = btn.dataset.id; userSavedArticles = userSavedArticles.filter(s => s.id !== id); saveUserArticlesToLocal(); renderDashboard(); showToast("Removed from dashboard"); }));
    }

    function saveToUserDashboard(articleId) {
        const article = articlesArray.find(a => a.id === articleId);
        if (!article) { showToast("Article not found", true); return false; }
        if (userSavedArticles.some(s => s.id === articleId)) { showToast("Already in your dashboard", true); return false; }
        userSavedArticles.push({ id: article.id, title: article.title, area: article.area, pdfData: getPdfUrl(article), savedAt: new Date().toISOString() });
        saveUserArticlesToLocal(); renderDashboard(); showToast(`📘 "${article.title}" saved to your dashboard!`);
        return true;
    }

    async function openPdfViewer(url, title) { document.getElementById('pdfTitle').innerHTML = escapeHtml(title); document.getElementById('pdfModal').classList.remove('hidden'); try { const loadingTask = pdfjsLib.getDocument(url); pdfDoc = await loadingTask.promise; currentPage = 1; currentScale = 1.3; await renderPage(); } catch(e) { showToast("Error loading PDF", true); } }
    async function renderPage() { if(pdfDoc){ const page=await pdfDoc.getPage(currentPage); const viewport=page.getViewport({scale:currentScale}); const canvas=document.getElementById('pdfCanvas'); canvas.height=viewport.height; canvas.width=viewport.width; await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise; document.getElementById('pageInfo').innerHTML=`Page ${currentPage} / ${pdfDoc.numPages}`; } }
    function renderAdminList() { const container=document.getElementById('adminArticlesList'); if(!container) return; if(articlesArray.length===0){ container.innerHTML='<div class="text-center text-slate-400 py-5">No articles</div>'; return; } container.innerHTML=articlesArray.map(a=>`<div class="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex justify-between items-center"><div><span class="font-semibold text-white">${escapeHtml(a.title)}</span><span class="text-xs ml-2 bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded-full">${escapeHtml(a.area)}</span></div><div><button class="edit-admin-btn bg-indigo-800 text-indigo-200 px-3 py-1 rounded-lg text-sm" data-id="${a.id}">Edit</button><button class="delete-admin-btn bg-rose-800 text-rose-200 px-3 py-1 rounded-lg text-sm ml-1" data-id="${a.id}">Delete</button></div></div>`).join('');
        document.querySelectorAll('.edit-admin-btn').forEach(btn=>btn.addEventListener('click',async()=>{ const id=btn.dataset.id; const art=articlesArray.find(a=>a.id===id); if(art){ const newTitle=prompt('Title:',art.title); if(newTitle) await updateArticle(id,{title:newTitle,content:prompt('Desc:',art.content)||art.content,area:prompt('Area:',art.area)||art.area});}}));
        document.querySelectorAll('.delete-admin-btn').forEach(btn=>btn.addEventListener('click',async()=>{ if(confirm('Delete?')) await deleteArticle(btn.dataset.id); }));
    }
    const dropZone=document.getElementById('dropZone'), fileInput=document.getElementById('pdfFile'), uploadStatus=document.getElementById('uploadStatus');
    if(dropZone){ dropZone.addEventListener('click',()=>fileInput.click()); dropZone.addEventListener('dragover',e=>{ e.preventDefault(); dropZone.classList.add('drag-over'); }); dropZone.addEventListener('dragleave',()=>dropZone.classList.remove('drag-over')); dropZone.addEventListener('drop',e=>{ e.preventDefault(); dropZone.classList.remove('drag-over'); const file=e.dataTransfer.files[0]; if(file&&file.type==='application/pdf'){ const reader=new FileReader(); reader.onload=ev=>{ selectedFileBase64=ev.target.result; uploadStatus.innerHTML=`<span class="text-green-400">✅ ${file.name} ready</span>`; }; reader.readAsDataURL(file); }else{ uploadStatus.innerHTML='<span class="text-rose-400">❌ PDF required</span>'; } }); fileInput.addEventListener('change',e=>{ if(e.target.files[0]){ const reader=new FileReader(); reader.onload=ev=>{ selectedFileBase64=ev.target.result; uploadStatus.innerHTML=`<span class="text-green-400">✅ ${e.target.files[0].name} loaded</span>`; }; reader.readAsDataURL(e.target.files[0]); } }); }
    document.getElementById('uploadArticleBtn')?.addEventListener('click',async()=>{ const title=document.getElementById('newTitle').value.trim(); const content=document.getElementById('newContent').value.trim(); if(!title||!content) return showToast('Title and description required',true); if(!selectedFileBase64) return showToast('Select a PDF',true); if(selectedFileBase64.length>1.2e6) return showToast('PDF exceeds 1MB',true); await createArticle(title,content,document.getElementById('newArea').value,document.getElementById('newKeywords').value,selectedFileBase64); document.getElementById('newTitle').value=''; document.getElementById('newContent').value=''; document.getElementById('newArea').value=''; document.getElementById('newKeywords').value=''; selectedFileBase64=null; fileInput.value=''; uploadStatus.innerHTML=''; });
    document.getElementById('prevPageBtn')?.addEventListener('click',async()=>{ if(pdfDoc&&currentPage>1){ currentPage--; await renderPage(); } });
    document.getElementById('nextPageBtn')?.addEventListener('click',async()=>{ if(pdfDoc&&currentPage<pdfDoc.numPages){ currentPage++; await renderPage(); } });
    document.getElementById('zoomInBtn')?.addEventListener('click',async()=>{ currentScale+=0.2; await renderPage(); });
    document.getElementById('zoomOutBtn')?.addEventListener('click',async()=>{ if(currentScale>0.5){ currentScale-=0.2; await renderPage(); } });
    document.getElementById('closePdfBtn')?.addEventListener('click',()=>document.getElementById('pdfModal').classList.add('hidden'));
    document.getElementById('confirmDownloadBtn')?.addEventListener('click',async()=>{ const key=document.getElementById('downloadKeyInput').value; const res=await verifyDownloadPassword(key); if(res.success){ if(pendingDownloadId){ saveToUserDashboard(pendingDownloadId); document.getElementById('downloadModal').classList.add('hidden'); document.getElementById('downloadKeyInput').value=''; document.getElementById('downloadError').classList.add('hidden'); } }else{ document.getElementById('downloadError').innerText='Invalid download key'; document.getElementById('downloadError').classList.remove('hidden'); } });
    document.getElementById('closeDownloadModalBtn')?.addEventListener('click',()=>{ document.getElementById('downloadModal').classList.add('hidden'); document.getElementById('downloadError').classList.add('hidden'); });
    const libraryView=document.getElementById('libraryView'),dashboardView=document.getElementById('dashboardView'),navLibrary=document.getElementById('navLibraryBtn'),navDashboard=document.getElementById('navDashboardBtn');
    function showLibrary(){ libraryView.classList.remove('hidden'); dashboardView.classList.add('hidden'); navLibrary.classList.add('active'); navDashboard.classList.remove('active'); }
    function showDashboard(){ libraryView.classList.add('hidden'); dashboardView.classList.remove('hidden'); navDashboard.classList.add('active'); navLibrary.classList.remove('active'); renderDashboard(); }
    navLibrary?.addEventListener('click',showLibrary); navDashboard?.addEventListener('click',showDashboard);
    document.getElementById('searchInput')?.addEventListener('input',()=>renderLibrary());
    const adminModal=document.getElementById('adminModal'); document.getElementById('navAdminBtn')?.addEventListener('click',()=>adminModal.classList.remove('hidden')); document.getElementById('closeAdminBtn')?.addEventListener('click',()=>adminModal.classList.add('hidden'));
    document.getElementById('loginAdminBtn')?.addEventListener('click',async()=>{ const pwd=document.getElementById('adminPassword').value; const res=await verifyAdminPassword(pwd); if(res.success){ document.getElementById('adminLoginArea').classList.add('hidden'); document.getElementById('adminContentArea').classList.remove('hidden'); renderAdminList(); showToast('Admin access granted'); }else{ document.getElementById('loginError').innerText='Invalid password'; document.getElementById('loginError').classList.remove('hidden'); } });
    document.getElementById('resetPasswordsBtn')?.addEventListener('click',resetPasswordsToDefault);
    document.getElementById('updateAdminPassBtn')?.addEventListener('click',async()=>{ const old=document.getElementById('oldAdminPass').value,np=document.getElementById('newAdminPass').value,cf=document.getElementById('confirmAdminPass').value; if(np!==cf){ document.getElementById('adminPassMsg').innerHTML='<span class="text-rose-400">Mismatch</span>'; return; } const res=await updateAdminPassword(old,np); document.getElementById('adminPassMsg').innerHTML=`<span class="${res.success?'text-green-400':'text-rose-400'}">${res.message}</span>`; });
    document.getElementById('updateDownloadPassBtn')?.addEventListener('click',async()=>{ const old=document.getElementById('oldDownloadPass').value,np=document.getElementById('newDownloadPass').value,cf=document.getElementById('confirmDownloadPass').value; if(np!==cf){ document.getElementById('downloadPassMsg').innerHTML='<span class="text-rose-400">Mismatch</span>'; return; } const res=await updateDownloadPassword(old,np); document.getElementById('downloadPassMsg').innerHTML=`<span class="${res.success?'text-green-400':'text-rose-400'}">${res.message}</span>`; });
    loadArticles();