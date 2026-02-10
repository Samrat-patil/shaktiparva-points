

const ALL_BRANCHES = ["CS", "ELEC", "ENTC", "INSTRU", "MECH", "MANU", "META", "CIVIL", "AI&ROBO"];

const YEARS = [
  { key: "FY", title: "First Year (FY)", icon: "🎯" },
  { key: "SY", title: "Second Year (SY)", icon: "⚡" },
  { key: "TY", title: "Third Year (TY)", icon: "🔥" },
  { key: "LY", title: "Final Year (LY)", icon: "👑" }
];

const yearData = {};
const container = document.getElementById("tables-container");

// Initialize dashboard
Promise.all(
  YEARS.map(y =>
    fetch(`data/${y.key}.json`)
      .then(r => r.json())
      .then(d => yearData[y.key] = d)
      .catch(err => {
        console.error(`Error loading ${y.key}.json:`, err);
        yearData[y.key] = {};
      })
  )
).then(() => {
  renderAllTables();
  updateStatsOverview();
  addScrollAnimations();
});

// Render all tables with stagger
function renderAllTables() {
  YEARS.forEach((y, index) => {
    setTimeout(() => renderYearTable(y), index * 100);
  });
  
  setTimeout(renderTotalTable, YEARS.length * 100);
}

// Render year-specific table
function renderYearTable(year) {
  const data = yearData[year.key];

  const title = document.createElement("div");
  title.className = "section-title";
  title.innerHTML = `${year.icon} ${year.title}`;

  const wrapper = document.createElement("div");
  wrapper.className = "table-wrapper";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Branch</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  ALL_BRANCHES.forEach((branch, index) => {
    const info = data[branch] || { total: 0, breakdown: {} };

    const row = document.createElement("tr");
    row.style.animationDelay = `${index * 0.05}s`;
    
    const branchCell = document.createElement("td");
    branchCell.className = `branch-${branch.replace('&', '\\&')}`;
    branchCell.textContent = branch;
    
    const pointsCell = document.createElement("td");
    pointsCell.className = "points";
    pointsCell.textContent = info.total;
    pointsCell.onclick = () => openModal(branch, info.breakdown, year.title);
    pointsCell.title = "Click to view breakdown";
    
    row.appendChild(branchCell);
    row.appendChild(pointsCell);
    tbody.appendChild(row);
  });

  wrapper.appendChild(table);
  container.appendChild(title);
  container.appendChild(wrapper);
  
  const currentIndex = YEARS.findIndex(y => y.key === year.key);
  wrapper.style.animationDelay = `${currentIndex * 0.1}s`;
}

// Render total table
function renderTotalTable() {
  const totals = {};
  
  ALL_BRANCHES.forEach(branch => {
    totals[branch] = { total: 0, breakdown: {} };
  });

  YEARS.forEach(year => {
    const data = yearData[year.key];
    ALL_BRANCHES.forEach(branch => {
      if (data[branch]) {
        totals[branch].total += data[branch].total;

        for (const sport in data[branch].breakdown) {
          totals[branch].breakdown[sport] =
            (totals[branch].breakdown[sport] || 0) +
            data[branch].breakdown[sport];
        }
      }
    });
  });

  const title = document.createElement("div");
  title.className = "section-title";
  title.innerHTML = "🏆 Overall Total";

  const wrapper = document.createElement("div");
  wrapper.className = "table-wrapper";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Branch</th>
        <th>Total Points</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  const sortedBranches = ALL_BRANCHES.slice().sort((a, b) => 
    totals[b].total - totals[a].total
  );

  sortedBranches.forEach((branch, index) => {
    const row = document.createElement("tr");
    row.style.animationDelay = `${index * 0.05}s`;
    
    const branchCell = document.createElement("td");
    branchCell.className = `branch-${branch.replace('&', '\\&')}`;
    
    const medals = ['🥇', '🥈', '🥉'];
    const medalEmoji = index < 3 ? medals[index] + ' ' : '';
    branchCell.innerHTML = `${medalEmoji}${branch}`;
    
    const pointsCell = document.createElement("td");
    pointsCell.className = "points";
    pointsCell.textContent = totals[branch].total;
    pointsCell.onclick = () => openModal(branch, totals[branch].breakdown, "Overall Total", true);
    pointsCell.title = "Click to view year-wise breakdown";
    
    row.appendChild(branchCell);
    row.appendChild(pointsCell);
    tbody.appendChild(row);
  });

  wrapper.appendChild(table);
  container.appendChild(title);
  container.appendChild(wrapper);
  
  wrapper.style.animationDelay = `${YEARS.length * 0.1}s`;
}

