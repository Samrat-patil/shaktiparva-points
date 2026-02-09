/* ========================================
   SHAKTIPARVA'26 Points Dashboard
   Enhanced JavaScript
   ======================================== */

const ALL_BRANCHES = [
  "CS", "ELEC", "ENTC", "INSTRU", "MECH",
  "MANU", "META", "CIVIL", "AI&ROBO"
];

const YEARS = [
  { key: "FY", title: "First Year (FY)", icon: "🎯" },
  { key: "SY", title: "Second Year (SY)", icon: "⚡" },
  { key: "TY", title: "Third Year (TY)", icon: "🔥" },
  { key: "LY", title: "Final Year (LY)", icon: "👑" }
];

const container = document.getElementById("tables-container");
const yearData = {};

// Initialize the dashboard
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

// Render all tables
function renderAllTables() {
  YEARS.forEach((y, index) => {
    setTimeout(() => {
      renderYearTable(y);
    }, index * 100); // Stagger table rendering
  });
  
  setTimeout(() => {
    renderTotalTable();
  }, YEARS.length * 100);
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

  const branchesToShow = year.key === 'LY' ? ALL_BRANCHES.filter(b => b !== 'AI&ROBO') : ALL_BRANCHES;

    branchesToShow.forEach((branch, index) => {
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
    
    // Add tooltip
    pointsCell.title = "Click to view breakdown";
    
    row.appendChild(branchCell);
    row.appendChild(pointsCell);
    tbody.appendChild(row);
  });

  wrapper.appendChild(table);
  container.appendChild(title);
  container.appendChild(wrapper);
  
  // Add animation delay based on order
  const currentIndex = YEARS.findIndex(y => y.key === year.key);
  wrapper.style.animationDelay = `${currentIndex * 0.1}s`;
}

// Render total table
function renderTotalTable() {
  const totals = {};

  ALL_BRANCHES.forEach(b => totals[b] = { total: 0, breakdown: {} });

  YEARS.forEach(y => {
    const data = yearData[y.key];
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

  // Sort branches by total points (descending)
  const sortedBranches = ALL_BRANCHES.slice().sort((a, b) => 
    totals[b].total - totals[a].total
  );

  sortedBranches.forEach((branch, index) => {
    const row = document.createElement("tr");
    row.style.animationDelay = `${index * 0.05}s`;
    
    const branchCell = document.createElement("td");
    branchCell.className = `branch-${branch.replace('&', '\\&')}`;
    
    // Add medal emoji for top 3
    const medals = ['🥇', '🥈', '🥉'];
    const medalEmoji = index < 3 ? medals[index] + ' ' : '';
    branchCell.innerHTML = `${medalEmoji}${branch}`;
    
    const pointsCell = document.createElement("td");
    pointsCell.className = "points";
    pointsCell.textContent = totals[branch].total;
    pointsCell.onclick = () => openModal(branch, totals[branch].breakdown, "Overall Total", true);
    
    // Add tooltip
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

// Open modal with breakdown
function openModal(branch, breakdown, yearTitle, isTotal = false) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");

  modalTitle.textContent = `${branch} – ${yearTitle}`;
  modalBody.innerHTML = "";

  if (!isTotal) {
    // Sport-wise breakdown
    if (Object.keys(breakdown).length === 0) {
      modalBody.innerHTML = "<p>No points earned yet</p>";
    } else {
      const ul = document.createElement("ul");
      
      // Sort sports by points (descending)
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
    // Year-wise breakdown
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
        
        // Sort sports by points (descending)
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
  
  // Add keyboard support
  document.addEventListener('keydown', handleModalKeydown);
}

// Close modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  
  // Remove keyboard listener
  document.removeEventListener('keydown', handleModalKeydown);
}

// Handle keyboard events for modal
function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

// Update stats overview
function updateStatsOverview() {
  let totalPoints = 0;
  const branchTotals = {};

  ALL_BRANCHES.forEach(branch => {
    let branchTotal = 0;
    YEARS.forEach(year => {
      const data = yearData[year.key];
      if (data[branch]) {
        branchTotal += data[branch].total;
      }
    });
    branchTotals[branch] = branchTotal;
    totalPoints += branchTotal;
  });

  // Sort branches by total points
  const sortedBranches = Object.entries(branchTotals)
    .sort((a, b) => b[1] - a[1]);

  // Update leader
  const leadingBranch = sortedBranches[0][0];
  const leadingPoints = sortedBranches[0][1];
  
  animateText('leading-branch', leadingBranch);
  setTimeout(() => {
    document.getElementById('leading-points').textContent = `${leadingPoints} pts`;
  }, 800);

  // Update top 3 list
  const top3List = document.getElementById('top-3-list');
  const medals = ['🥇', '🥈', '🥉'];
  
  setTimeout(() => {
    top3List.innerHTML = '';
    sortedBranches.slice(0, 3).forEach((branch, index) => {
      const item = document.createElement('div');
      item.className = 'top-3-item';
      item.innerHTML = `
        <span class="top-3-branch branch-${branch[0].replace('&', '\\&')}">
          ${medals[index]} ${branch[0]}
        </span>
        <span class="top-3-points">${branch[1]}</span>
      `;
      top3List.appendChild(item);
    });
  }, 1000);
}

// Animate number counting
function animateNumber(id, target) {
  const element = document.getElementById(id);
  const duration = 1000; // 1 second
  const steps = 30;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(current + increment, target);
    element.textContent = Math.round(current);

    if (step >= steps) {
      clearInterval(timer);
      element.textContent = target;
    }
  }, duration / steps);
}

// Animate text appearance
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

// Add scroll-triggered animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all table wrappers and section titles
  const elements = document.querySelectorAll('.table-wrapper, .section-title');
  elements.forEach(el => {
    observer.observe(el);
  });
}

// Add click outside modal to close
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

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Use requestAnimationFrame for animations
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Add parallax effect to background orbs
      const scrollY = window.scrollY;
      const orbs = document.querySelectorAll('.gradient-orb');
      
      orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
      
      ticking = false;
    });
    
    ticking = true;
  }
});

// Add easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Add disco mode!
  const style = document.createElement('style');
  style.textContent = `
    @keyframes disco {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    .main-container {
      animation: disco 2s linear infinite !important;
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    style.remove();
  }, 10000); // Stop after 10 seconds
  
  console.log('🎉 DISCO MODE ACTIVATED! 🎉');
}

// Console message
console.log('%cSHAKTIPARVA\'26 🏆', 'color: #FFD700; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(255,215,0,0.5);');
console.log('%cPoints Dashboard Enhanced Edition', 'color: #00E5FF; font-size: 14px;');
console.log('%cBuilt with ⚡ by Claude', 'color: #B388FF; font-size: 12px; font-style: italic;');
