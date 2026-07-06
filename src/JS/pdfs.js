        (function() {
            'use strict';
            const PDF_JS_VERSION = '3.11.174';
            pdfjsLib.GlobalWorkerOptions.workerSrc =
                `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.worker.min.js`;

            const PDF_FOLDER = 'pdfs/';
            const PDF_FILES = [
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
                'Sources of Nigerian Law.pdf',
            ];
            
            function generateBookData(fileName, index) {
                const clean = fileName.split('/').pop().replace(/\.pdf$/i, '');
                const words = clean.split(/[-_\s]+/).filter(w => w.length > 0);
                const title = words
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                    .join(' ');

                const authors = [
                   ""
                ];
                const author = authors[index % authors.length];

                const categories = ['sources', 'interpret', 'interpetation', 'reference', 'methodology'];
                const catLabels = {
                    sources: '📕 Sources',
                    interpret: '📊 Reasoning',
                    interpetation: '⚖️ Interpretation',
                    reference: '✍️ Brief Writing',
                    methodology: '📘 Methodology'
                };
                const catIndex = (clean.length + index) % categories.length;
                const catKey = categories[catIndex];
                const categoryLabel = catLabels[catKey] || '📄 Document';

                const pages = Math.floor(Math.random() * 20) + 2;

                const coverColors = {
                    sources: { bg: '#eef4fc', spine: '#3b6ea5' },
                    interpret: { bg: '#f3f0ea', spine: '#8b7a5e' },
                    interpetation: { bg: '#faf0f0', spine: '#b55a6b' },
                    reference: { bg: '#edf3ec', spine: '#4a7c59' },
                    methodology: { bg: '#f0edf5', spine: '#7a6b8a' },
                };
                const colors = coverColors[catKey] || coverColors.reference;

                const icons = {
                    sources: '📕',
                    interpret: '📊',
                    interpetation: '⚖️',
                    reference: '✍️',
                    methodology: '📘'
                };
                const icon = icons[catKey] || '📄';

                return {
                    fileName,
                    displayName: title,
                    author,
                    category: catKey,
                    categoryLabel,
                    pages,
                    icon,
                    coverBg: colors.bg,
                    spineColor: colors.spine,
                    raw: clean.toLowerCase(),
                };
            }

            // ─── STATE ────────────────────────────────────────────
            let books = PDF_FILES.map((f, i) => generateBookData(f, i));
            let filteredBooks = [...books];
            let activeFilter = 'all';
            let searchTerm = '';

            const grid = document.getElementById('bookGrid');
            const totalBooksEl = document.getElementById('totalBooks');
            const visibleCountEl = document.getElementById('visibleCount');
            const searchInput = document.getElementById('searchInput');
            const filterChips = document.querySelectorAll('.filter-chip');

            // ─── CACHE ────────────────────────────────────────────
            const coverCache = new Map(); // fileName -> data URL

            // ─── RENDER COVER (first page) ──────────────────────
            async function renderCover(book, container) {
                const filePath = PDF_FOLDER + book.fileName;
                const canvas = container.querySelector('canvas');
                const placeholder = container.querySelector('.cover-placeholder');
                const fallback = container.querySelector('.cover-fallback');

                // Cache hit?
                if (coverCache.has(book.fileName)) {
                    const dataUrl = coverCache.get(book.fileName);
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        container.classList.add('cover-loaded');
                    };
                    img.onerror = () => showFallback();
                    img.src = dataUrl;
                    return;
                }

                try {
                    const loadingTask = pdfjsLib.getDocument(filePath);
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(1);

                    const viewport = page.getViewport({ scale: 1 });
                    const rect = container.getBoundingClientRect();
                    const cw = rect.width || 200;
                    const ch = rect.height || 260;

                    const scale = Math.min(
                        (cw - 16) / viewport.width,
                        (ch - 24) / viewport.height,
                        1.6
                    );
                    const scaled = page.getViewport({ scale });

                    canvas.width = scaled.width;
                    canvas.height = scaled.height;

                    const ctx = canvas.getContext('2d');
                    await page.render({ canvasContext: ctx, viewport: scaled }).promise;

                    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    coverCache.set(book.fileName, dataUrl);

                    container.classList.add('cover-loaded');

                } catch (err) {
                    console.warn('Cover render failed:', book.fileName, err);
                    showFallback();
                }

                function showFallback() {
                    fallback.classList.add('show');
                    container.classList.add('cover-loaded');
                    // hide placeholder
                    if (placeholder) placeholder.style.display = 'none';
                }
            }

            // ─── RENDER GRID ──────────────────────────────────────
            function render() {
                filteredBooks = books.filter(book => {
                    const matchFilter = activeFilter === 'all' || book.category === activeFilter;
                    const matchSearch = searchTerm === '' ||
                        book.displayName.toLowerCase().includes(searchTerm) ||
                        book.author.toLowerCase().includes(searchTerm) ||
                        book.categoryLabel.toLowerCase().includes(searchTerm) ||
                        book.raw.includes(searchTerm);
                    return matchFilter && matchSearch;
                });

                totalBooksEl.textContent = books.length;
                visibleCountEl.textContent = filteredBooks.length;

                if (filteredBooks.length === 0) {
                    grid.innerHTML = `
                        <div class="empty-state">
                            <span class="big-icon">📭</span>
                            <h3>No books found</h3>
                            <p>Try adjusting your search or filter.</p>
                            <p style="margin-top:4px; font-size:12px; color:#b0a394;">
                                ${books.length} title${books.length !== 1 ? 's' : ''} in library
                            </p>
                        </div>
                    `;
                    return;
                }

                let html = '';
                filteredBooks.forEach((book) => {
                    const spineColor = book.spineColor;
                    const coverBg = book.coverBg;
                    const filePath = PDF_FOLDER + book.fileName;
                    const id = 'cover-' + book.fileName.replace(/[^a-zA-Z0-9]/g, '_');

                    html += `
                        <div class="book-card"
                             style="--spine-color: ${spineColor}; --cover-bg: ${coverBg};"
                             data-filename="${book.fileName}"
                             onclick="window.open('${filePath}', '_blank')"
                             title="Open ${book.displayName}">
                            <div class="book-cover" id="${id}">
                                <canvas></canvas>
                                <div class="cover-placeholder">
                                    <span class="cover-icon">${book.icon}</span>
                                    <span class="cover-label">loading cover…</span>
                                </div>
                                <div class="cover-fallback">
                                    <span class="fallback-icon">${book.icon}</span>
                                    <div class="fallback-title">${book.displayName}</div>
                                    <div class="fallback-author">${book.author}</div>
                                    <div class="fallback-cat">${book.categoryLabel}</div>
                                </div>
                                <span class="book-category-badge">${book.categoryLabel}</span>
                                <div class="book-info-overlay">
                                    <div class="book-title">${book.displayName}</div>
                                    <div class="book-author">${book.author}</div>
                                </div>
                            </div>
                            <div class="book-footer">
                                <span class="meta-tag">${book.categoryLabel}</span>
                                <span class="pages-badge">📄 ${book.pages} pg</span>
                            </div>
                        </div>
                    `;
                });

                grid.innerHTML = html;

                // ─── Render covers ──────────────────────────────
                const coverContainers = grid.querySelectorAll('.book-cover');
                coverContainers.forEach((container, idx) => {
                    const card = container.closest('.book-card');
                    const fileName = card.dataset.filename;
                    const book = books.find(b => b.fileName === fileName);
                    if (book) {
                        setTimeout(() => {
                            renderCover(book, container);
                        }, 80 + idx * 60);
                    }
                });
            }

            // ─── FILTER / SEARCH ──────────────────────────────────
            filterChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    filterChips.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    activeFilter = this.dataset.filter;
                    render();
                });
            });

            let searchTimeout;
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    searchTerm = this.value.trim().toLowerCase();
                    render();
                }, 150);
            });

            // ─── KEYBOARD ──────────────────────────────────────────
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    searchInput.focus();
                }
                if (e.key === 'Escape') {
                    searchInput.blur();
                    searchInput.value = '';
                    searchTerm = '';
                    render();
                }
            });

            // ─── RESIZE ────────────────────────────────────────────
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    render();
                }, 400);
            });

            // ─── INIT ──────────────────────────────────────────────
            render();
            console.log(`📚 Library ready · ${books.length} book(s) from "${PDF_FOLDER}"`);
            console.log('💡 Ctrl+K to search · Escape to clear');
        })();