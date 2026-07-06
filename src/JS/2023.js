  (function() {
            'use strict';

            const CORRECTIONS = {
                1: `✔ MODEL ANSWER (Q1)

(a) PROCEDURES FOR LEGISLATING AGAINST FIREARMS:
The National Assembly must follow the constitutional process:
1. First Reading: The bill is introduced and its title is read; no debate.
2. Second Reading: General principles are debated; if approved, it goes to committee.
3. Committee Stage: Detailed clause‑by‑clause examination; amendments may be proposed.
4. Report Stage: Committee reports back; further amendments can be made.
5. Third Reading: Final debate and vote. If passed, it is sent to the other chamber.
6. Concurrence: The other chamber repeats the process; if amended, it returns to the originating chamber.
7. Presidential Assent: The bill is sent to the President. If refused, may be overridden by two‑thirds majority.
8. Commencement: The Act comes into force on the date of assent or as specified.

(b) JURISDICTION – MR GRANT SUING THE NATIONAL ASSEMBLY:
The Federal High Court has exclusive jurisdiction under Section 251(1) of the Constitution over matters involving the National Assembly and its officers. The suit challenges the legislative authority of the National Assembly, a federal institution. The Federal High Court is the appropriate court.

(c) FIVE FEATURES OF GOOD LEGISLATIVE DRAFTING:
1. Clarity: The language must be clear and unambiguous to convey the legislative intent.
2. Precision: Words must be chosen carefully to avoid loopholes and unintended interpretations.
3. Brevity: Avoid unnecessary words; be concise but complete.
4. Consistency: Use terms consistently throughout the statute; avoid contradictions.
5. Accessibility: Draft in plain language so that the law is understandable to the average citizen.`,

                2: `✔ MODEL ANSWER (Q2)

LEGAL ISSUES AND ADVICE FOR AGNES:

The main issue is whether the customary law that excludes female children from inheritance is valid and enforceable.

Under Section 42(1) and (2) of the 1999 Constitution, no person shall be discriminated against on the ground of sex. The Supreme Court in Ukeje v Ukeje (2014) held that the Igbo custom disinheriting female children is unconstitutional and void. Similarly, in Mojekwu v Mojekwu (1997), the Court of Appeal declared the Oli‑Ekpe custom discriminatory.

The repugnancy test also applies: any customary law that is repugnant to natural justice, equity, and good conscience is void.

Advice: Agnes should institute an action in the High Court, relying on constitutional provisions and the above authorities. She has a strong case; the custom is discriminatory and void. She is entitled to inherit equally with any male children. The court will likely set aside the custom and grant her relief.`,

                3: `✔ MODEL ANSWER (Q3)

DISCUSSION OF BECKE v SMITH:

This case lays down the classic formulation of the literal rule of statutory interpretation. The rule directs that courts must give words their plain, ordinary, and grammatical meaning, unless doing so would produce absurdity or be inconsistent with the legislature's intention.

The quote establishes two key principles:
- The primary approach is the literal meaning.
- However, if the literal meaning leads to manifest absurdity or repugnance, the court may modify the language to avoid such inconvenience, but only to the extent necessary.

This is often referred to as the golden rule. The court may depart from the literal meaning only when the result is absurd. Examples: R v Allen (1872) – 'marry' construed as 'go through a ceremony'; Grey v Pearson (1857) – court may modify to avoid absurdity.

Thus, Becke v Smith supports the literal rule but allows a limited exception to avoid absurdity, balancing parliamentary sovereignty and judicial common sense.`,

                4: `✔ MODEL ANSWER (Q4)

(a) COMPONENTS OF A WELL‑WRITTEN BRIEF:
1. Cover Page / Title: Identifies the court, parties, and appeal number.
2. Table of Contents: Lists sections for easy navigation.
3. Preliminary: Concise summary of the nature of the appeal and relief sought.
4. Statement of Facts: A clear, chronological summary of the material facts as found by the lower court.
5. Issues for Determination: The legal questions the appellate court must decide; must arise from the grounds of appeal.
6. Arguments / Submissions: Legal reasoning, supported by authorities (cases, statutes, texts).
7. Conclusion: Restates the reliefs sought.
8. List of Authorities: All cited cases, statutes, and other materials.
9. Endorsement / Signature: Counsel's signature and date.

(b) PRINCIPLES FOR FORMULATING GROUNDS OF APPEAL:
- Must be precise and concise.
- Must arise from the decision of the lower court.
- Must not introduce new facts not pleaded at trial.
- Must be competent (i.e., the appellant must have the right to appeal).
- Must be specific enough to inform the respondent and the court of the error complained of.
- Must not be vague, argumentative, or speculative.
- Each ground must be supported by particulars (reasons).`,

                5: `✔ MODEL ANSWER (Q5)

(i) LAW CITATORS: These are tools (e.g., Nigerian Law Citator, Westlaw) that track the judicial history of cases and statutes. They help researchers verify whether a case is still good law (not overruled or reversed) and find subsequent cases that have cited it. They save time and ensure accuracy.

(ii) LAW DIGEST: A digest is a subject‑based index of case law, summarising the ratio decidendi and key facts of numerous decisions under various topics. It aids research by allowing quick identification of relevant authorities on a particular point of law without reading full judgments.

(iii) LAW JOURNALS: Scholarly publications containing articles, commentaries, and case notes written by academics and practitioners. They provide in‑depth analysis, critique, and recent developments in the law, helping researchers stay updated and gain deeper insights.

(iv) LAW DICTIONARIES: They define legal terms, phrases, and maxims. They are essential for understanding the precise meaning of terminology used in statutes, cases, and legal writings, ensuring accurate interpretation and application.`
            };

            const TOTAL_QUESTIONS = 5;
            const MAX_SUBMISSIONS = 3;
            const TIMER_DURATION = 1800; // 30 minutes per question
            const GLOBAL_DURATION = 100 * 60; // 100 minutes total

            let state = {
                submitted: { 1: false, 2: false, 3: false, 4: false, 5: false },
                started: { 1: false, 2: false, 3: false, 4: false, 5: false },
                timeLeft: { 1: TIMER_DURATION, 2: TIMER_DURATION, 3: TIMER_DURATION, 4: TIMER_DURATION,
                5: TIMER_DURATION },
                submittedCount: 0,
                allRevealed: false,
                examEnded: false,
                answers: { 1: '', 2: '', 3: '', 4: '', 5: '' },
                timerStart: { 1: null, 2: null, 3: null, 4: null, 5: null },
                timerRunning: { 1: false, 2: false, 3: false, 4: false, 5: false },
                correctionShown: { 1: false, 2: false, 3: false, 4: false, 5: false },
                hiddenQuestions: { 1: false, 2: false, 3: false, 4: false, 5: false },
                // Global timer state
                globalTimeLeft: GLOBAL_DURATION,
                globalTimerRunning: false,
                globalTimerStart: null,
                globalTimeUpShown: false
            };

            let history = [];
            const intervals = {};
            const dom = {};

            function saveState() {
                try { localStorage.setItem('examState', JSON.stringify(state)); } catch (_) {}
            }

            function loadState() {
                try {
                    const raw = localStorage.getItem('examState');
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        state = { ...state, ...parsed };
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
                        if (!state.globalTimeLeft) state.globalTimeLeft = GLOBAL_DURATION;
                        if (state.globalTimerRunning === undefined) state.globalTimerRunning = false;
                        if (!state.globalTimerStart) state.globalTimerStart = null;
                        if (state.globalTimeUpShown === undefined) state.globalTimeUpShown = false;
                        return true;
                    }
                } catch (_) {}
                return false;
            }

            function saveHistory() {
                try { localStorage.setItem('examHistory', JSON.stringify(history)); } catch (_) {}
            }

            function loadHistory() {
                try {
                    const raw = localStorage.getItem('examHistory');
                    if (raw) { history = JSON.parse(raw); return true; }
                } catch (_) {}
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
                dom.navLinks = document.querySelectorAll('.nav-links a[data-view]');
                dom.views = {
                    home: document.getElementById('view-home'),
                    history: document.getElementById('view-history')
                };
                dom.globalTimerDisplay = document.getElementById('globalTimerDisplay');
                dom.startExamBtn = document.getElementById('startExamBtn');
                dom.goToHistoryBtn = document.getElementById('goToHistoryBtn');
                dom.timeupOverlay = document.getElementById('timeup-overlay');
                dom.examOverlay = document.getElementById('exam-overlay');
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
                toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3500);
            }

            function switchView(viewName) {
                dom.navLinks.forEach(link => {
                    const v = link.dataset.view;
                    link.classList.toggle('active', v === viewName);
                });
                Object.keys(dom.views).forEach(key => {
                    dom.views[key].classList.toggle('active', key === viewName);
                });
                if (viewName === 'history') renderHistory();
            }

            function updateTimerDisplay(q, seconds) {
                const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
                const secs = String(seconds % 60).padStart(2, '0');
                const display = mins + ':' + secs;
                if (dom['timer' + q]) dom['timer' + q].textContent = display;
                if (dom['timerInline' + q]) dom['timerInline' + q].textContent = display;
            }

            function updateGlobalTimerDisplay(seconds) {
                const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
                const secs = String(seconds % 60).padStart(2, '0');
                const display = '⏱️ ' + mins + ':' + secs;
                if (dom.globalTimerDisplay) dom.globalTimerDisplay.textContent = display;
            }

            function stopTimer(q) {
                if (intervals[q]) { clearInterval(intervals[q]);
                    delete intervals[q]; }
                state.timerRunning[q] = false;
                state.timerStart[q] = null;
                saveState();
            }

            function startTimer(q) {
                if (intervals[q]) stopTimer(q);
                if (state.submitted[q]) return;
                if (state.timeLeft[q] <= 0) { handleTimeUp(q); return; }

                state.timerRunning[q] = true;
                state.timerStart[q] = Date.now();
                saveState();
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

            // ─── GLOBAL TIMER ───
            let globalInterval = null;

            function stopGlobalTimer() {
                if (globalInterval) { clearInterval(globalInterval);
                    globalInterval = null; }
                state.globalTimerRunning = false;
                state.globalTimerStart = null;
                saveState();
            }

            function startGlobalTimer() {
                if (globalInterval) stopGlobalTimer();
                if (state.globalTimeLeft <= 0) {
                    handleGlobalTimeUp();
                    return;
                }

                state.globalTimerRunning = true;
                state.globalTimerStart = Date.now();
                saveState();
                updateGlobalTimerDisplay(state.globalTimeLeft);

                globalInterval = setInterval(() => {
                    if (!state.globalTimerRunning) return;
                    const elapsed = Math.floor((Date.now() - state.globalTimerStart) / 1000);
                    let remaining = Math.max(0, state.globalTimeLeft - elapsed);
                    updateGlobalTimerDisplay(remaining);
                    if (remaining <= 0) {
                        stopGlobalTimer();
                        handleGlobalTimeUp();
                    }
                }, 500);
            }

            function handleGlobalTimeUp() {
                if (state.globalTimeUpShown) return;
                state.globalTimeUpShown = true;
                state.globalTimeLeft = 0;
                saveState();

                // Force submit all started but not submitted questions
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    if (state.started[q] && !state.submitted[q]) {
                        const ta = dom['answer' + q];
                        if (ta) {
                            state.answers[q] = ta.value;
                        }
                        // Mark as submitted
                        state.submitted[q] = true;
                        state.submittedCount++;
                        // Add to history
                        addHistoryEntry(q, state.answers[q], CORRECTIONS[q] || 'Model answer not available.');
                        // Lock the question
                        lockQuestion(q, false);
                    }
                }
                saveState();
                updateCount();
                checkAndEndExam();

                // Show the time's up overlay
                if (dom.timeupOverlay) {
                    dom.timeupOverlay.classList.remove('hidden');
                }
                showToast('⏰ Time is up! Your answers have been submitted.', 'warning');
            }

            // ─── END GLOBAL TIMER ───

            function restoreTimers() {
                // Restore global timer
                if (state.globalTimerRunning && state.globalTimerStart) {
                    const elapsed = Math.floor((Date.now() - state.globalTimerStart) / 1000);
                    let remaining = state.globalTimeLeft - elapsed;
                    if (remaining <= 0) {
                        state.globalTimeLeft = 0;
                        saveState();
                        handleGlobalTimeUp();
                    } else {
                        state.globalTimeLeft = remaining;
                        saveState();
                        startGlobalTimer();
                    }
                } else if (state.globalTimerRunning && state.globalTimeLeft > 0) {
                    state.globalTimerRunning = true;
                    state.globalTimerStart = Date.now();
                    saveState();
                    startGlobalTimer();
                } else if (state.globalTimeLeft <= 0) {
                    updateGlobalTimerDisplay(0);
                    if (!state.globalTimeUpShown) {
                        handleGlobalTimeUp();
                    }
                }

                // Restore question timers
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    if (state.started[q] && !state.submitted[q] && state.timerRunning[q] && state.timerStart[q]) {
                        const elapsed = Math.floor((Date.now() - state.timerStart[q]) / 1000);
                        let remaining = state.timeLeft[q] - elapsed;
                        if (remaining <= 0) {
                            state.timeLeft[q] = 0;
                            saveState();
                            handleTimeUp(q);
                        } else {
                            state.timeLeft[q] = remaining;
                            saveState();
                            startTimer(q);
                        }
                    } else if (state.started[q] && !state.submitted[q] && state.timeLeft[q] > 0) {
                        state.timerRunning[q] = true;
                        state.timerStart[q] = Date.now();
                        saveState();
                        startTimer(q);
                    } else if (state.submitted[q] || state.timeLeft[q] <= 0) {
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
                    if (state.correctionShown[q] || state.allRevealed) showCorrection(q);
                }
                saveState();
            }

            function handleTimeUp(q) {
                if (state.submitted[q]) return;
                state.timeLeft[q] = 0;
                state.submitted[q] = true;
                state.submittedCount++;
                const ta = dom['answer' + q];
                if (ta) state.answers[q] = ta.value;
                addHistoryEntry(q, state.answers[q], CORRECTIONS[q] || 'Model answer not available.');
                saveState();
                lockQuestion(q, true);
                updateCount();
                checkAndEndExam();
                showToast('⏰ Time up for Question ' + q + '. Auto‑submitted.', 'warning');
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
                if (ta) { ta.disabled = false;
                    ta.value = state.answers[q] || '';
                    ta.focus(); }
                if (dom['startBtn' + q]) dom['startBtn' + q].disabled = true;
                if (dom['submitBtn' + q]) dom['submitBtn' + q].disabled = false;
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
                if (history.length === 0) { showToast('History is already empty.', 'warning'); return; }
                if (confirm('Are you sure you want to delete ALL history entries?')) {
                    history = [];
                    saveHistory();
                    updateHistoryBadge();
                    renderHistory();
                    showToast('All history cleared.', 'success');
                }
            }

            function updateHistoryBadge() {
                if (dom.historyBadge) dom.historyBadge.textContent = history.length;
            }

            function renderHistory() {
                const container = dom.historyContainer;
                if (!container) return;
                if (history.length === 0) {
                    container.innerHTML =
                        `
                        <div class="history-empty">
                            📭 No practice history yet.
                            <p>Submit answers during practice sessions and they will appear here.</p>
                        </div>
                    `;
                    return;
                }
                let html = '<div class="history-list">';
                history.forEach(entry => {
                    const answerPreview = entry.answer.length > 300 ? entry.answer.slice(0, 300) + '…' : entry.answer;
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

                container.querySelectorAll('.btn-view').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        const card = this.closest('.history-card');
                        const preview = card.querySelector('.answer-preview');
                        const corr = card.querySelector('.correction-preview');
                        const toggleBtn = card.querySelector('.toggle-correction');
                        if (preview) { preview.classList.toggle('expanded');
                            this.textContent = preview.classList.contains('expanded') ? '👁️ Hide' :
                            '👁️ View'; }
                        if (corr) { corr.classList.toggle('show'); }
                        if (toggleBtn) { toggleBtn.textContent = corr.classList.contains('show') ?
                                '📖 Hide Correction' : '📖 Show Correction'; }
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
                    if (state.submitted[q]) showCorrection(q);
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
                        if (el) { el.classList.add('hidden');
                            state.hiddenQuestions[q] = true; }
                    }
                }
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
                if (!confirm('⚠️ Restarting will reset all exam progress. History will be preserved. Continue?')) return;
                for (let q = 1; q <= TOTAL_QUESTIONS; q++) stopTimer(q);
                stopGlobalTimer();

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
                state.globalTimeLeft = GLOBAL_DURATION;
                state.globalTimerRunning = false;
                state.globalTimerStart = null;
                state.globalTimeUpShown = false;
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
                updateGlobalTimerDisplay(GLOBAL_DURATION);
                if (dom.timeupOverlay) dom.timeupOverlay.classList.add('hidden');
                if (dom.examOverlay) dom.examOverlay.classList.remove('hidden');

                updateCount();
                dom.statusMsg.textContent = '🔄 Exam restarted. Click "Start" to begin.';
                showToast('🔄 Exam has been restarted.', 'success');
                switchView('home');
            }

            function init() {
                initDomRefs();
                loadHistory();
                updateHistoryBadge();
                const hasState = loadState();

                // Setup initial overlay
                if (dom.examOverlay) {
                    // If global time is up, show the timeup overlay instead
                    if (state.globalTimeUpShown || state.globalTimeLeft <= 0) {
                        dom.examOverlay.classList.add('hidden');
                        if (dom.timeupOverlay) dom.timeupOverlay.classList.remove('hidden');
                        handleGlobalTimeUp(); // ensure everything is submitted
                    } else {
                        dom.examOverlay.classList.remove('hidden');
                    }
                }

                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    const ta = dom['answer' + q];
                    if (ta) {
                        ta.value = state.answers[q] || '';
                        ta.disabled = state.submitted[q] || state.examEnded || state.timeLeft[q] <= 0 || state
                            .globalTimeUpShown;
                    }
                    if (state.submitted[q] || state.timeLeft[q] <= 0) {
                        lockQuestion(q, state.timeLeft[q] <= 0);
                    } else if (state.started[q]) {
                        if (dom['startBtn' + q]) dom['startBtn' + q].disabled = true;
                        if (dom['submitBtn' + q]) dom['submitBtn' + q].disabled = false;
                        if (ta) ta.disabled = false;
                    }
                    if (state.timeLeft[q] !== undefined) updateTimerDisplay(q, state.timeLeft[q]);
                    if (state.timeLeft[q] <= 0 && state.submitted[q]) {
                        const timerEl = dom['timer' + q];
                        if (timerEl) { timerEl.textContent = '⏰ TIME UP';
                            timerEl.classList.add('timeup'); }
                        const timerInline = dom['timerInline' + q];
                        if (timerInline) { timerInline.textContent = '⏰ TIME UP';
                            timerInline.classList.add('timeup'); }
                    }
                    if (state.correctionShown[q] || state.allRevealed) {
                        if (state.submitted[q]) showCorrection(q);
                    }
                    if (state.hiddenQuestions[q] || (state.examEnded && !state.submitted[q])) {
                        const el = dom['question' + q];
                        if (el) el.classList.add('hidden');
                    }
                }

                updateCount();
                if (state.examEnded) hideUnanswered();
                if (state.allRevealed) {
                    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                        if (state.submitted[q]) showCorrection(q);
                    }
                    dom.statusMsg.textContent = '✅ All answers revealed.';
                }

                // Restore global timer display
                if (state.globalTimeLeft !== undefined) {
                    updateGlobalTimerDisplay(state.globalTimeLeft);
                }

                // Start global timer if not already running and exam not ended
                if (!state.globalTimeUpShown && state.globalTimeLeft > 0 && !state.examEnded) {
                    // If timer was running, restore it, otherwise wait for user to click start.
                    if (state.globalTimerRunning) {
                        restoreTimers();
                    } else {
                        // Timer is not running, show the initial overlay
                        if (dom.examOverlay) dom.examOverlay.classList.remove('hidden');
                    }
                } else if (state.globalTimeLeft <= 0) {
                    handleGlobalTimeUp();
                }

                // ─── EVENT BINDINGS ───

                // Start overlay click
                if (dom.startExamBtn) {
                    dom.startExamBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (dom.examOverlay) dom.examOverlay.classList.add('hidden');
                        // Start global timer if not already running
                        if (!state.globalTimerRunning && state.globalTimeLeft > 0 && !state.globalTimeUpShown) {
                            startGlobalTimer();
                        }
                        showToast('📖 Exam started! You have 100 minutes.', 'success');
                    });
                }
                // Also click on the overlay background
                if (dom.examOverlay) {
                    dom.examOverlay.addEventListener('click', function(e) {
                        if (e.target === this) {
                            this.classList.add('hidden');
                            if (!state.globalTimerRunning && state.globalTimeLeft > 0 && !state.globalTimeUpShown) {
                                startGlobalTimer();
                            }
                            showToast('📖 Exam started! You have 100 minutes.', 'success');
                        }
                    });
                }

                // Go to History button on timeup overlay
                if (dom.goToHistoryBtn) {
                    dom.goToHistoryBtn.addEventListener('click', function() {
                        if (dom.timeupOverlay) dom.timeupOverlay.classList.add('hidden');
                        switchView('history');
                        showToast('📜 Check your submitted answers and model answers.', 'success');
                    });
                }

                document.querySelectorAll('.btn-start').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const q = parseInt(this.dataset.q);
                        startExam(q);
                    });
                });

                document.querySelectorAll('.btn-submit').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const q = parseInt(this.dataset.q);
                        handleSubmit(q);
                    });
                });

                dom.navLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        switchView(this.dataset.view);
                    });
                });

                dom.restartBtn.addEventListener('click', restartExam);
                dom.clearAllHistory.addEventListener('click', clearAllHistory);

                window.addEventListener('beforeunload', function() {
                    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                        const ta = dom['answer' + q];
                        if (ta && !state.submitted[q]) state.answers[q] = ta.value;
                    }
                    saveState();
                });

                for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
                    const ta = dom['answer' + q];
                    if (ta) {
                        ta.addEventListener('input', function() {
                            if (!state.submitted[q]) { state.answers[q] = this.value;
                                saveState(); }
                        });
                    }
                }

                if (state.submittedCount > 0) {
                    showToast('📚 Welcome back! Your progress has been restored.', 'success');
                } else {
                    showToast('📖 Ready to practice? Click "Start" to begin the 100‑minute exam.', 'success');
                }
                updateHistoryBadge();
                console.log('🏛️ LAW 132 · LEGAL METHODS II Exam System initialized.');
            }

            document.addEventListener('DOMContentLoaded', init);

        })();