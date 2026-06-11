 const modulesData = [
      {
        id: "sources",
        title: "Sources of Nigerian Law",
        icon: "fas fa-balance-scale",
        iconColor: "text-emerald-400",
        accent: "emerald",
        gradient: "from-emerald-700/30 to-emerald-900/10",
        border: "group-hover:border-emerald-500/60",
        content: {
          overview: "The Nigerian legal system derives its authority from multiple sources: primary [legislation, English law, customary law, case law, and judicial precedents.] and materials[treaties, foreign cases, and historical antecedents.]",
          keyPoints: [
            "Legislation (Acts, Statutes, Laws of the Federation)",
            "Constitution of the Federal Republic of Nigeria (Supreme law)",
            "English Law (Common Law, Equity, Statutes of general application 1900)",
            "Judicial Precedent / Stare Decisis doctrine",
            "International treaties and conventions domesticated"
          ],
          TestGuide: "Each test is to help activate your mental alertness. This is complete 70 MCQ to take in 25ms. Check the history to see corrections. VISIT the theory and pass questions to prepare right for your law EXAMS.",
          // UNIQUE PORTAL PER MODULE
          testPortal: "./source.html"          // Sources → source.html
        }
      },
      {
        id: "interpretation",
        title: "Interpretation of Statutes",
        icon: "fas fa-book-open",
        iconColor: "text-indigo-400",
        accent: "indigo",
        gradient: "from-indigo-700/30 to-indigo-900/10",
        border: "group-hover:border-indigo-500/60",
        content: {
          overview: "Statutory interpretation involves the judicial construction of legislative texts. Nigerian courts apply the literal rule, golden rule, mischief rule, and purposive approach to ascertain legislative intent.",
          keyPoints: [
            "Literal Rule: plain meaning (Abioye v. Yakubu)",
            "Golden Rule: modify absurd results (R v. Allen)",
            "Mischief Rule: identify defect in law (Heydon's Case)",
            "Purposive Approach: modern contextual meaning",
            "Internal aids: titles, preambles, schedules",
            "External aids: dictionaries, Hansard, law commission reports"
          ],
          TestGuide: "Master Heydon's Case principle. Learn the shift from literal to purposive in human rights cases. Practice with sample statutory provisions.",
          testPortal: "./animate.html"           // Interpretation → ratio.html
        }
      },
      {
        id: "briefwriting",
        title: "Brief Writing",
        icon: "fas fa-pen-fancy",
        iconColor: "text-amber-400",
        accent: "amber",
        gradient: "from-amber-700/30 to-amber-900/10",
        border: "group-hover:border-amber-500/60",
        content: {
          overview: "Legal briefs are formal written arguments submitted to a court. Master the structure: statement of facts, issues for determination, arguments, and conclusion. Clarity and persuasive authority define a strong brief.",
          keyPoints: [
            "Structure: Cover page, table of contents, list of authorities",
            "Statement of Facts: concise, neutral, relevant",
            "Issues for determination: derived from pleadings",
            "Arguments: Ratio decidendi, precedents, statutory provisions",
            "Conclusion and final relief sought",
            "Citations and formatting (Nigerian Supreme Court Practice Directions)"
          ],
          TestGuide: "Analyze sample briefs from the Supreme Court of Nigeria. Practice drafting a brief from a moot court problem. Focus on concise logical flow.",
          testPortal: "./animate.html"     // Brief writing → brief-test.html
        }
      },
      {
        id: "research",
        title: "Legal Research Methodology",
        icon: "fas fa-microscope",
        iconColor: "text-rose-400",
        accent: "rose",
        gradient: "from-rose-700/30 to-rose-900/10",
        border: "group-hover:border-rose-500/60",
        content: {
          overview: "Legal research is systematic investigation into legal principles and precedents. From primary sources to secondary commentaries, effective methodology ensures accurate arguments.",
          keyPoints: [
            "Primary vs Secondary authorities (binding vs persuasive)",
            "Doctrinal research (analysis of statutes and cases)",
            "Empirical legal research (socio-legal methods)",
            "Use of digital databases (Law Pavilion, Nigerian LII)",
            "Citation standards: OSCOLA, Nigerian Law Reports",
            "Research ethics and avoiding plagiarism"
          ],
          TestGuide: "Create a research plan for a constitutional issue. Learn to use Boolean search in legal databases. Review law journal articles for methodology.",
          testPortal: "./animate.html"
        }
      }
    ];

    let activeModule = null;
    const escapeHtml = (str) => String(str || '').replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
    // ----- GRID (cards) -----
    function renderGrid() {
      return `
        <div class="text-center mb-12 md:mb-16">
          <div class="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-medium mb-4 backdrop-blur-sm">📚 TEST</div>
          <h2 class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Click Each Topic and Take Assessment</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
          ${modulesData.map(mod => `
            <div class="card-hover group relative rounded-2xl overflow-hidden bg-gradient-to-br ${mod.gradient} border border-slate-800/80 hover:border-${mod.accent}-500/60 transition-all duration-300 cursor-pointer p-6 md:p-8 backdrop-blur-sm" data-module-id="${mod.id}">
              <div class="absolute top-0 right-0 w-32 h-32 bg-${mod.accent}-500/10 rounded-full blur-3xl -z-0"></div>
              <div class="relative z-2">
                <div class="w-14 h-14 rounded-xl bg-slate-800/80 flex items-center justify-center mb-5 border border-slate-700 group-hover:border-${mod.accent}-500/40 transition">
                  <i class="${mod.icon} ${mod.iconColor} text-3xl"></i>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-${mod.accent}-300 transition">${escapeHtml(mod.title)}</h3>
                <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6">${mod.id === 'sources' ? 'Hierarchy of laws, customary & English law impact.' : mod.id === 'interpretation' ? 'Rules, canons & judicial construction techniques.' : mod.id === 'briefwriting' ? 'Draft persuasive legal memoranda & appellate briefs.' : 'Systematic discovery of primary authority & methods.'}</p>
                <div class="flex items-center gap-2 text-${mod.accent}-400 font-semibold text-sm">
                  <span>Take test</span> <i class="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // ----- DETAIL VIEW (each module uses its own testPortal) -----
    function renderDetail(module) {
      if (!module) return renderGrid();
      const cont = module.content;
      const testHref = cont.testPortal || './animate.html';   // fallback

      return `
        <div class="detail-panel animate-fadeIn">
          <button id="backToGridBtn" class="group mb-6 md:mb-8 flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-all bg-slate-800/40 px-5 py-2 rounded-full border border-slate-700 backdrop-blur-sm">
            <i class="fas fa-arrow-left text-sm group-hover:-translate-x-1 transition"></i> Back to Test
          </button>
          <div class="backdrop-blur-custom rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
            <div class="relative h-32 md:h-48 bg-gradient-to-r ${module.gradient} flex items-center px-6 md:px-10">
              <div class="absolute right-0 bottom-0 opacity-20 text-8xl md:text-9xl"><i class="${module.icon}"></i></div>
              <div>
                <div class="inline-flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full text-sm backdrop-blur-sm mb-3"><i class="${module.icon} ${module.iconColor} text-sm"></i> <span class="capitalize">${module.id}</span></div>
                <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">${escapeHtml(module.title)}</h1>
              </div>
            </div>
            <div class="p-6 md:p-10 space-y-8">
              <!-- overview -->
              <div class="border-l-4 border-${module.accent}-500 pl-5">
                <p class="text-slate-200 text-base md:text-lg leading-relaxed">${escapeHtml(cont.overview)}</p>
              </div>
              <!-- key points -->
              <div>
                <div class="flex items-center gap-3 mb-5">
                  <i class="fas fa-list-check text-${module.accent}-400 text-xl"></i>
                  <h2 class="text-2xl font-bold">Key doctrines & elements</h2>
                </div>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${cont.keyPoints.map(p => `<li class="flex items-start gap-3 bg-slate-900/40 rounded-xl p-3 border border-slate-800"><i class="fas fa-check-circle text-${module.accent}-400 mt-0.5 text-sm"></i><span class="text-slate-200 text-sm md:text-base">${escapeHtml(p)}</span></li>`).join('')}
                </ul>
              </div>
              <!-- Test guide section -->
              <div class="bg-slate-900/60 rounded-2xl p-6 border border-${module.accent}-500/20">
                <div class="flex items-center gap-2 mb-3">
                  <i class="fas fa-graduation-cap text-${module.accent}-400"></i>
                  <h3 class="text-xl font-semibold">📖 Test guide & practical focus</h3>
                </div>
                <p class="text-slate-300 leading-relaxed">${escapeHtml(cont.TestGuide)}</p>
                <div class="mt-5 flex flex-wrap gap-3">
                  <a href="${cont.ReadingsUrl || './animate.html'}" class="inline-flex items-center gap-1 bg-${module.accent}-500/10 hover:bg-${module.accent}-500/20 transition-colors px-4 py-1.5 rounded-full text-xs font-medium">
                    <i class="far fa-file-alt"></i> Recommended readings
                  </a>
                  <a href="${cont.CasesUrl || './ratio.html'}" class="inline-flex items-center gap-1 bg-${module.accent}-500/10 hover:bg-${module.accent}-500/20 transition-colors px-4 py-1.5 rounded-full text-xs font-medium">
                    <i class="fas fa-gavel"></i> Landmark cases
                  </a>
                  <!-- UNIQUE TEST PORTAL per module -->
                  <a href="${testHref}" class="Start inline-flex items-center gap-1 bg-${module.accent}-500/10 hover:bg-${module.accent}-500/20 transition-colors px-4 py-1.5 rounded-full text-xs font-medium">
                    <i class="fas fa-rocket"></i> START TEST
                  </a>
                </div>
              </div>
              <div class="text-center text-slate-500 text-xs pt-3 border-t border-white/10">Victorious Tech Institute</div>
            </div>
          </div>
        </div>
      `;
    }

    // ----- RENDER ENGINE -----
    function renderApp() {
      const container = document.getElementById('modulesContainer');
      if (!container) return;
      if (activeModule) {
        container.innerHTML = renderDetail(activeModule);
        const backBtn = document.getElementById('backToGridBtn');
        if (backBtn) backBtn.addEventListener('click', () => { activeModule = null; renderApp(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      } else {
        container.innerHTML = renderGrid();
        modulesData.forEach(mod => {
          const card = document.querySelector(`.card-hover[data-module-id="${mod.id}"]`);
          if (card) {
            card.addEventListener('click', (e) => {
              e.stopPropagation();
              activeModule = mod;
              renderApp();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
          }
        });
      }
    }

    function resetToDashboard() {
      if (activeModule !== null) {
        activeModule = null;
        renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.addEventListener('load', () => {
      renderApp();
      const preloader = document.getElementById('preloader');
      if (preloader) {
        setTimeout(() => {
          preloader.classList.add('fade-out');
          setTimeout(() => { if(preloader) preloader.style.display = 'none'; }, 500);
        }, 1500);
      }
      const resetBtn = document.getElementById('resetModulesBtn');
      if (resetBtn) resetBtn.addEventListener('click', resetToDashboard);
    });

    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
    }