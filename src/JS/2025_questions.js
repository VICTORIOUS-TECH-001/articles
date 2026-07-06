(function() {
            'use strict';

            const CORRECTIONS = {
                1: `✔ MODEL ANSWER (Q1)

(a) COMMON LAW vs EQUITY
Similarities: Both are sources of law; both are administered by the same courts; both seek to do justice.
Differences:
- Common Law is rigid and based on precedent; Equity is flexible and based on fairness.
- Common Law remedies are monetary (damages); Equity provides specific performance, injunction, rescission.
- Common Law originated from customary laws and royal courts; Equity arose from the Chancellor's jurisdiction to mitigate harshness.
- Common Law is a complete system; Equity is a gloss on Common Law.
- Equity prevails in case of conflict (Earl of Oxford's Case).

(b) DISTINGUISHING AND PRECEDENT
Distinguishing does not go against the doctrine of stare decisis; it is a legitimate technique to avoid following a precedent when the material facts differ. In Balfour v Balfour, the court distinguished a domestic agreement from a commercial one. The principle remains intact; distinguishing refines and limits the application of precedent rather than undermining it.

(c) THREE WAYS A DECISION CAN BE BINDING:
1. Ratio decidendi – the legal principle on which the decision is based; binding on lower courts.
2. Stare decisis – courts must follow decisions of higher courts in the same hierarchy.
3. Judicial precedent – a decision of a superior court is binding on all lower courts (e.g., Supreme Court decisions bind Court of Appeal and High Courts).`,

                2: `✔ MODEL ANSWER (Q2)

(a) LEGISLATION vs CASE LAW
Legislation (statutes) are laws enacted by the legislature; they are written, prospective, and can be amended or repealed. Case law (judge‑made law) arises from judicial decisions and is based on the doctrine of precedent. Legislation is superior to case law; however, case law interprets statutes and fills gaps. Both are binding sources of law in Nigeria.

(b) DELEGATED LEGISLATION – NECESSITY AND TYPES
Necessity: Parliament lacks time and expertise to handle all details; it allows flexibility, speed, and technical input. Types: (i) Orders in Council; (ii) Rules and Regulations; (iii) Bye‑laws; (iv) Proclamations; (v) Directions and Notices.

(c) MILITARY LEGISLATION PROCESS
Under military rule, decrees are made by the Head of State (Supreme Military Council) without parliamentary scrutiny. The process is swift: a decree is drafted, approved by the military council, and promulgated with immediate effect. There is no public hearing or debate. Decrees are often ousted from judicial review (e.g., Decree No. 1 of 1984).`,

                3: `✔ MODEL ANSWER (Q3)

(a) PER INCURIAM AND BINDING PRECEDENT – Okoegbu v The State
The principle in Okoegbu v The State is that a lower court cannot refuse to follow a decision of a higher court simply because it considers it per incuriam (decided without reference to a binding authority). Only the higher court itself can overrule its own decision. The doctrine of per incuriam is limited: it may be used by a court of co‑ordinate jurisdiction or a higher court when considering previous decisions, but not by a lower court vis‑à‑vis a higher court.

(b) MILITARY vs DEMOCRATIC REGIMES – SUITABILITY FOR NIGERIA
Democratic regime is more suitable for Nigeria because:
1. It guarantees fundamental human rights and rule of law.
2. It allows for popular participation and accountability.
3. It ensures separation of powers and checks and balances.
4. It promotes stability and legitimacy through free and fair elections.
5. It encourages economic development and international recognition.

(c) HIERARCHY OF COURTS (1999 CONSTITUTION)
1. Supreme Court (highest)
2. Court of Appeal
3. Federal High Court / High Court of the FCT / State High Courts
4. Sharia Court of Appeal / Customary Court of Appeal
5. Magistrate / District Courts
6. Area / Customary Courts`,

                4: `✔ MODEL ANSWER (Q4)

(a) JUDGES MAKING LAWS IN A FEDERAL SYSTEM
In a federal system, the legislature is the primary law‑maker. However, judges make law through:
- Interpretation of statutes – giving meaning to ambiguous provisions.
- Development of common law – filling gaps where no statute exists.
- Application of equitable principles – creating remedies not provided by statute.
- Judicial precedent – decisions become binding for future cases.
This is known as judicial law‑making, but it is incidental and constrained by the doctrine of precedent and constitutional boundaries.

(b) GENERALIA SPECIALIBUS NON DEROGANT
This maxim means "general things do not derogate from special things." It is a rule of statutory interpretation: where a general provision conflicts with a specific provision on the same subject, the specific provision prevails. It is applied to avoid inconsistency and give effect to the legislature's intent. Example: A general statute on contracts will not override a specific statute on sale of goods.`,

                5: `✔ MODEL ANSWER (Q5)

(a) PURPOSE AND IMPORTANCE OF BRIEF WRITING
Brief writing is the process of preparing written arguments for court. Purposes:
- To present legal arguments clearly and concisely.
- To assist the court in understanding the issues and authorities.
- To ensure fair hearing and focus on relevant points.
Importance:
- It saves court time.
- It allows for proper preparation and research.
- It ensures that both parties' positions are articulated.
- It serves as a record for appeal.

(b) CONSEQUENCES OF FAILURE TO FILE BRIEFS
Under the Court of Appeal Rules and Supreme Court Rules, failure to file briefs within the prescribed time may lead to:
- The appeal being struck out.
- The respondent being allowed to file out of time.
- The court refusing to hear oral argument.
- The court making orders for costs or other sanctions.
The court has discretion to extend time upon application, but it is not automatic.

(c) RELEVANCE OF LAW CITATORS IN LEGAL RESEARCH
Law citators (e.g., Nigerian Law Citator, Westlaw) are tools that:
- Show the judicial history of a case (whether affirmed, reversed, overruled).
- Provide references to subsequent cases that have cited a particular decision.
- Help researchers verify the current validity of a case or statute.
- Assist in locating relevant authorities.
- Save time by providing a comprehensive list of citations.
They are indispensable for accurate and up‑to‑date legal research.`
            };

            const TOTAL_QUESTIONS = 5;
            const MAX_SUBMISSIONS = 3;
            const TIMER_DURATION = 1800; // 30 minutes

            // Exam state – persisted in localStorage
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
                hiddenQuestions: { 1: false, 2: false, 3: false, 4: false, 5: false }
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

            function restoreTimers() {
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
                switchView('home');
            }

            function init() {
                initDomRefs();
                loadHistory();
                updateHistoryBadge();
                const hasState = loadState();

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
                restoreTimers();

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
                    showToast('📖 Ready to practice? Start a question when you\'re ready.', 'success');
                }
                updateHistoryBadge();
                console.log('🏛️ LAW 132 · LEGAL METHODS 2 Exam System initialized.');
            }

            document.addEventListener('DOMContentLoaded', init);

        })();