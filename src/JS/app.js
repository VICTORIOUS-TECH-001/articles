  const siteData = {
            navItems: [
                { id: "home", label: "Home" },
                { id: "projects", label: "Cases" },
                { id: "books", label: "Books" },
                { id: "test", label: "Tests" },
                { id: "articles", label: "Articles" },
                { id: "exams", label: "Exams" },
                { id: "contact", label: "Contact" }
            ],
            home: {
                title: "VICTORIOUS TECH INSTITUTE",
                subtitle: "Where knowledge meets <span class='text-purple-400'>innovation</span> & <span class='text-sky-400'>vision</span>.",
                description: "Explore curated projects, published books, assessment tools, and scholarly articles. This portal is designed for researchers, educators, and lifelong learners.",
                buttons: [
                    { text: "✨ Discover Projects", action: "projects" },
                    { text: "📚 Exam Resources", action: "exams" }
                ]
            },
            projects: {
                title: "🚀 Research Projects",
                items: [
                    { title: "LAW", description: "Law and schools of Thoughts", link: "../law/law_projects.html", target: "_blank" }
                ]
            },
            books: {
                title: "📖 Authored Volumes",
                items: [
                    { title: "“legal theories”", description: "Exploring legal theory in digital age." },
                    { title: "“customary law”", description: "customary law in twenty first century." },
                    { title: "“Law and Tech”", description: "Moral frameworks for autonomous systems." }
                ]
            },
            test: {
                chapters: [
                    { title: "Chapter 1", instructions: "Instructions: 50 Questions | 30 Minutes", topics: ["Nature of Law", "Definition of Law", "Characteristics of Law", "Functions of Law", "Positive School", "Pure Theory of Law", "Natural Law School", "Historical School", "Sociological School", "Realist School", "Economic School"], link: "../law/Chapter_1.html" },
                    { title: "Chapter 2", instructions: "Instructions: 50 Questions | 30 Minutes", topics: ["Quasi-Representation", "Ceremonies", "Customary Law Appraisal", "Growth of Legal Profession", "Self-Taught Attorney Era", "Qualification for Practice"], link: "#" },
                    { title: "Chapter 3", instructions: "Instructions: 50 Questions | 30 Minutes", topics: ["Law and Order", "Law and Justice", "Law and Morality", "Law and State", "Law and Legitimacy", "Law and Sovereignty", "Law and Freedom", "Rule of Law", "Judiciary Independence"], link: "#" },
                    { title: "Chapter 4", instructions: "Instructions: 50 Questions | 30 Minutes", topics: ["Common Law", "Customary Law", "Civil Law", "Criminal & Civil Law", "Public & Private Law", "Substantive & Procedural", "Municipal & International", "Equity"], link: "#" },
                    { title: "Chapter 5", instructions: "Instructions: 50 Questions | 30 Minutes", topics: ["Need for Control", "Methods of Social Control", "Penal Technique", "Grievance-Remedial Tech", "Admin-Regulatory Tech", "Social Benefit Technique", "Constitutive Technique", "Fiscal Technique"], link: "#" },
                    { title: "Chapter 6", instructions: "Instructions: 50 Questions | 30 Minutes", topics: ["Dispute Resolution", "Adjudicatory Method", "Adversarial Method", "Inquisitorial Method", "Comparison of Models", "Adv. of Adversarial", "Disadv. of Adversarial", "Adv. of Inquisitorial", "Disadv. of Inquisitorial", "Non-adjudicatory Method", "Arbitration", "Customary Methods", "Negotiation", "Mediation", "Facilitation", "Conciliation", "Med-Arb", "Mini-trial", "Litigation"], link: "#" }
                ]
            },
            articles: {
                title: "✍️ Recent Publications",
                items: [
                    { text: "“Decentralized Credentials” – Journal of Academic Innovation, 2025" },
                    { text: "“Metaverse in Higher Ed” – Digital Learning Review" },
                    { text: "“Ethical Dimensions of AI Tutors” – Ethics & Tech Quarterly" }
                ]
            },
            exams: {
                title: "📝 Examination Center",
                description: "Comprehensive resources for high‑stakes assessments.",
                items: [
                    { badge: "NEW", title: "THEORY QUESTIONS", description: "Full-length Legal Method Exam", link: "../law/chapter-1.html", linkText: "Preview" },
                    { title: "Grading Rubrics", description: "Standardized evaluation metrics for essays with corrections." },
                    { title: "Past Papers", description: "Archive of UNN 2012–2025 Exam." }
                ]
            },
            contact: {
                title: "📬 Connect",
                email: "victoriustech54@gmail.com",
                phone: "+234 8136962956"
            },
            imageGallery: {
                images: [
                    "./src/images/PROJECT.png",
                    "./src/images/PROJECT.png",
                    "./src/images/PROJECT.png"
                ]
            },
            community: {
                title: "Connect with others",
                description: "Join our community to share insights and collaborate on projects.",
                socialIcons: ["fa-whatsapp", "fa-twitter", "fa-telegram", "fa-linkedin-square", "fa-facebook-square"],
                communityImage: "./src/images/community.png",
                footerText: "Stay updated with the latest news and events."
            }
        };

        // Helper function to render entire page from JSON
        function renderPage() {
            // Render navigation buttons
            const scrollNav = document.getElementById('scrollNav');
            scrollNav.innerHTML = siteData.navItems.map(item => 
                `<button onclick="openTab('${item.id}')" class="inline-flex border-none font-semibold text-sm md:text-base py-2 px-4 md:py-[0.6rem] md:px-[1.4rem] rounded-full whitespace-nowrap transition-all" data-tab="${item.id}">${item.label}</button>`
            ).join('');

            // Render main content container
            const appRoot = document.getElementById('app-root');
            
            // Build tabs HTML
            let tabsHtml = `
                <!-- HOME TAB -->
                <div id="home" class="tab-content active">
                    <div class="card-glow p-5 md:p-8 mb-8">
                        <h1>${siteData.home.title}</h1>
                        <p class="text-lg md:text-xl mt-2 mb-4">${siteData.home.subtitle}</p>
                        <p>${siteData.home.description}</p>
                        <div class="flex flex-wrap gap-4 mt-6">
                            ${siteData.home.buttons.map(btn => `<div class="btn-soft py-2 px-5 inline-block" onclick="openTab('${btn.action}')">${btn.text}</div>`).join('')}
                        </div>
                    </div>
                </div>

                <!-- PROJECTS TAB -->
                <div id="projects" class="tab-content">
                    <div class="card-glow p-5 md:p-8 mb-8">
                        <h2>${siteData.projects.title}</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            ${siteData.projects.items.map(item => `
                                <div class="grid-item">
                                    <a href="${item.link}" target="${item.target || '_self'}" class="no-underline">
                                        <h3 class="text-xl font-bold text-white">${item.title}</h3>
                                        <p class="text-white/90">${item.description}</p>
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- BOOKS TAB -->
                <div id="books" class="tab-content">
                    <div class="card-glow p-5 md:p-8 mb-8">
                        <h2>${siteData.books.title}</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            ${siteData.books.items.map(item => `
                                <div class="grid-item">
                                    <h3 class="font-bold text-xl">${item.title}</h3>
                                    <p>${item.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- TESTS TAB (Chapters) -->
                <div id="test" class="tab-content">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${siteData.test.chapters.map(ch => `
                            <div class="card p-6">
                                <h2 class="text-xl font-bold">${ch.title}</h2>
                                <div class="instructions p-2 text-center"><strong>${ch.instructions}</strong></div>
                                <ul class="list-disc pl-5 ${ch.topics.length > 15 ? 'columns-2 gap-3' : ''}">
                                    ${ch.topics.map(topic => `<li>${topic}</li>`).join('')}
                                </ul>
                                <a href="${ch.link}" class="btn">CLICK TO ENTER EXAM</a>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- ARTICLES TAB -->
                <div id="articles" class="tab-content">
                    <div class="card-glow p-5 md:p-8 mb-8">
                        <h2>${siteData.articles.title}</h2>
                        <ul class="list-none space-y-3 mt-4">
                            ${siteData.articles.items.map(item => `<li>🔹 <strong>${item.text}</strong></li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- EXAMS TAB -->
                <div id="exams" class="tab-content">
                    <div class="card-glow p-5 md:p-8 mb-8">
                        <h2>${siteData.exams.title}</h2>
                        <p class="mb-6">${siteData.exams.description}</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            ${siteData.exams.items.map(item => `
                                <div class="grid-item">
                                    ${item.badge ? `<span class="badge-exam">${item.badge}</span>` : ''}
                                    <h3 class="font-bold text-xl mt-2">${item.title}</h3>
                                    <p>${item.description}</p>
                                    ${item.link ? `<a href="${item.link}" target="_blank"><div class="btn-soft py-1.5 px-4 inline-block mt-2 text-sm">${item.linkText || 'Preview'}</div></a>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- CONTACT TAB -->
                <div id="contact" class="tab-content">
                    <div class="card-glow p-5 md:p-8 mb-8">
                        <h2>${siteData.contact.title}</h2>
                        <div class="contact-form space-y-4 mt-4">
                            <input type="text" id="contactName" placeholder="Your name" class="w-full py-3 px-4 rounded-2xl outline-none">
                            <input type="email" id="contactEmail" placeholder="Email address" class="w-full py-3 px-4 rounded-2xl outline-none">
                            <textarea rows="3" placeholder="Your message..." class="w-full py-3 px-4 rounded-2xl outline-none"></textarea>
                            <div class="btn-soft py-3 px-6 text-center inline-block bg-purple-600 border-none hover:bg-purple-700" onclick="alert('✨ Demo: message sent (simulated)')">Send Message</div>
                            <p class="text-sm mt-4">📧 ${siteData.contact.email} | 📞 ${siteData.contact.phone}</p>
                        </div>
                    </div>
                </div>
            `;

            // Add image galleries (two rows)
            tabsHtml += `<div class="cards flex flex-wrap justify-center gap-5 my-8 list-none">`;
            siteData.imageGallery.images.forEach(img => {
                tabsHtml += `<li><img src="${img}" alt="project" width="300" onerror="this.src='https://placehold.co/300x180?text=Project+Demo'"></li>`;
            });
            tabsHtml += `</div><div class="cards flex flex-wrap justify-center gap-5 my-8 list-none">`;
            siteData.imageGallery.images.forEach(img => {
                tabsHtml += `<li><img src="${img}" alt="project" width="300" onerror="this.src='https://placehold.co/300x180?text=Project+Demo'"></li>`;
            });
            tabsHtml += `</div>`;

            // Community Section
            tabsHtml += `
                <section class="mt-12 bg-[#192337]/55 backdrop-blur-md rounded-3xl p-6 md:p-8">
                    <h3 class="text-center text-2xl font-semibold">${siteData.community.title}</h3>
                    <p class="text-center">${siteData.community.description}</p>
                    <div class="flex justify-center my-5">
                        <img src="${siteData.community.communityImage}" alt="Community" class="max-w-full rounded-2xl" onerror="this.src='https://placehold.co/1000x300?text=Community+Hub'">
                    </div>
                    <ul class="flex justify-center gap-6 md:gap-10 flex-wrap text-sky-400 text-2xl list-none">
                        ${siteData.community.socialIcons.map(icon => `<li><i class="fa ${icon}"></i></li>`).join('')}
                    </ul>
                    <p class="text-center mt-6">${siteData.community.footerText}</p>
                </section>
            `;

            appRoot.innerHTML = tabsHtml;
        }

        // Word changer (preserved)
        const words = ["Cases", "Books", "Articles"];
        let currentIndex = 0;
        const wordElement = document.getElementById("word-changer");
        function startWordLoop() {
            setInterval(() => {
                wordElement.classList.add("fade");
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % words.length;
                    wordElement.textContent = words[currentIndex];
                    wordElement.classList.remove("fade");
                }, 500);
            }, 4000);
        }

        // openTab function (preserved logic)
        function openTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            const selectedTab = document.getElementById(tabName);
            if (selectedTab) selectedTab.classList.add('active');
            
            const allNavButtons = document.querySelectorAll('.scroll-nav button');
            allNavButtons.forEach(btn => {
                btn.classList.remove('active');
                let btnText = btn.innerText.trim().toLowerCase();
                if (btnText === tabName.toLowerCase() || (tabName === 'test' && btnText === 'tests')) {
                    btn.classList.add('active');
                }
            });
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.innerWidth <= 850) {
                const wrapper = document.getElementById('scrollNavWrapper');
                if (wrapper && wrapper.classList.contains('show-nav')) {
                    wrapper.classList.remove('show-nav');
                    document.getElementById('barsIcon').style.display = 'inline-block';
                    document.getElementById('closeIcon').style.display = 'none';
                }
            }
        }

        // Hamburger toggle (preserved)
        const hamburgerBtn = document.getElementById('hamburgerToggleBtn');
        const barsIcon = document.getElementById('barsIcon');
        const closeIcon = document.getElementById('closeIcon');
        const scrollNavWrapper = document.getElementById('scrollNavWrapper');
        
        function toggleMobileNav() {
            if (window.innerWidth <= 850) {
                const isVisible = scrollNavWrapper.classList.contains('show-nav');
                if (!isVisible) {
                    scrollNavWrapper.classList.add('show-nav');
                    barsIcon.style.display = 'none';
                    closeIcon.style.display = 'inline-block';
                } else {
                    scrollNavWrapper.classList.remove('show-nav');
                    barsIcon.style.display = 'inline-block';
                    closeIcon.style.display = 'none';
                }
            } else {
                scrollNavWrapper.classList.remove('show-nav');
                barsIcon.style.display = 'inline-block';
                closeIcon.style.display = 'none';
            }
        }
        
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMobileNav();
            });
        }
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 850) {
                scrollNavWrapper.classList.remove('show-nav');
                barsIcon.style.display = 'inline-block';
                closeIcon.style.display = 'none';
            } else {
                if (scrollNavWrapper.classList.contains('show-nav')) {
                    barsIcon.style.display = 'none';
                    closeIcon.style.display = 'inline-block';
                } else {
                    barsIcon.style.display = 'inline-block';
                    closeIcon.style.display = 'none';
                }
            }
            setStickyOffsets();
        });
        
        function setStickyOffsets() {
            const searchSticky = document.getElementById('stickySearchContainer');
            const nav = document.querySelector('.navi');
            if (searchSticky && nav) {
                nav.style.top = searchSticky.offsetHeight + 'px';
            }
        }
        
        // Search simulation (preserved)
        const searchInput = document.getElementById('globalSearchInput');
        const searchBtn = document.getElementById('searchBtn');
        function handleSearch() {
            let query = searchInput.value.trim();
            if (query) alert(`🔍 Searching for "${query}" (demo feature - full search integration available)`);
            else alert('Please enter a search term.');
        }
        if (searchBtn) searchBtn.addEventListener('click', handleSearch);
        if (searchInput) searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
        
        // Initialize page
        renderPage();
        startWordLoop();
        
        document.addEventListener('DOMContentLoaded', () => {
            // Set active class on initial active tab
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                const id = activeTab.getAttribute('id');
                document.querySelectorAll('.scroll-nav button').forEach(btn => {
                    let btnText = btn.innerText.trim().toLowerCase();
                    if (btnText === id.toLowerCase() || (id === 'test' && btnText === 'tests')) btn.classList.add('active');
                });
            }
            if (window.innerWidth <= 850) {
                scrollNavWrapper.classList.remove('show-nav');
                barsIcon.style.display = 'inline-block';
                closeIcon.style.display = 'none';
            }
            setStickyOffsets();
        });
        
        window.addEventListener('load', setStickyOffsets);
        window.addEventListener('resize', setStickyOffsets);