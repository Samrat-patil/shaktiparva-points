const ALL_BRANCHES = [
  "CS", "ELEC", "ENTC", "INSTRU","MECH",
   "MANU", "META",
  "CIVIL", "AI&ROBO"
];

const YEARS = [
  { key: "FY", title: "First Year (FY)" },
  { key: "SY", title: "Second Year (SY)" },
  { key: "TY", title: "Third Year (TY)" },
  { key: "LY", title: "Final Year" }
];

const container = document.getElementById("tables-container");
const yearData = {}; // store all year data

Promise.all(
  YEARS.map(y =>
    fetch(`data/${y.key}.json`)
      .then(r => r.json())
      .then(d => yearData[y.key] = d)
  )
).then(() => {
  YEARS.forEach(y => renderYearTable(y));
  renderTotalTable();
});

function renderYearTable(year) {
  const data = yearData[year.key];

  const title = document.createElement("div");
  title.className = "section-title";
  title.innerText = year.title;

  const table = document.createElement("table");
  table.innerHTML = `<tr><th>Branch</th><th>Points</th></tr>`;

  ALL_BRANCHES.forEach(branch => {
    const info = data[branch] || { total: 0, breakdown: {} };

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${branch}</td>
      <td class="points">${info.total}</td>
    `;

    row.querySelector(".points").onclick = () =>
      openModal(branch, info.breakdown);

    table.appendChild(row);
  });

  container.appendChild(title);
  container.appendChild(table);
}

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
  title.innerText = "Overall Total";

  const table = document.createElement("table");
  table.innerHTML = `<tr><th>Branch</th><th>Points</th></tr>`;

  ALL_BRANCHES.forEach(branch => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${branch}</td>
      <td class="points">${totals[branch].total}</td>
    `;

    row.querySelector(".points").onclick = () =>
      openModal(branch, totals[branch].breakdown);

    table.appendChild(row);
  });

  container.appendChild(title);
  container.appendChild(table);
}

// same ALL_BRANCHES, YEARS, yearData as before

function openModal(branch, breakdown, isTotal = false) {
  document.getElementById("modal-title").innerText =
    `${branch} – ${isTotal ? "Year-wise Breakdown" : "Sport-wise Breakdown"}`;

  const body = document.getElementById("modal-body");
  body.innerHTML = "";

  if (!isTotal) {
    if (Object.keys(breakdown).length === 0) {
      body.innerHTML = "<p>No points yet</p>";
    } else {
      const ul = document.createElement("ul");
      for (const sport in breakdown) {
        const li = document.createElement("li");
        li.innerText = `${sport}: ${breakdown[sport]}`;
        ul.appendChild(li);
      }
      body.appendChild(ul);
    }
  } else {
    YEARS.forEach(y => {
      const yearInfo = yearData[y.key][branch];
      const h3 = document.createElement("h3");
      h3.innerText = y.key;
      body.appendChild(h3);

      if (!yearInfo || Object.keys(yearInfo.breakdown).length === 0) {
        body.innerHTML += "<p>—</p>";
      } else {
        const ul = document.createElement("ul");
        for (const sport in yearInfo.breakdown) {
          const li = document.createElement("li");
          li.innerText = `${sport}: ${yearInfo.breakdown[sport]}`;
          ul.appendChild(li);
        }
        body.appendChild(ul);
      }
    });
  }

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
