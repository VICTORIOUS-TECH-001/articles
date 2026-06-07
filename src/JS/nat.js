const ORIGINAL_QUESTION_SET = [
            { q: "A state enacts a regulation that retroactively penalizes behaviors that were legal at the time of commission. This violates which fundamental requirement of the rule of law as a tool for social control?", options: ["Predictability", "Flexibility", "Efficiency", "Autonomy"], answer: "Predictability" },
            { q: "If a legal system prioritizes the 'common good' over individual liberty in a specific dispute, which function of law is being primarily exercised?", options: ["Procedural facilitation", "Social engineering", "Private ordering", "Market regulation"], answer: "Social engineering" },
            { q: "A constitution establishes the separation of powers between the judiciary and the legislature. This fulfills which governance role identified by the World Bank?", options: ["Ordering power", "Controlling contestation", "Social policy implementation", "Resource distribution"], answer: "Ordering power" },
            { q: "Legal positivism argues that law is a tool for social control regardless of its moral content. If a law is technically valid but morally repugnant, the 'social control' function is:", options: ["Invalidated", "Fully functional", "Negated by intent", "Subjective"], answer: "Fully functional" },
            { q: "The ability of a citizen to challenge an administrative decision in court represents which governance role?", options: ["Rule-making", "Controlling contestation", "State-building", "Economic forecasting"], answer: "Controlling contestation" },
            { q: "When law acts as a framework for private contracts, it is facilitating:", options: ["State coercion", "Private ordering", "Social welfare", "Legislative mandate"], answer: "Private ordering" },
            { q: "Which of the following best describes the 'normative' aspect of law in a society?", options: ["Describing how people act", "Prescribing how people ought to act", "Predicting future crime", "Measuring economic output"], answer: "Prescribing how people ought to act" },
            { q: "If a state’s legal system lacks a mechanism for peacefully resolving disputes, what is the most likely consequence for the 'social control' function?", options: ["Increase in informal justice", "Economic efficiency", "State stability", "Enhanced accountability"], answer: "Increase in informal justice" },
            { q: "The 'common good' serves as a benchmark for which aspect of law?", options: ["Its validity", "Its normative justification", "Its technical application", "Its historical origin"], answer: "Its normative justification" },
            { q: "An actor is given authority to govern, but there is no mechanism for them to be held accountable. This creates a flaw in which governance role?", options: ["Ordering power", "Controlling contestation", "Economic policy conversion", "Behavior modification"], answer: "Controlling contestation" },
            { q: "Law is described as a 'tool.' This implies that law is intrinsically:", options: ["Teleological (goal-oriented)", "Neutral", "Static", "Ontologically independent"], answer: "Teleological (goal-oriented)" },
            { q: "When law 'restricts the creation of other norms,' it is acting as:", options: ["A catalyst for change", "A hierarchy of authority", "A social stabilizer", "A secondary norm"], answer: "A hierarchy of authority" },
            { q: "In the context of 'social ordering,' the law functions as a:", options: ["Reactive mechanism", "Proactive structural constraint", "Personal opinion", "Economic variable"], answer: "Proactive structural constraint" },
            { q: "If law is the embodiment of societal aspirations, then in a pluralistic society, law must necessarily be:", options: ["Uniform", "Compromised", "Static", "Absolutist"], answer: "Compromised" },
            { q: "A judge rules based on precedent to ensure consistency. This supports which aspect of the rule of law?", options: ["Certainty", "Innovation", "Discretion", "Equity"], answer: "Certainty" },
            { q: "The process of 'converting social policies into outcomes' is primarily associated with:", options: ["Judicial interpretation", "Public administration", "Private litigation", "Legal philosophy"], answer: "Public administration" },
            { q: "If the law fails to reflect the values of the people, its 'social control' function is likely to be:", options: ["Enhanced by force", "Negated by lack of compliance", "Irrelevant", "Strengthened"], answer: "Negated by lack of compliance" },
            { q: "What is the primary difference between a 'rule' and a 'norm' in legal theory?", options: ["Sanctionability", "Source", "Scope", "Duration"], answer: "Sanctionability" },
            { q: "The role of law in 'distributing justice' presupposes the existence of:", options: ["Universal consensus", "Scarcity of resources", "Absolute power", "Complete social equality"], answer: "Scarcity of resources" },
            { q: "A legislature passes a law that is so vague it cannot be interpreted. This violates which procedural element of law?", options: ["Publicity", "Clarity", "Retrospectivity", "Constancy"], answer: "Clarity" },
            { q: "If law is 'immaterial' regarding its specific aspirations, it suggests that law is:", options: ["Context-dependent", "Instrumentally agnostic", "Morally absolute", "Economically determined"], answer: "Instrumentally agnostic" },
            { q: "The concept of 'governance' as mentioned in the World Bank report implies that power is:", options: ["Inherited", "Structured", "Spontaneous", "Chaotic"], answer: "Structured" },
            { q: "What is the primary function of procedural law in 'controlling contestation'?", options: ["Setting substantive rights", "Defining the mechanism of dispute resolution", "Establishing state power", "Distributing wealth"], answer: "Defining the mechanism of dispute resolution" },
            { q: "If a society experiences rapid development, the law must transition from static to:", options: ["Arbitrary", "Dynamic", "Abolished", "Private"], answer: "Dynamic" },
            { q: "The relationship between law and social behavior is best characterized as:", options: ["Linear", "Dialectical", "One-way", "Non-existent"], answer: "Dialectical" },
            { q: "A person obeys the law because they fear punishment. This is an example of:", options: ["Internalization of norms", "External social control", "Rational choice", "Ethical obligation"], answer: "External social control" },
            { q: "A person obeys the law because they believe it is just. This is an example of:", options: ["Coercive power", "Legitimacy", "Social pressure", "Authority"], answer: "Legitimacy" },
            { q: "When law defines the relationship between the state and the citizen, it is defining:", options: ["Public Law", "Private Law", "Customary Law", "International Law"], answer: "Public Law" },
            { q: "The 'common good' is often an elusive concept, leading to the legal necessity of:", options: ["Judicial discretion", "Legislative finality", "Executive decree", "Market forces"], answer: "Judicial discretion" },
            { q: "Legal accountability requires, at a minimum:", options: ["A sovereign", "A standard of conduct and a review mechanism", "Absolute social control", "Universal prosperity"], answer: "A standard of conduct and a review mechanism" },
            { q: "According to the text, the emergence of law is linked to:", options: ["Economic wealth", "Relations in society", "Technological advancement", "Religious consensus"], answer: "Relations in society" },
            { q: "One of the three critical governance roles of law is to:", options: ["Maximize profits", "Order the behavior of individuals", "Replace social customs", "Ensure total equality"], answer: "Order the behavior of individuals" },
            { q: "Law converts economic and social policies into:", options: ["Ideologies", "Outcomes", "Promises", "Theory"], answer: "Outcomes" },
            { q: "The second role of law mentioned is defining the structure of:", options: ["Corporations", "Government", "Family units", "Global trade"], answer: "Government" },
            { q: "Law controls contestation by providing tools for:", options: ["State expansion", "Accountability", "Wealth hoarding", "Deregulation"], answer: "Accountability" },
            { q: "Law is defines law primarily as a tool for:", options: ["Social control", "Economic growth", "Personal freedom", "Religious guidance"], answer: "Social control" },
            { q: "When assessing behavior, law should be referenced to:", options: ["The elite class", "The common good", "Global standards", "Historical tradition"], answer: "The common good" },
            { q: "Law embodies the values and _______ of the people.", options: ["Aspirations", "Fear", "Regrets", "Secrets"], answer: "Aspirations" },
            { q: "Besides social control, the text identifies law as a means of:", options: ["Settling disputes", "Creating money", "Replacing religion", "Automating labor"], answer: "Settling disputes" },
            { q: "Law supports or _______ the creation of other norms.", options: ["Ignores", "Restricts", "Celebrates", "Doubles"], answer: "Restricts" },
            { q: "A great deal of law is employed:", options: ["Randomly", "Purposefully", "Secretly", "Negligently"], answer: "Purposefully" },
            { q: "To define law, one must have knowledge of:", options: ["Social activities", "Physics", "Chemistry", "Art"], answer: "Social activities" },
            { q: "The text mentions law as a means of _______ justice.", options: ["Hiding", "Distributing", "Buying", "Ignoring"], answer: "Distributing" },
            { q: "Law is a mechanism for _______ ordering.", options: ["Social", "Economic", "Political", "Global"], answer: "Social" },
            { q: "The World Bank report, law establishes authority among:", options: ["Government actors", "Foreign nations", "Private clubs", "Religious groups"], answer: "Government actors" },
            { q: "Law helps resolve disputes:", options: ["Violently", "Peacefully", "Secretly", "Arbitrarily"], answer: "Peacefully" },
            { q: "The text notes that it is immaterial whether aspirations are:", options: ["Political or economic", "Short or long term", "Local or global", "Legal or illegal"], answer: "Political or economic" },
            { q: "The governance role of ordering power involves:", options: ["The state and citizens", "The market and labor", "Law and nature", "Science and religion"], answer: "The state and citizens" },
            { q: "What provides the procedural tools to change the rules?", options: ["The Law", "The Economy", "The Culture", "The Market"], answer: "The Law" },
            { q: "Law is concerned with the welfare of:", options: ["The government only", "Those to whom the law is destined", "Only the wealthy", "Foreigners"], answer: "Those to whom the law is destined" }
  ];  

  // global state
  let activeQuestions = [];      // shuffled questions + options
  let userSelections = [];
  let currentQIndex = 0;
  let examActive = false;
  let timerInterval = null;
  let secondsLeft = 30 * 60;
  let isFinalizing = false;
  let pendingSubmit = false;

  // DOM elements
  const timerDisplay = document.getElementById('timer');
  const qContainer = document.getElementById('question-container');
  const confirmModal = document.getElementById('confirmModal');
  const scoreModal = document.getElementById('scoreModal');

  // helpers
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildShuffledExamSet() {
    let shuffledSet = ORIGINAL_QUESTION_SET.map(q => ({
      q: q.q,
      answer: q.answer,
      options: [...q.options]
    }));
    for (let q of shuffledSet) q.options = shuffleArray(q.options);
    return shuffleArray(shuffledSet);
  }

  function formatTime(sec) {
    let mins = Math.floor(sec / 60);
    let remSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remSec.toString().padStart(2, '0')}`;
  }

  function updateTimerUI() {
    if (timerDisplay) timerDisplay.innerText = formatTime(secondsLeft);
  }

  function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }

  function startTimer() {
    if (timerInterval) stopTimer();
    timerInterval = setInterval(() => {
      if (!examActive) return;
      if (secondsLeft <= 1) {
        secondsLeft = 0;
        updateTimerUI();
        stopTimer();
        if (examActive && !isFinalizing) autoSubmitDueToTime();
      } else {
        secondsLeft--;
        updateTimerUI();
      }
    }, 1000);
  }

  function renderCurrentQuestion() {
    if (!examActive || !activeQuestions.length) return;
    const qData = activeQuestions[currentQIndex];
    const selectedVal = userSelections[currentQIndex];
    const optionsHtml = qData.options.map(opt => `
      <div class="option-item">
        <label style="display: flex; align-items: center; cursor: pointer;">
          <input type="radio" name="dynamicRadio" value="${escapeHtml(opt)}" 
            onchange="updateAnswer(${currentQIndex}, '${escapeHtml(opt).replace(/'/g, "\\'")}')"
            ${selectedVal === opt ? 'checked' : ''}>
          <span>${escapeHtml(opt)}</span>
        </label>
      </div>
    `).join('');
    qContainer.innerHTML = `
      <div class="glass-card">
        <div class="flex-between" style="margin-bottom: 1rem;">
          <span class="progress-badge">📌 ${currentQIndex+1}/${activeQuestions.length}</span>
          <span class="progress-badge">⚡ Lex war cbt </span>
        </div>
        <p style="font-size: 1.3rem; font-weight: 500; margin-bottom: 1.2rem;">${escapeHtml(qData.q)}</p>
        <div>${optionsHtml}</div>
      </div>
    `;
  }

  function escapeHtml(str) { return str?.replace(/[&<>]/g, function(m) { return m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;'; }) || ''; }

  window.updateAnswer = function(qIdx, ans) { if (examActive && qIdx >= 0 && qIdx < activeQuestions.length) userSelections[qIdx] = ans; };
  window.changeQuestion = function(delta) { if (examActive) { let n = currentQIndex + delta; if (n >= 0 && n < activeQuestions.length) { currentQIndex = n; renderCurrentQuestion(); } } };

  // MODAL CONTROLS
  function showConfirmModal() { if (confirmModal) confirmModal.classList.add('active'); }
  function hideConfirmModal() { if (confirmModal) confirmModal.classList.remove('active'); }
  function showScoreModal(scoreText, percent) { 
    document.getElementById('finalScoreDisplay').innerText = scoreText;
    document.getElementById('finalPercentDisplay').innerHTML = `${percent}% • ${scoreText.split('/')[0]} correct`;
    if (scoreModal) scoreModal.classList.add('active');
  }
  function hideScoreModal() { if (scoreModal) scoreModal.classList.remove('active'); }

  window.requestSubmitConfirmation = function() {
    if (!examActive) return;
    showConfirmModal();
  };

  // actual submit logic (saves and shows score modal)
  function finalizeExamAndShowScore(auto = false) {
    if (!examActive || isFinalizing) return;
    isFinalizing = true;
    stopTimer();
    let correctCount = 0;
    const detailed = userSelections.map((ans, idx) => {
      const isCor = (ans === activeQuestions[idx].answer);
      if (isCor) correctCount++;
      return { question: activeQuestions[idx].q, userAnswer: ans || "(no answer)", correctAnswer: activeQuestions[idx].answer, isCorrect: isCor };
    });
    const total = activeQuestions.length;
    const percent = Math.round((correctCount / total) * 100);
    const scoreDisplay = `${correctCount}/${total}`;
    // save to localStorage
    let history = JSON.parse(localStorage.getItem('juris_history') || '[]');
    history.unshift({ id: Date.now(), date: new Date().toLocaleString(), rawScore: correctCount, total, scorePercent: percent, scoreDisplay, details: detailed });
    if (history.length > 25) history.pop();
    localStorage.setItem('juris_history', JSON.stringify(history));
    examActive = false;
    isFinalizing = false;
    // show score modal instead of alert
    showScoreModal(scoreDisplay, percent);
    // after modal closed, navigate to history if needed (but modal handles okay)
    navigateTo('corrections');
    renderHistoryLog();
  }

  // confirm submission from modal
  document.getElementById('confirmSubmitBtn')?.addEventListener('click', () => {
    if (!examActive) { hideConfirmModal(); return; }
    hideConfirmModal();
    finalizeExamAndShowScore(false);
  });
  document.getElementById('cancelSubmitBtn')?.addEventListener('click', () => { hideConfirmModal(); });
  document.getElementById('closeScoreBtn')?.addEventListener('click', () => { hideScoreModal(); });

  function autoSubmitDueToTime() {
    if (examActive && !isFinalizing) {
      // directly compute and show modal without confirmation
      if (!examActive) return;
      isFinalizing = true;
      stopTimer();
      let correctCount = 0;
      const detailed = userSelections.map((ans, idx) => {
        const isCor = (ans === activeQuestions[idx].answer);
        if (isCor) correctCount++;
        return { question: activeQuestions[idx].q, userAnswer: ans || "(no answer)", correctAnswer: activeQuestions[idx].answer, isCorrect: isCor };
      });
      const total = activeQuestions.length;
      const percent = Math.round((correctCount / total) * 100);
      const scoreDisplay = `${correctCount}/${total}`;
      let history = JSON.parse(localStorage.getItem('juris_history') || '[]');
      history.unshift({ id: Date.now(), date: new Date().toLocaleString(), rawScore: correctCount, total, scorePercent: percent, scoreDisplay, details: detailed });
      localStorage.setItem('juris_history', JSON.stringify(history));
      examActive = false;
      isFinalizing = false;
      showScoreModal(scoreDisplay, percent);
      navigateTo('corrections');
      renderHistoryLog();
    }
  }

  function resetExamEnvironment() {
    if (timerInterval) stopTimer();
    activeQuestions = [];
    userSelections = [];
    currentQIndex = 0;
    secondsLeft = 30 * 60;
    updateTimerUI();
    isFinalizing = false;
    examActive = false;
  }

  window.initiateTest = function() {
    if (examActive) {
      if (confirm("Another exam in progress. Resetting will lose progress. Continue?")) resetExamEnvironment();
      else return;
    } else resetExamEnvironment();
    activeQuestions = buildShuffledExamSet();
    userSelections = new Array(activeQuestions.length).fill(null);
    currentQIndex = 0;
    examActive = true;
    startTimer();
    navigateTo('cbt');
    renderCurrentQuestion();
  };

  function renderHistoryLog() {
    const histDiv = document.getElementById('historyList');
    const stored = JSON.parse(localStorage.getItem('juris_history') || '[]');
    if (!stored.length) { histDiv.innerHTML = `<div style="text-align:center;">✨ No previous attempts. Start an exam.</div>`; return; }
    histDiv.innerHTML = stored.map((e, idx) => `
      <div class="glass-card history-item">
        <div class="flex-between"><strong>📅 ${e.date}</strong><span style="color:${e.rawScore>=3?'#0ff':'#ff8888'}">⭐ ${e.scoreDisplay} (${e.scorePercent}%)</span></div>
        ${e.details.map((d,i)=>`<div style="border-left:3px solid ${d.isCorrect?'#0ff':'#f66'}; margin:0.7rem 0; padding-left:0.8rem;"><small><strong>Q${i+1}:</strong> ${escapeHtml(d.question)}<br>📌 Your: ${escapeHtml(d.userAnswer)} | ✅ ${escapeHtml(d.correctAnswer)}</small></div>`).join('')}
        <button class="modal-btn cancel" style="margin-top:0.5rem; padding:0.3rem 1rem;" onclick="deleteHistoryEntry(${idx})">🗑️ Delete</button>
      </div>
    `).join('');
  }
  window.deleteHistoryEntry = function(idx) { let h = JSON.parse(localStorage.getItem('juris_history')||'[]'); if(idx>=0 && idx<h.length){ h.splice(idx,1); localStorage.setItem('juris_history',JSON.stringify(h)); renderHistoryLog(); } };

  function buildFlashcards() {
    const flashDiv = document.getElementById('flashcardArea');
    flashDiv.innerHTML = ORIGINAL_QUESTION_SET.map(q => `
      <div class="flashcard-3d"><div class="flip-inner"><div class="front-face">❓ ${escapeHtml(q.q)}</div><div class="back-face">🔮 ${escapeHtml(q.answer)}</div></div></div>
    `).join('');
  }

  window.navigateTo = function(view) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('cbt').style.display = 'none';
    document.getElementById('corrections').style.display = 'none';
    document.getElementById('flashcards').style.display = 'none';
    document.getElementById(view).style.display = 'block';
    if (view === 'cbt') {
      if (!examActive || activeQuestions.length===0) {
        qContainer.innerHTML = `<div class="glass-card" style="text-align:center;"><span>⚡</span><h3>No active exam</h3><button class="btn-primary" onclick="initiateTest()">Start New Exam</button></div>`;
        document.getElementById('prevBtn').style.opacity = '0.5';
        document.getElementById('nextBtn').style.opacity = '0.5';
        document.getElementById('finalSubmitBtn').style.opacity = '0.5';
      } else { renderCurrentQuestion(); 
        document.getElementById('prevBtn').style.opacity = '1';
        document.getElementById('nextBtn').style.opacity = '1';
        document.getElementById('finalSubmitBtn').style.opacity = '1';
      }
    } else if (view === 'corrections') renderHistoryLog();
    else if (view === 'flashcards') buildFlashcards();
  };

  // initial load
  (function() {
    resetExamEnvironment();
    navigateTo('home');
    renderHistoryLog();
    buildFlashcards();
  })();
