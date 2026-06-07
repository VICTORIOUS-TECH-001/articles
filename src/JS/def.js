const ORIGINAL_QUESTION_SET = [
  { q: "A legal philosopher argues that law is not an autonomous entity but a reflection of social policy. This perspective aligns most closely with which school of thought?", options: ["Legal Positivism", "Legal Realism", "Natural Law", "Formalism"], answer: "Legal Realism" },
{ q: "If a definition of law is 'a description of legal acts in operation,' it rejects which notion?", options: ["The social manifestation of law", "The reification of law as a static entity", "The functionality of legal processes", "The behavioral impact of norms"], answer: "The reification of law as a static entity" },
{ q: "The assertion that 'law is a means, not an end' implies that the validity of a legal system is primarily derived from:", options: ["Its internal logic", "Its instrumental efficacy", "Its historical lineage", "Its linguistic precision"], answer: "Its instrumental efficacy" },
{ q: "A 'universal definition' of law must be based on abstracted features. This process of abstraction requires ignoring:", options: ["Common patterns of behavior", "Idiosyncrasies of specific legal systems", "The normative force of rules", "The institutional nature of enforcement"], answer: "Idiosyncrasies of specific legal systems" },
{ q: "If law must 'keep pace with change,' the primary legal risk is:", options: ["Institutional paralysis", "Legislative overreach", "Judicial activism", "The ossification of precedent"], answer: "The ossification of precedent" },
{ q: "When law is defined as an 'expression of policy,' what is the primary indicator of its success?", options: ["Its moral clarity", "The achievement of specific social objectives", "The internal consistency of its statutes", "The speed of litigation"], answer: "The achievement of specific social objectives" },
{ q: "An 'institutionalized manner' of enforcement distinguishes 'law' from which other form of social ordering?", options: ["Social habit", "Customary etiquette", "Religious doctrine", "Morality"], answer: "Social habit" },
{ q: "The statement 'law is not an island' implies that legal analysis is essentially:", options: ["Interdisciplinary", "Autotelic", "Closed-system", "Empirically vacant"], answer: "Interdisciplinary" },
{ q: "A scholar claims that the study of law must focus on 'legal phenomena' rather than 'rules.' This indicates a shift from:", options: ["Normative to descriptive analysis", "Descriptive to normative analysis", "Formalist to naturalistic analysis", "Predictive to prescriptive analysis"], answer: "Normative to descriptive analysis" },
{ q: "If law is a 'conglomerate' of social processes, the primary challenge for legal taxonomy is:", options: ["Defining boundaries", "Identifying the sovereign", "Determining moral weight", "Quantifying justice"], answer: "Defining boundaries" },
{ q: "Legal systems in 'primitive' versus 'advanced' societies share what common functional necessity?", options: ["Formal institutions", "The regulation of social relations", "Complex codification", "Unified enforcement"], answer: "The regulation of social relations" },
{ q: "A definition of law that relies solely on institutional processes risks ignoring:", options: ["Substantive justice", "Procedural validity", "Administrative efficiency", "Enforcement mechanisms"], answer: "Substantive justice" },
{ q: "In the context of legal theory, 'manifestation of law in operation' refers to:", options: ["The legislative intent", "The practical application of norms", "The theoretical basis of the constitution", "The moral justification of the state"], answer: "The practical application of norms" },
{ q: "A law is passed to solve a specific market failure. This confirms that law serves as:", options: ["An ontological constant", "A teleological instrument", "An abstract ideal", "A normative barrier"], answer: "A teleological instrument" },
{ q: "If a definition of law cannot be universal, legal theory becomes:", options: ["Contextualist", "Universalist", "Absolute", "Mathematical"], answer: "Contextualist" },
{ q: "What does it mean for a definition of law to be 'a necessary step' but not an 'end'?", options: ["Definitions are inherently circular", "Legal theory is perpetual", "Law is constantly being redefined", "Definitions have no utility"], answer: "Legal theory is perpetual" },
{ q: "The 'abstracted features' of a legal system include which of the following?", options: ["The specific language of a statute", "The mechanism of social ordering", "The name of the monarch", "The color of the courtroom"], answer: "The mechanism of social ordering" },
{ q: "Which aspect of law is most likely to cause tension when the society undergoes rapid development?", options: ["The policy intent", "The institutional structure", "The formal rules", "The social goals"], answer: "The formal rules" },
{ q: "An enforcement mechanism is considered 'institutionalized' if it is:", options: ["Spontaneous", "Organized and predictable", "Rooted in individual whim", "Variable based on the mediator"], answer: "Organized and predictable" },
{ q: "If law 'regulates as necessary,' what determines the degree of regulation?", options: ["The state's desire for power", "The intensity of social conflict", "The economic output", "The moral consensus"], answer: "The intensity of social conflict" },
{ q: "A system of law that is entirely static fails to address:", options: ["The stability of relations", "The evolution of societal goals", "The enforcement of existing norms", "The definition of the state"], answer: "The evolution of societal goals" },
{ q: "In Jurisprudence, identifying 'law' requires distinguishing between:", options: ["Good and evil", "Regulation and spontaneity", "State and citizen", "Theory and practice"], answer: "Regulation and spontaneity" },
{ q: "The 'conglomerate' view of law suggests that law is:", options: ["Monolithic", "Heterogeneous", "Static", "Abstract"], answer: "Heterogeneous" },
{ q: "A policy-based view of law assumes that law is:", options: ["A reflection of the sovereign’s will", "An instrument for rational governance", "A system of religious morality", "A fixed set of natural principles"], answer: "An instrument for rational governance" },
{ q: "Why is an 'arbitrary' definition of law considered a failure in legal science?", options: ["It lacks empirical grounding", "It violates democratic principles", "It is too complex", "It ignores the judiciary"], answer: "It lacks empirical grounding" },
{ q: "The complexity of a legal system is typically proportional to:", options: ["The level of its social sophistication", "The strictness of its penalties", "The volume of its legislation", "The age of the civilization"], answer: "The level of its social sophistication" },
{ q: "If law is a 'description of facts,' it leans towards which approach?", options: ["Analytical Jurisprudence", "Sociological Jurisprudence", "Natural Law Theory", "Divine Law Theory"], answer: "Sociological Jurisprudence" },
{ q: "The primary 'goal' of law in this context is identified as:", options: ["Compliance", "Regulation of social relations", "Punishment", "Profit"], answer: "Regulation of social relations" },
{ q: "A system failing to 'institutionalize' enforcement would be categorized as:", options: ["A primitive state", "A failed state", "A non-legal system of social control", "A democracy"], answer: "A non-legal system of social control" },
{ q: "The 'necessity' of regulation implies that law is:", options: ["An arbitrary imposition", "A response to social friction", "An innate human instinct", "A purely material good"], answer: "A response to social friction" },
{ q: "Law is described as an expression of:", options: ["Power", "Policy", "Religion", "Market forces"], answer: "Policy" },
{ q: "Law is defined as a complex system of formal rules, principles, and:", options: ["Secrets", "Processes and activities", "Morals and ethics", "Dreams and visions"], answer: "Processes and activities" },
{ q: "A universal definition of law should NOT describe:", options: ["Abstracted features", "A particular legal system", "Social rules", "Legal processes"], answer: "A particular legal system" },
{ q: "Law must keep pace with:", options: ["The economy", "The courts", "Change", "The government"], answer: "Change" },
{ q: "According to the text, a definition of law is a description of:", options: ["Social facts", "Economic data", "Moral philosophy", "Historical myths"], answer: "Social facts" },
{ q: "Law is not an island in the midst of other:", options: ["Social phenomena", "Political parties", "Economic sectors", "Legal scholars"], answer: "Social phenomena" },
{ q: "Defining law is a necessary step for the exposition of its:", options: ["History and religion", "Nature, role and functions", "Financial cost", "Physical size"], answer: "Nature, role and functions" },
{ q: "Law is a means to achieve specific:", options: ["Goals", "Profits", "Fame", "Power"], answer: "Goals" },
{ q: "Defining law should not be what kind of exercise?", options: ["Logical", "Arbitrary", "Necessary", "Important"], answer: "Arbitrary" },
{ q: "What is mentioned as a potential stage of society?", options: ["Advanced or primitive", "Wealthy or poor", "Urban or rural", "Stable or unstable"], answer: "Advanced or primitive" },
{ q: "Law is enforced in what kind of manner?", options: ["Casual", "Institutionalized", "Variable", "Personalized"], answer: "Institutionalized" },
{ q: "A generally acceptable definition of law is based on knowledge of:", options: ["The elite only", "Different kinds of societies", "Legal philosophy only", "One specific culture"], answer: "Different kinds of societies" },
{ q: "The text states that law is a _______ not an end.", options: ["Goal", "System", "Means", "Fact"], answer: "Means" },
{ q: "Legal acts, processes, and activities constitute a manifestation of:", options: ["Power", "Law in operation", "Societal norms", "Public policy"], answer: "Law in operation" },
{ q: "Abstracted features are used to describe:", options: ["Any social rule, activity, or process", "The life of a judge", "The history of a war", "The price of goods"], answer: "Any social rule, activity, or process" },
{ q: "Policy decisions are geared towards the achievement of:", options: ["Specific objectives", "General wealth", "Political fame", "Social comfort"], answer: "Specific objectives" },
{ q: "What does the text say a definition cannot do?", options: ["Describe reality", "End the exposition of law", "Explain processes", "Use facts"], answer: "End the exposition of law" },
{ q: "What must one have to state a definition of law?", options: ["Adequate knowledge of social activities", "A law degree", "Political authority", "Economic power"], answer: "Adequate knowledge of social activities" },
{ q: "Law is aimed at the regulation of:", options: ["Social relations", "Financial markets", "Global trade", "Personal behavior"], answer: "Social relations" },
{ q: "The text emphasizes that a definition should depict:", options: ["Reality", "Theory", "Fantasy", "Idealism"], answer: "Reality" }
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
          <span class="progress-badge">⚡ Lex cbt war</span>
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