// Modal functions
function openModal(branch, breakdown, yearTitle, isTotal = false) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  modalTitle.textContent = `${branch} – ${yearTitle}`;
  modalBody.innerHTML = "";

  if (!isTotal) {
    if (Object.keys(breakdown).length === 0) {
      modalBody.innerHTML = "<p>No points earned yet</p>";
    } else {
      const ul = document.createElement("ul");
      const sortedSports = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
      
      sortedSports.forEach(([sport, points], index) => {
        const li = document.createElement("li");
        li.style.animationDelay = `${index * 0.05}s`;
        li.innerHTML = `
          <span>${sport}</span>
          <span style="font-weight: 700; color: var(--primary-gold);">${points} pts</span>
        `;
        ul.appendChild(li);
      });
      
      modalBody.appendChild(ul);
    }
  } else {
    YEARS.forEach((y, index) => {
      const yearInfo = yearData[y.key][branch];
      
      const h3 = document.createElement("h3");
      h3.textContent = `${y.icon} ${y.key}`;
      h3.style.animationDelay = `${index * 0.1}s`;
      h3.style.animation = 'listItemSlide 0.3s ease forwards';
      h3.style.opacity = '0';
      modalBody.appendChild(h3);

      if (!yearInfo || Object.keys(yearInfo.breakdown).length === 0) {
        const p = document.createElement("p");
        p.textContent = "No points earned";
        modalBody.appendChild(p);
      } else {
        const ul = document.createElement("ul");
        const sortedSports = Object.entries(yearInfo.breakdown).sort((a, b) => b[1] - a[1]);
        
        sortedSports.forEach(([sport, points], sportIndex) => {
          const li = document.createElement("li");
          li.style.animationDelay = `${(index * 0.1) + (sportIndex * 0.05)}s`;
          li.innerHTML = `
            <span>${sport}</span>
            <span style="font-weight: 700; color: var(--primary-gold);">${points} pts</span>
          `;
          ul.appendChild(li);
        });
        
        modalBody.appendChild(ul);
      }
    });
  }

  modal.classList.remove("hidden");
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') closeModal();
}

// Update stats overview
function updateStatsOverview() {
  const branchTotals = {};

  ALL_BRANCHES.forEach(branch => {
    let branchTotal = 0;
    YEARS.forEach(year => {
      const data = yearData[year.key];
      if (data[branch]) branchTotal += data[branch].total;
    });
    branchTotals[branch] = branchTotal;
  });

  const sortedBranches = Object.entries(branchTotals).sort((a, b) => b[1] - a[1]);

  // Update leader
  const [leadingBranch, leadingPoints] = sortedBranches[0];
  
  animateText('leading-branch', leadingBranch);
  setTimeout(() => {
    document.getElementById('leading-points').textContent = `${leadingPoints} pts`;
  }, 800);

  // Update top 3
  const top3List = document.getElementById('top-3-list');
  const medals = ['🥇', '🥈', '🥉'];
  
  setTimeout(() => {
    top3List.innerHTML = '';
    sortedBranches.slice(0, 3).forEach(([branch, points], index) => {
      const item = document.createElement('div');
      item.className = 'top-3-item';
      item.innerHTML = `
        <span class="top-3-branch branch-${branch.replace('&', '\\&')}">
          ${medals[index]} ${branch}
        </span>
        <span class="top-3-points">${points}</span>
      `;
      top3List.appendChild(item);
    });
  }, 1000);
}

function animateText(id, text) {
  const element = document.getElementById(id);
  setTimeout(() => {
    element.textContent = text;
    element.style.animation = 'none';
    setTimeout(() => {
      element.style.animation = 'iconBounce 2s ease-in-out infinite';
    }, 10);
  }, 800);
}

// Scroll animations
function addScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.table-wrapper, .section-title').forEach(el => {
    observer.observe(el);
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  }
});

// Smooth scroll
document.documentElement.style.scrollBehavior = 'smooth';

// Parallax effect on scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// Console branding
console.log('%cSHAKTIPARVA\'26 🏆', 'color: #FFD700; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(255,215,0,0.5);');
console.log('%cPoints Dashboard', 'color: #00E5FF; font-size: 14px;');
