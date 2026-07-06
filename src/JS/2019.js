 (function() {
            'use strict';
             const CORRECTIONS = {
                1: "✔ MODEL OPINION (Q1)\n\n(a) The Court of Appeal was wrong. A lower court must consider binding Supreme Court decisions; failure to do so is a grave error.\n\n(b) The Court of Appeal was incorrect: Rules of Court are binding and must be applied.\n\n(c) The Court of Appeal erred: the Supreme Court decision in Obi v Amaka is binding; it cannot be dismissed as per incuriam unless clearly shown.\n\n(d) The term 'overruling' is reserved for higher courts. The Court of Appeal should have used 'departing' or 'distinguishing'.",
                2: "✔ MODEL ANSWER (Q2)\n\nThe repugnancy test invalidates customary laws that are contrary to natural justice, equity, and good conscience. In Eshugbayi v Officer Administering Nigeria (1931), the Privy Council held that a native law must not be repugnant to natural justice. Nigerian courts have applied this in cases like Edet v Essien, where a custom that disinherited a daughter was struck down. The test is applied flexibly, respecting cultural context but overriding barbarous or discriminatory practices.",
                3: "✔ MODEL ANSWER (Q3)\n\n(a) Literal Rule: words are given their plain, ordinary meaning. (Whitely v Chappell).\n\n(b) Golden Rule: modify literal meaning to avoid absurdity. (R v Allen; Grey v Pearson).\n\n(c) Mischief Rule: interpret to suppress the mischief the Act intended to remedy. (Heydon's Case; Smith v Hughes).",
                4: "✔ MODEL ANSWER (Q4)\n\n(a) In military regimes, decrees are issued by fiat, bypassing legislative scrutiny. In democracies, bills pass through first reading, committee, second reading, public hearing, third reading, and presidential assent—making the process rigorous.\n\n(b) Qualities of a good draftsman: precision, clarity, knowledge of law, foresight, neutrality, linguistic skill, and attention to detail.",
                5: "✔ MODEL ANSWER (Q5)\n\n(a) Library and research are crucial for legal reasoning, precedent discovery, and academic growth.\n\n(b) Catalogue organises materials; call numbers locate them precisely.\n\n(c) Periodicals are serial publications (journals, magazines); books are monographs.\n\n(d) Books are identified by title, author, subject, ISBN, and call number."
            };

            const TOTAL_QUESTIONS = 5;
            const MAX_SUBMISSIONS = 3;
            const TIMER_DURATION = 1800; // 30 minutes

            // Exam state – persisted in localStorage
            let state = {
                submitted: { 1: false, 2: false, 3: false, 4: false, 5: false },
                started: { 1: false, 2: false, 3: false, 4: false, 5: false },
                timeLeft: { 1: TIMER_DURATION, 2: TIMER_DURATION, 3: TIMER_DURATION, 4: TIMER_DURATION, 5: TIMER_DURATION },
                submittedCount: 0,
                allRevealed: false,
                examEnded: false,
                answers: { 1: '', 2: '', 3: '', 4: '', 5: '' },
                timerStart: { 1: null, 2: null, 3: null, 4: null, 5: null }, // timestamp when timer started
                timerRunning: { 1: false, 2: false, 3: false, 4: false, 5: false },
                correctionShown: { 1: false, 2: false, 3: false, 4: false, 5: false },
                // which questions are hidden (for examEnded state)
                hiddenQuestions: { 1: false, 2: false, 3: false, 4: false, 5: false }
            };

            // History – array of { id, question, answer, correction, timestamp }
            let history = [];

            // Timer intervals
            const intervals = {};

            // DOM refs cache
            const dom = {};
            function saveState() {
                try {
                    localStorage.setItem('examState', JSON.stringify(state));
                } catch (_) { /* ignore */ }
            }

            function loadState() {
                try {
                    const raw = localStorage.getItem('examState');
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        // Merge with defaults to handle new keys
                        state = { ...state, ...parsed };
                        // Ensure nested objects exist
                        for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                            if (!state.submitted[q]) state.submitted[q] = false;
                            if (!state.started[q]) state.started[q] = false;
                            if (!state.timeLeft[q]) state.timeLeft[q] = TIMER_DURATION;
                            if (!state.answers[q]) state.answers[q] = '';
                            if (!state.timerStart[q]) state.timerStart[q] = null;
                            if (!state.timerRunning[q]) state.timerRunning[q] = false;
                            if (!state.correctionShown[q]) state.correctionShown[q] = false;
                            if (!state.hiddenQuestions[q]) state.hiddenQuestions[q] = false;
                        }
                        return true;
                    }
                } catch (_) { /* ignore */ }
                return false;
            }

            function saveHistory() {
                try {
                    localStorage.setItem('examHistory', JSON.stringify(history));
                } catch (_) { /* ignore */ }
            }

            function loadHistory() {
                try {
                    const raw = localStorage.getItem('examHistory');
                    if (raw) {
                        history = JSON.parse(raw);
                        return true;
                    }
                } catch (_) { /* ignore */ }
                return false;
            }

            function initDomRefs() {
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    dom['timer' + q] = document.getElementById('timer' + q);
                    dom['timerInline' + q] = document.getElementById('timer' + q + '_inline');
                    dom['answer' + q] = document.getElementById('answer' + q);
                    dom['question' + q] = document.getElementById('q' + q);
                    dom['correction' + q] = document.getElementById('correction' + q);
                    dom['startBtn' + q] = document.querySelector('.btn-start[data-q="' + q + '"]');
                    dom['submitBtn' + q] = document.querySelector('.btn-submit[data-q="' + q + '"]');
                }
                dom.count = document.getElementById('count');
                dom.statusMsg = document.getElementById('statusMsg');
                dom.historyBadge = document.getElementById('historyBadge');
                dom.historyContainer = document.getElementById('historyListContainer');
                dom.restartBtn = document.getElementById('restartBtn');
                dom.clearAllHistory = document.getElementById('clearAllHistory');
                dom.toast = document.getElementById('toast');
                // Navigation links
                dom.navLinks = document.querySelectorAll('.nav-links a[data-view]');
                dom.views = {
                    home: document.getElementById('view-home'),
                    history: document.getElementById('view-history')
                };
            }

            let toastTimer = null;

            function showToast(message, type) {
                const el = dom.toast;
                if (!el) return;
                el.textContent = message;
                el.className = 'toast';
                if (type) el.classList.add(type);
                el.classList.add('show');
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => {
                    el.classList.remove('show');
                }, 3500);
            }

            function switchView(viewName) {
                // Update nav links
                dom.navLinks.forEach(link => {
                    const v = link.dataset.view;
                    link.classList.toggle('active', v === viewName);
                });
                // Update views
                Object.keys(dom.views).forEach(key => {
                    dom.views[key].classList.toggle('active', key === viewName);
                });
                // If history view, render it
                if (viewName === 'history') {
                    renderHistory();
                }
            }
            function updateTimerDisplay(q, seconds) {
                const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
                const secs = String(seconds % 60).padStart(2, '0');
                const display = mins + ':' + secs;
                if (dom['timer' + q]) dom['timer' + q].textContent = display;
                if (dom['timerInline' + q]) dom['timerInline' + q].textContent = display;
            }

            function stopTimer(q) {
                if (intervals[q]) {
                    clearInterval(intervals[q]);
                    delete intervals[q];
                }
                state.timerRunning[q] = false;
                state.timerStart[q] = null;
                saveState();
            }

            function startTimer(q) {
                if (intervals[q]) stopTimer(q);
                if (state.submitted[q]) return;
                if (state.timeLeft[q] <= 0) {
                    handleTimeUp(q);
                    return;
                }

                state.timerRunning[q] = true;
                state.timerStart[q] = Date.now();
                saveState();

                // Update display immediately
                updateTimerDisplay(q, state.timeLeft[q]);

                intervals[q] = setInterval(() => {
                    if (!state.timerRunning[q]) return;
                    const elapsed = Math.floor((Date.now() - state.timerStart[q]) / 1000);
                    let remaining = Math.max(0, state.timeLeft[q] - elapsed);
                    updateTimerDisplay(q, remaining);
                    if (remaining <= 0) {
                        stopTimer(q);
                        handleTimeUp(q);
                    }
                }, 500);
            }

            // Called on page load to restore timers
            function restoreTimers() {
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    if (state.started[q] && !state.submitted[q] && state.timerRunning[q] && state.timerStart[q]) {
                        // Calculate elapsed time
                        const elapsed = Math.floor((Date.now() - state.timerStart[q]) / 1000);
                        let remaining = state.timeLeft[q] - elapsed;
                        if (remaining <= 0) {
                            state.timeLeft[q] = 0;
                            saveState();
                            handleTimeUp(q);
                        } else {
                            state.timeLeft[q] = remaining;
                            saveState();
                            // Restart the timer
                            startTimer(q);
                        }
                    } else if (state.started[q] && !state.submitted[q] && state.timeLeft[q] > 0) {
                        // Timer was running but not properly tracked? Restart it.
                        state.timerRunning[q] = true;
                        state.timerStart[q] = Date.now();
                        saveState();
                        startTimer(q);
                    } else if (state.submitted[q] || state.timeLeft[q] <= 0) {
                        // Lock it
                        lockQuestion(q, state.timeLeft[q] <= 0);
                    }
                }
            }
            function lockQuestion(q, isTimeUp) {
                const ta = dom['answer' + q];
                const startBtn = dom['startBtn' + q];
                const submitBtn = dom['submitBtn' + q];
                if (ta) ta.disabled = true;
                if (startBtn) startBtn.disabled = true;
                if (submitBtn) submitBtn.disabled = true;
                if (isTimeUp) {
                    const timerEl = dom['timer' + q];
                    if (timerEl) { timerEl.textContent = '⏰ TIME UP';
                        timerEl.classList.add('timeup'); }
                    const timerInline = dom['timerInline' + q];
                    if (timerInline) { timerInline.textContent = '⏰ TIME UP';
                        timerInline.classList.add('timeup'); }
                }
                if (state.submitted[q]) {
                    // Show correction if already revealed
                    if (state.correctionShown[q] || state.allRevealed) {
                        showCorrection(q);
                    }
                }
                saveState();
            }

            function handleTimeUp(q) {
                if (state.submitted[q]) return;
                state.timeLeft[q] = 0;
                state.submitted[q] = true;
                state.submittedCount++;
                // Save the answer text if any
                const ta = dom['answer' + q];
                if (ta) state.answers[q] = ta.value;
                // Auto-submit to history
                addHistoryEntry(q, state.answers[q], CORRECTIONS[q] || 'Model answer not available.');
                saveState();
                lockQuestion(q, true);
                updateCount();
                checkAndEndExam();
                showToast('⏰ Time up for Question ' + q + '. Auto-submitted.', 'warning');
            }

            function startExam(q) {
                if (state.submitted[q]) {
                    showToast('This question has already been submitted.', 'error');
                    return;
                }
                if (state.started[q]) {
                    showToast('Timer already running for this question.', 'warning');
                    return;
                }
                if (state.submittedCount >= MAX_SUBMISSIONS) {
                    showToast('You have already answered the maximum of ' + MAX_SUBMISSIONS + ' questions.', 'error');
                    return;
                }
                // Check if any other question is active (started but not submitted)
                for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
                    if (i !== q && state.started[i] && !state.submitted[i]) {
                        showToast('You must submit Question ' + i + ' before starting another question.', 'error');
                        return;
                    }
                }

                state.started[q] = true;
                state.timerRunning[q] = true;
                state.timerStart[q] = Date.now();
                const ta = dom['answer' + q];
                if (ta) {
                    ta.disabled = false;
                    ta.value = state.answers[q] || '';
                    ta.focus();
                }
                if (dom['startBtn' + q]) dom['startBtn' + q].disabled = true;
                if (dom['submitBtn' + q]) dom['submitBtn' + q].disabled = false;
                // Reset timer display
                state.timeLeft[q] = TIMER_DURATION;
                updateTimerDisplay(q, TIMER_DURATION);
                saveState();
                startTimer(q);
                showToast('⏱️ Timer started for Question ' + q, 'success');
            }

            function handleSubmit(q) {
                if (state.submitted[q]) {
                    showToast('This question has already been submitted.', 'error');
                    return;
                }
                if (!state.started[q]) {
                    showToast('Please start the exam for this question first.', 'error');
                    return;
                }
                // Get answer text
                const ta = dom['answer' + q];
                const answerText = ta ? ta.value : '';
                if (!answerText.trim()) {
                    showToast('Please write your answer before submitting.', 'warning');
                    return;
                }

                stopTimer(q);
                state.submitted[q] = true;
                state.submittedCount++;
                state.answers[q] = answerText;
                // Save to history
                addHistoryEntry(q, answerText, CORRECTIONS[q] || 'Model answer not available.');
                saveState();
                lockQuestion(q, false);
                updateCount();
                checkAndEndExam();
                showToast('✅ Question ' + q + ' submitted successfully!', 'success');
            }

            function showCorrection(q) {
                const corrDiv = dom['correction' + q];
                if (!corrDiv) return;
                corrDiv.textContent = CORRECTIONS[q] || '✔ Model answer not available.';
                corrDiv.classList.add('show');
                state.correctionShown[q] = true;
                saveState();
            }

            let historyIdCounter = 0;

            function addHistoryEntry(question, answer, correction) {
                const entry = {
                    id: ++historyIdCounter,
                    question: question,
                    answer: answer,
                    correction: correction,
                    timestamp: new Date().toLocaleString('en-NG', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    })
                };
                history.unshift(entry);
                saveHistory();
                updateHistoryBadge();
            }

            function deleteHistoryEntry(id) {
                history = history.filter(e => e.id !== id);
                saveHistory();
                updateHistoryBadge();
                renderHistory();
                showToast('Entry deleted.', 'success');
            }

            function clearAllHistory() {
                if (history.length === 0) {
                    showToast('History is already empty.', 'warning');
                    return;
                }
                if (confirm('Are you sure you want to delete ALL history entries?')) {
                    history = [];
                    saveHistory();
                    updateHistoryBadge();
                    renderHistory();
                    showToast('All history cleared.', 'success');
                }
            }

            function updateHistoryBadge() {
                if (dom.historyBadge) {
                    dom.historyBadge.textContent = history.length;
                }
            }

            function renderHistory() {
                const container = dom.historyContainer;
                if (!container) return;
                if (history.length === 0) {
                    container.innerHTML = `
                        <div class="history-empty">
                            📭 No practice history yet.
                            <p>Submit answers during practice sessions and they will appear here.</p>
                        </div>
                    `;
                    return;
                }
                let html = '<div class="history-list">';
                history.forEach(entry => {
                    const answerPreview = entry.answer.length > 300 ?
                        entry.answer.slice(0, 300) + '…' :
                        entry.answer;
                    html += `
                        <div class="history-card" data-id="${entry.id}">
                            <div class="hcard-head">
                                <span class="hq">📌 Question ${entry.question}</span>
                                <span class="hdate">${entry.timestamp}</span>
                                <div class="hactions">
                                    <button class="btn-view" data-id="${entry.id}">👁️ View</button>
                                    <button class="btn-delete" data-id="${entry.id}">🗑️ Delete</button>
                                </div>
                            </div>
                            <div class="hcard-body">
                                <div class="answer-preview" id="hanswer_${entry.id}">${escapeHtml(answerPreview)}</div>
                                <div class="correction-preview" id="hcorr_${entry.id}">${escapeHtml(entry.correction)}</div>
                                <button class="toggle-correction" data-id="${entry.id}">📖 Show Correction</button>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                container.innerHTML = html;

                // Attach event listeners
                container.querySelectorAll('.btn-view').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        const card = this.closest('.history-card');
                        const preview = card.querySelector('.answer-preview');
                        const corr = card.querySelector('.correction-preview');
                        const toggleBtn = card.querySelector('.toggle-correction');
                        if (preview) {
                            preview.classList.toggle('expanded');
                            this.textContent = preview.classList.contains('expanded') ? '👁️ Hide' : '👁️ View';
                        }
                        if (corr) {
                            corr.classList.toggle('show');
                        }
                        if (toggleBtn) {
                            toggleBtn.textContent = corr.classList.contains('show') ? '📖 Hide Correction' :
                            '📖 Show Correction';
                        }
                    });
                });

                container.querySelectorAll('.btn-delete').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        deleteHistoryEntry(id);
                    });
                });

                container.querySelectorAll('.toggle-correction').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        const card = this.closest('.history-card');
                        const corr = card.querySelector('.correction-preview');
                        if (corr) {
                            corr.classList.toggle('show');
                            this.textContent = corr.classList.contains('show') ? '📖 Hide Correction' :
                                '📖 Show Correction';
                        }
                    });
                });
            }

            // Simple escape to prevent XSS
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            function checkAndEndExam() {
                if (state.allRevealed || state.examEnded) return;
                let count = 0;
                for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
                    if (state.submitted[i]) count++;
                }
                if (count >= MAX_SUBMISSIONS) {
                    revealAllAnswers();
                    hideUnanswered();
                }
            }

            function revealAllAnswers() {
                if (state.allRevealed) return;
                state.allRevealed = true;
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    if (state.submitted[q]) {
                        showCorrection(q);
                    }
                }
                saveState();
                dom.statusMsg.textContent = '✅ All answers revealed.';
                showToast('🎓 Exam complete! Corrections are now visible.', 'success');
            }

            function hideUnanswered() {
                if (state.examEnded) return;
                state.examEnded = true;
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    if (!state.submitted[q]) {
                        const el = dom['question' + q];
                        if (el) {
                            el.classList.add('hidden');
                            state.hiddenQuestions[q] = true;
                        }
                    }
                }
                // Disable all start buttons
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    if (dom['startBtn' + q]) dom['startBtn' + q].disabled = true;
                    if (dom['submitBtn' + q]) dom['submitBtn' + q].disabled = true;
                }
                saveState();
                dom.statusMsg.textContent = '✅ Exam ended. Only answered questions remain.';
            }


            function updateCount() {
                if (dom.count) dom.count.textContent = state.submittedCount;
                if (state.submittedCount >= MAX_SUBMISSIONS) {
                    dom.statusMsg.textContent = '✅ Maximum questions answered. Exam complete.';
                } else {
                    const remaining = MAX_SUBMISSIONS - state.submittedCount;
                    dom.statusMsg.textContent = '📝 ' + remaining + ' more question' + (remaining > 1 ? 's' : '') +
                        ' to complete.';
                }
            }

            function restartExam() {
                if (!confirm('⚠️ Restarting will reset all exam progress. History will be preserved. Continue?')) {
                    return;
                }
                // Stop all timers
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    stopTimer(q);
                }
                // Reset state (but keep history)
                state.submitted = { 1: false, 2: false, 3: false, 4: false, 5: false };
                state.started = { 1: false, 2: false, 3: false, 4: false, 5: false };
                state.timeLeft = { 1: TIMER_DURATION, 2: TIMER_DURATION, 3: TIMER_DURATION, 4: TIMER_DURATION,
                    5: TIMER_DURATION };
                state.submittedCount = 0;
                state.allRevealed = false;
                state.examEnded = false;
                state.answers = { 1: '', 2: '', 3: '', 4: '', 5: '' };
                state.timerStart = { 1: null, 2: null, 3: null, 4: null, 5: null };
                state.timerRunning = { 1: false, 2: false, 3: false, 4: false, 5: false };
                state.correctionShown = { 1: false, 2: false, 3: false, 4: false, 5: false };
                state.hiddenQuestions = { 1: false, 2: false, 3: false, 4: false, 5: false };
                saveState();

                // Reset UI
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    const ta = dom['answer' + q];
                    if (ta) { ta.value = '';
                        ta.disabled = true; }
                    const timerEl = dom['timer' + q];
                    if (timerEl) { timerEl.textContent = '30:00';
                        timerEl.classList.remove('timeup'); }
                    const timerInline = dom['timerInline' + q];
                    if (timerInline) { timerInline.textContent = '30:00';
                        timerInline.classList.remove('timeup'); }
                    if (dom['startBtn' + q]) dom['startBtn' + q].disabled = false;
                    if (dom['submitBtn' + q]) dom['submitBtn' + q].disabled = true;
                    const corrDiv = dom['correction' + q];
                    if (corrDiv) { corrDiv.textContent = '';
                        corrDiv.classList.remove('show'); }
                    const qEl = dom['question' + q];
                    if (qEl) qEl.classList.remove('hidden');
                }
                updateCount();
                dom.statusMsg.textContent = '🔄 Exam restarted. Start a question to begin.';
                showToast('🔄 Exam has been restarted.', 'success');
                // Switch to home view
                switchView('home');
            }

  
            function init() {
                initDomRefs();

                // Load history first
                loadHistory();
                updateHistoryBadge();

                // Load exam state
                const hasState = loadState();

                // Restore UI from state
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    const ta = dom['answer' + q];
                    if (ta) {
                        ta.value = state.answers[q] || '';
                        ta.disabled = state.submitted[q] || state.examEnded || state.timeLeft[q] <= 0;
                    }
                    if (state.submitted[q] || state.timeLeft[q] <= 0) {
                        lockQuestion(q, state.timeLeft[q] <= 0);
                    } else if (state.started[q]) {
                        if (dom['startBtn' + q]) dom['startBtn' + q].disabled = true;
                        if (dom['submitBtn' + q]) dom['submitBtn' + q].disabled = false;
                        if (ta) ta.disabled = false;
                    }
                    // Restore timer display
                    if (state.timeLeft[q] !== undefined) {
                        updateTimerDisplay(q, state.timeLeft[q]);
                    }
                    if (state.timeLeft[q] <= 0 && state.submitted[q]) {
                        const timerEl = dom['timer' + q];
                        if (timerEl) { timerEl.textContent = '⏰ TIME UP';
                            timerEl.classList.add('timeup'); }
                        const timerInline = dom['timerInline' + q];
                        if (timerInline) { timerInline.textContent = '⏰ TIME UP';
                            timerInline.classList.add('timeup'); }
                    }
                    // Show correction if already revealed
                    if (state.correctionShown[q] || state.allRevealed) {
                        if (state.submitted[q]) showCorrection(q);
                    }
                    // Hidden questions
                    if (state.hiddenQuestions[q] || (state.examEnded && !state.submitted[q])) {
                        const el = dom['question' + q];
                        if (el) el.classList.add('hidden');
                    }
                }

                updateCount();

                // If exam already ended, hide unanswered
                if (state.examEnded) {
                    hideUnanswered();
                }

                // If all revealed, show corrections
                if (state.allRevealed) {
                    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                        if (state.submitted[q]) showCorrection(q);
                    }
                    dom.statusMsg.textContent = '✅ All answers revealed.';
                }

                // Restore timers for running questions
                restoreTimers();

                // ─── EVENT BINDINGS ───

                // Start buttons
                document.querySelectorAll('.btn-start').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const q = parseInt(this.dataset.q);
                        startExam(q);
                    });
                });

                // Submit buttons
                document.querySelectorAll('.btn-submit').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const q = parseInt(this.dataset.q);
                        handleSubmit(q);
                    });
                });

                // Navigation
                dom.navLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const view = this.dataset.view;
                        switchView(view);
                    });
                });

                // Restart
                dom.restartBtn.addEventListener('click', restartExam);

                // Clear history
                dom.clearAllHistory.addEventListener('click', clearAllHistory);

                // ─── SAVE ON UNLOAD ───
                window.addEventListener('beforeunload', function() {
                    // Save textarea contents to state
                    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                        const ta = dom['answer' + q];
                        if (ta && !state.submitted[q]) {
                            state.answers[q] = ta.value;
                        }
                    }
                    saveState();
                });

                // Also save on any input change
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    const ta = dom['answer' + q];
                    if (ta) {
                        ta.addEventListener('input', function() {
                            if (!state.submitted[q]) {
                                state.answers[q] = this.value;
                                saveState();
                            }
                        });
                    }
                }

                // Show welcome toast
                if (state.submittedCount > 0) {
                    showToast('📚 Welcome back! Your progress has been restored.', 'success');
                } else {
                    showToast('📖 Ready to practice? Start a question when you\'re ready.', 'success');
                }

                // Update history badge after any changes
                updateHistoryBadge();

                console.log('🏛️ Legal Methods II Exam System initialized.');
                console.log('📊 State:', state);
                console.log('📜 History entries:', history.length);
            }

            // ─── START ───
            document.addEventListener('DOMContentLoaded', init);

        })();