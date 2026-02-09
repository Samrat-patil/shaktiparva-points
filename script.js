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

function openModal(branch, breakdown) {
  document.getElementById("modal-title").innerText =
    `${branch} – Sport-wise Points`;

  const list = document.getElementById("modal-list");
  list.innerHTML = "";

  if (Object.keys(breakdown).length === 0) {
    list.innerHTML = "<li>No points yet</li>";
  } else {
    for (const sport in breakdown) {
      const li = document.createElement("li");
      li.innerText = `${sport}: ${breakdown[sport]}`;
      list.appendChild(li);
    }
  }

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
