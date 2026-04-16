(function () {
  'use strict';

  /* ============================================
     DATA
     ============================================ */
  const skills = [
    { name: 'SQL Server', category: 'Database', icon: 'fas fa-database', color: '#CC2927' },
    { name: 'MySQL', category: 'Database', icon: 'fas fa-database', color: '#4479A1' },
    { name: 'Python', category: 'Language', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'Pandas', category: 'Python', icon: 'fas fa-table', color: '#150458' },
    { name: 'NumPy', category: 'Python', icon: 'fas fa-calculator', color: '#4DABCF' },
    { name: 'Power BI', category: 'BI Tool', icon: 'fas fa-chart-pie', color: '#F2C811' },
    { name: 'Looker Studio', category: 'BI Tool', icon: 'fas fa-chart-area', color: '#4285F4' },
    { name: 'Tableau', category: 'BI Tool', icon: 'fas fa-chart-bar', color: '#E97627' },
    { name: 'Excel', category: 'Spreadsheet', icon: 'fas fa-file-excel', color: '#217346' },
    { name: 'Google Sheets', category: 'Spreadsheet', icon: 'fas fa-table', color: '#0F9D58' },
    { name: 'ETL Pipelines', category: 'Data Eng', icon: 'fas fa-exchange-alt', color: '#F97316' },
    { name: 'Databricks', category: 'Platform', icon: 'fas fa-fire', color: '#FF3621' },
    { name: 'Azure', category: 'Cloud', icon: 'fab fa-microsoft', color: '#0078D4' },
    { name: 'Git', category: 'DevOps', icon: 'fab fa-git-alt', color: '#F05032' },
  ];

  const projects = [
    {
      title: 'Manufacturing Operations Dashboard',
      tags: ['Power BI', 'DAX', 'SQL'],
      desc: 'Multi-source KPI dashboard for production, inventory & quality tracking. Improved ops visibility by 30%.',
      icon: 'fas fa-industry',
      link: 'https://github.com/Elango090602/Manufracturing-Executive-Dashboard',
    },
    {
      title: 'ERP to WordPress Data Migration',
      tags: ['SQL Server', 'MySQL', 'ETL'],
      desc: 'End-to-end data mapping, ER diagrams, and post-migration validation for enterprise client.',
      icon: 'fas fa-exchange-alt',
      link: 'https://github.com/Elango090602/SQL-Data-Analysis',
    },
    {
      title: 'Automated Data Pipeline',
      tags: ['Python', 'Pandas', 'SQL'],
      desc: 'ETL pipeline using Pandas to extract, clean, transform and load raw data. Eliminated manual reporting.',
      icon: 'fas fa-cogs',
      link: 'https://github.com/Elango090602/Multi-source-ETL-pipeline',
    },
    {
      title: 'GoodCabs Performance Analysis',
      tags: ['SQL', 'Power BI', 'Analytics'],
      desc: 'Cohort & trip trend analysis on ride data to evaluate tier-2 city performance and retention patterns.',
      icon: 'fas fa-car',
      link: 'https://github.com/Elango090602/Transportation-Operations-Analytics-Dashboard',
    },
  ];

  /* ============================================
     THEME TOGGLE
     ============================================ */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ============================================
     HERO CANVAS — PARTICLE GRID
     ============================================ */
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let heroAnimId;
  let mouseX = -500;
  let mouseY = -500;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  let particleColor = '255, 255, 255'; // white for dark mode

  function updateParticleColor() {
    const theme = root.getAttribute('data-theme');
    particleColor = theme === 'light' ? '20, 20, 30' : '255, 255, 255';
  }
  updateParticleColor();

  // Listen for theme changes
  const particleThemeObs = new MutationObserver(updateParticleColor);
  particleThemeObs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.baseOpacity = this.opacity;
      this.twinkleSpeed = Math.random() * 0.015 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Twinkling effect like stars
      this.twinklePhase += this.twinkleSpeed;
      this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.2;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        this.x -= dx * 0.012;
        this.y -= dy * 0.012;
        this.opacity = Math.min(this.opacity + 0.02, 1);
      }

      if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 180);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawGrid() {
    // No grid — clean black galaxy background
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${particleColor}, ${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.3;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateHeroCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    heroAnimId = requestAnimationFrame(animateHeroCanvas);
  }

  resizeCanvas();
  initParticles();
  animateHeroCanvas();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Pause canvas when hero is not in view
  const heroSection = document.getElementById('hero');
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(heroAnimId);
        } else {
          animateHeroCanvas();
        }
      });
    },
    { threshold: 0.05 }
  );
  heroObserver.observe(heroSection);

  /* ============================================
     HERO DASHBOARD — 3D TILT EFFECT
     ============================================ */
  const dashboard = document.getElementById('heroDashboard');
  const dashPerspective = document.getElementById('dashboardPerspective');

  if (dashboard && dashPerspective) {
    dashPerspective.addEventListener('mousemove', (e) => {
      const rect = dashPerspective.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((centerY - y) / centerY) * 6;

      dashboard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    dashPerspective.addEventListener('mouseleave', () => {
      dashboard.style.transform = 'rotateX(2deg) rotateY(-4deg) scale3d(1, 1, 1)';
    });
  }

  /* ============================================
     HERO DASHBOARD — INTERACTIVE CHARTS
     ============================================ */
  const quarterData = {
    q1: {
      bar: { labels: ['Jan', 'Feb', 'Mar'], revenue: [42, 58, 65], costs: [28, 35, 40] },
      kpi: { revenue: '$2.4M', users: '12.5K', growth: '+24%', revTrend: '12%', userTrend: '8%', growthTrend: '5%' },
      donut: [35, 28, 22, 15],
      line: [28, 35, 42, 38, 52, 48, 58],
      sparkValue: '↑ 18.2%'
    },
    q2: {
      bar: { labels: ['Apr', 'May', 'Jun'], revenue: [55, 72, 68], costs: [32, 42, 38] },
      kpi: { revenue: '$3.1M', users: '15.8K', growth: '+31%', revTrend: '18%', userTrend: '12%', growthTrend: '7%' },
      donut: [30, 32, 20, 18],
      line: [38, 45, 52, 48, 62, 55, 68],
      sparkValue: '↑ 24.5%'
    },
    q3: {
      bar: { labels: ['Jul', 'Aug', 'Sep'], revenue: [62, 78, 85], costs: [35, 45, 48] },
      kpi: { revenue: '$3.8M', users: '18.2K', growth: '+28%', revTrend: '22%', userTrend: '15%', growthTrend: '8%' },
      donut: [28, 35, 18, 19],
      line: [48, 55, 62, 58, 72, 68, 78],
      sparkValue: '↑ 21.3%'
    },
    q4: {
      bar: { labels: ['Oct', 'Nov', 'Dec'], revenue: [75, 92, 105], costs: [42, 52, 58] },
      kpi: { revenue: '$4.5M', users: '22.1K', growth: '+35%', revTrend: '28%', userTrend: '18%', growthTrend: '10%' },
      donut: [32, 30, 22, 16],
      line: [58, 68, 75, 72, 85, 82, 92],
      sparkValue: '↑ 29.8%'
    }
  };

  // Dashboard chart shared options
  const dashChartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, tooltip: {
        backgroundColor: 'rgba(9,9,15,0.9)',
        titleFont: { family: "'Space Grotesk', sans-serif", size: 11 },
        bodyFont: { family: "'DM Sans', sans-serif", size: 11 },
        cornerRadius: 8,
        padding: 10,
        borderColor: 'rgba(245,158,11,0.2)',
        borderWidth: 1
      }
    },
  };

  // --- Bar Chart ---
  const barCtx = document.getElementById('dashBarChart');
  let dashBarChart = null;
  if (barCtx) {
    dashBarChart = new Chart(barCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: quarterData.q1.bar.labels,
        datasets: [
          {
            label: 'Revenue',
            data: quarterData.q1.bar.revenue,
            backgroundColor: 'rgba(245, 158, 11, 0.7)',
            borderColor: '#F59E0B',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Costs',
            data: quarterData.q1.bar.costs,
            backgroundColor: 'rgba(249, 115, 22, 0.5)',
            borderColor: '#F97316',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      },
      options: {
        ...dashChartDefaults,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#5E5C6E', font: { family: "'Space Mono', monospace", size: 9 } },
            border: { display: false }
          },
          y: {
            grid: { color: 'rgba(245,158,11,0.04)', lineWidth: 1 },
            ticks: { display: false },
            border: { display: false }
          }
        }
      }
    });
  }

  // --- Donut Chart ---
  const donutCtx = document.getElementById('dashDonutChart');
  let dashDonutChart = null;
  if (donutCtx) {
    dashDonutChart = new Chart(donutCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Organic', 'Referral', 'Social'],
        datasets: [{
          data: quarterData.q1.donut,
          backgroundColor: ['#F59E0B', '#F97316', '#FBBF24', '#EF4444'],
          borderWidth: 0,
          hoverOffset: 6,
          spacing: 2,
        }]
      },
      options: {
        ...dashChartDefaults,
        cutout: '68%',
        plugins: {
          ...dashChartDefaults.plugins,
          tooltip: {
            ...dashChartDefaults.plugins.tooltip,
            callbacks: {
              label: function (ctx) {
                return ' ' + ctx.label + ': ' + ctx.raw + '%';
              }
            }
          }
        }
      }
    });
  }

  // --- Line / Sparkline Chart ---
  const lineCtx = document.getElementById('dashLineChart');
  let dashLineChart = null;
  if (lineCtx) {
    dashLineChart = new Chart(lineCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        datasets: [{
          data: quarterData.q1.line,
          borderColor: '#F59E0B',
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return 'rgba(245,158,11,0.1)';
            const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
            gradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)');
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#F59E0B',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }]
      },
      options: {
        ...dashChartDefaults,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#5E5C6E', font: { family: "'Space Mono', monospace", size: 8 } },
            border: { display: false }
          },
          y: {
            grid: { color: 'rgba(245,158,11,0.03)' },
            ticks: { display: false },
            border: { display: false }
          }
        }
      }
    });
  }

  /* ============================================
     HERO DASHBOARD — FILTER INTERACTIVITY
     ============================================ */
  document.querySelectorAll('.dash-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.dash-filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const q = btn.dataset.quarter;
      const data = quarterData[q];
      if (!data) return;

      // Animate KPI values
      const kpiRevEl = document.getElementById('kpiRevenue');
      const kpiUserEl = document.getElementById('kpiUsers');
      const kpiGrowthEl = document.getElementById('kpiGrowth');
      const kpiRevTrendEl = document.getElementById('kpiRevTrend');
      const kpiUserTrendEl = document.getElementById('kpiUserTrend');
      const kpiGrowthTrendEl = document.getElementById('kpiGrowthTrend');
      const sparkValueEl = document.getElementById('dashSparkValue');

      // Quick flash animation
      [kpiRevEl, kpiUserEl, kpiGrowthEl].forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-4px)';
        setTimeout(() => {
          el.style.transition = 'all 0.3s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 120);
      });

      setTimeout(() => {
        if (kpiRevEl) kpiRevEl.textContent = data.kpi.revenue;
        if (kpiUserEl) kpiUserEl.textContent = data.kpi.users;
        if (kpiGrowthEl) kpiGrowthEl.textContent = data.kpi.growth;
        if (kpiRevTrendEl) kpiRevTrendEl.innerHTML = '<i class="fas fa-arrow-up"></i> ' + data.kpi.revTrend;
        if (kpiUserTrendEl) kpiUserTrendEl.innerHTML = '<i class="fas fa-arrow-up"></i> ' + data.kpi.userTrend;
        if (kpiGrowthTrendEl) kpiGrowthTrendEl.innerHTML = '<i class="fas fa-arrow-up"></i> ' + data.kpi.growthTrend;
        if (sparkValueEl) sparkValueEl.textContent = data.sparkValue;
      }, 100);

      // Update Bar Chart
      if (dashBarChart) {
        dashBarChart.data.labels = data.bar.labels;
        dashBarChart.data.datasets[0].data = data.bar.revenue;
        dashBarChart.data.datasets[1].data = data.bar.costs;
        dashBarChart.update('active');
      }

      // Update Donut Chart
      if (dashDonutChart) {
        dashDonutChart.data.datasets[0].data = data.donut;
        dashDonutChart.update('active');
      }

      // Update Line Chart
      if (dashLineChart) {
        dashLineChart.data.datasets[0].data = data.line;
        dashLineChart.update('active');
      }
    });
  });

  /* ============================================
     TYPEWRITER
     ============================================ */
  const titles = ['Data Analyst', 'BI Developer', 'SQL Expert', 'Power BI Specialist'];
  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeEl = document.getElementById('typewriterText');

  function typewrite() {
    const current = titles[titleIdx];
    if (isDeleting) {
      typeEl.textContent = current.substring(0, charIdx--);
    } else {
      typeEl.textContent = current.substring(0, charIdx++);
    }

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === current.length + 1) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      speed = 400;
    }
    setTimeout(typewrite, speed);
  }

  typewrite();

  /* ============================================
     NAVBAR — scroll behavior & active link
     ============================================ */
  const navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 130;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.navbar-nav a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.navbar-nav .nav-link').forEach((a) => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.getElementById('navbarContent');
      if (collapse.classList.contains('show')) {
        toggler.click();
      }
    });
  });

  /* ============================================
     RENDER SKILLS GRID
     ============================================ */
  const skillsGrid = document.getElementById('skillsGrid');

  skills.forEach((skill, i) => {
    const col = document.createElement('div');
    col.className = 'col';

    const card = document.createElement('div');
    card.className = `skill-card glass-card reveal stagger-${i + 1}`;
    card.innerHTML = `
      <span class="skill-icon-wrap" style="color:${skill.color}"><i class="${skill.icon}"></i></span>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-category">${skill.category}</div>
    `;
    col.appendChild(card);
    skillsGrid.appendChild(col);
  });

  /* ============================================
     RENDER PROJECTS
     ============================================ */
  const projectsGrid = document.getElementById('projectsGrid');

  projects.forEach((project, i) => {
    const col = document.createElement('div');
    col.className = 'col-lg-6';

    const card = document.createElement('a');
    card.href = project.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = `project-card glass-card reveal stagger-${i + 1}`;
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';
    card.innerHTML = `
      <div class="project-card-inner">
        <div class="project-icon-wrap"><i class="${project.icon}"></i></div>
        <h3>${project.title}</h3>
        <div class="project-tags">
          ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <p class="project-desc">${project.desc}</p>
        <div class="project-overlay">
          <span><i class="fab fa-github"></i> View on GitHub</span>
        </div>
      </div>
    `;
    col.appendChild(card);
    projectsGrid.appendChild(col);
  });

  /* ============================================
     CHART.JS — SKILLS RADAR
     ============================================ */
  const radarCtx = document.getElementById('skillsRadar').getContext('2d');

  function getChartColors() {
    const isDark = root.getAttribute('data-theme') !== 'light';
    return {
      bg: isDark ? 'rgba(245, 158, 11, 0.12)' : 'rgba(217, 119, 6, 0.1)',
      border: isDark ? 'rgba(245, 158, 11, 0.75)' : 'rgba(217, 119, 6, 0.8)',
      point: isDark ? '#FBBF24' : '#D97706',
      labels: isDark ? '#9896A8' : '#5A5873',
      grid: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    };
  }

  let chartColors = getChartColors();

  const radarChart = new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: ['SQL', 'Power BI', 'Python', 'Excel', 'ETL', 'Data Viz', 'Dashboards', 'Data Cleaning'],
      datasets: [
        {
          label: 'Skill Level',
          data: [92, 90, 78, 88, 80, 88, 92, 85],
          backgroundColor: chartColors.bg,
          borderColor: chartColors.border,
          pointBackgroundColor: chartColors.point,
          pointBorderColor: chartColors.point,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: chartColors.point,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { display: false, stepSize: 20 },
          grid: { color: chartColors.grid, lineWidth: 1 },
          angleLines: { color: chartColors.grid },
          pointLabels: {
            color: chartColors.labels,
            font: { family: "'Space Grotesk', sans-serif", size: 11, weight: '500' },
          },
        },
      },
    },
  });

  // Update chart colors on theme change
  const themeObs = new MutationObserver(() => {
    const c = getChartColors();
    radarChart.data.datasets[0].backgroundColor = c.bg;
    radarChart.data.datasets[0].borderColor = c.border;
    radarChart.data.datasets[0].pointBackgroundColor = c.point;
    radarChart.data.datasets[0].pointBorderColor = c.point;
    radarChart.data.datasets[0].pointHoverBorderColor = c.point;
    radarChart.options.scales.r.grid.color = c.grid;
    radarChart.options.scales.r.angleLines.color = c.grid;
    radarChart.options.scales.r.pointLabels.color = c.labels;
    radarChart.update();
  });

  themeObs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  /* ============================================
     ANIMATED STAT COUNTERS
     ============================================ */
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2200;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        counter.textContent = (target >= 1000 ? current.toLocaleString() : current) + '+';
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  aboutObserver.observe(document.getElementById('about'));

  /* ============================================
     SCROLL REVEAL — Bouncy Spring Animations
     ============================================ */
  function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const windowH = window.innerHeight;

    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const triggerPoint = windowH * 0.82; // trigger earlier
      if (top < triggerPoint) {
        el.classList.add('active');
      }
    });
  }

  // IntersectionObserver for buttery smooth reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Add dynamic stagger based on sibling index
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter(c =>
            c.classList.contains('reveal') ||
            c.classList.contains('reveal-left') ||
            c.classList.contains('reveal-right') ||
            c.classList.contains('reveal-scale')
          )
          : [];
        const idx = siblings.indexOf(el);
        if (idx > 0 && !el.style.transitionDelay) {
          el.style.transitionDelay = `${idx * 0.08}s`;
        }
        el.classList.add('active');
        revealObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
    revealObserver.observe(el);
  });

  window.addEventListener('scroll', handleScrollReveal, { passive: true });
  window.addEventListener('load', handleScrollReveal);

  /* ============================================
     PARALLAX ON SCROLL
     ============================================ */
  const parallaxEls = document.querySelectorAll('.parallax-el');
  const parallaxShapes = document.querySelectorAll('.parallax-shape');

  function handleParallax() {
    const scrollY = window.scrollY;

    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0.05;
      const direction = el.dataset.direction || 'y';
      const val = scrollY * speed;

      if (direction === 'y') {
        el.style.transform = `translateY(${val}px)`;
      } else if (direction === 'x') {
        el.style.transform = `translateX(${val}px)`;
      } else if (direction === 'rotate') {
        el.style.transform = `rotate(${val}deg)`;
      } else if (direction === 'xy') {
        el.style.transform = `translate(${val * 0.5}px, ${val}px)`;
      }
    });

    parallaxShapes.forEach((shape) => {
      const speed = parseFloat(shape.dataset.speed) || 0.08;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  /* ============================================
     SMOOTH SCROLL PROGRESS (navbar underline)
     ============================================ */

  /* ============================================
     CONTACT FORM — Web3Forms Email Sender
     ============================================ */
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formStatus = document.getElementById('formStatus');

  function showStatus(type, message) {
    formStatus.style.display = 'block';
    formStatus.className = `form-status form-status--${type}`;
    formStatus.innerHTML = message;
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showStatus('error', '<i class="fas fa-exclamation-circle"></i> Please fill in all fields.');
      return;
    }

    // Loading state
    const origHTML = formSubmitBtn.innerHTML;
    formSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formSubmitBtn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        showStatus('success', '<i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you soon.');
        contactForm.reset();
      } else {
        showStatus('error', '<i class="fas fa-times-circle"></i> ' + (data.message || 'Something went wrong. Please try again.'));
      }
    } catch (err) {
      showStatus('error', '<i class="fas fa-times-circle"></i> Network error. Please check your connection.');
    } finally {
      formSubmitBtn.innerHTML = origHTML;
      formSubmitBtn.disabled = false;
    }
  });
})();
