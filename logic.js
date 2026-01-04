// ==============================
// GLOBAL STATE
// ==============================
let ITEM_DATA = [];
let CURRENT_MATERIALS = [];

// ==============================
// RARITY WEIGHTS (EXPONENTIAL)
// ==============================
const RARITY_WEIGHTS = {
  Common: 1,
  Uncommon: 2,
  Rare: 4,
  Epic: 8,
  Legendary: 16
};

// ==============================
// LOAD CSV DATA
// ==============================
fetch("data-template.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n");
    const headers = rows.shift().split(",");

    ITEM_DATA = rows.map(row => {
      const values = row.split(",");
      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = values[i].trim();
      });
      obj.Quantity = Number(obj.Quantity);
      return obj;
    });

    populateProfessionDropdown();
  });

// ==============================
// POPULATE PROFESSION DROPDOWN
// ==============================
function populateProfessionDropdown() {
  const select = document.getElementById("professionSelect");
  const professions = [...new Set(ITEM_DATA.map(i => i.Profession))];

  professions.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

// ==============================
// SHOW ITEMS FOR PROFESSION
// ==============================
function showItemsForProfession() {
  const prof = document.getElementById("professionSelect").value;
  const container = document.getElementById("itemContainer");
  container.innerHTML = "";

  if (!prof) return;

  const items = [...new Set(
    ITEM_DATA
      .filter(i => i.Profession === prof)
      .map(i => i.Item)
  )];

  items.forEach(itemName => {
    const card = document.createElement("div");
    card.className = "item-card";

    const materials = ITEM_DATA.filter(
      i => i.Profession === prof && i.Item === itemName
    );

    card.innerHTML = `
      <h3>${itemName}</h3>
      <p><strong>Materials Required:</strong></p>
      <ul>
        ${materials.map(m => `<li>${m.Material}: ${m.Quantity}</li>`).join(""
