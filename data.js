let ITEM_DATA = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("data-template.csv")
    .then(res => res.text())
    .then(text => parseCSV(text));
});

function parseCSV(text) {
  const lines = text.split("\n").slice(1);
  ITEM_DATA = lines.map(line => {
    const [Profession, Item, Rarity, Materials] = line.split(",");
    return { Profession, Item, Rarity, Materials };
  }).filter(i => i.Profession);

  populateProfessions();
}

function populateProfessions() {
  const select = document.getElementById("professionSelect");
  [...new Set(ITEM_DATA.map(i => i.Profession))].forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });

  select.addEventListener("change", showItemsForProfession);
}
