// GLOBAL STATE
let MATERIAL_GROUPS = [];

// RARITY WEIGHTS
const RARITY_WEIGHTS = {
  Common: 1,
  Uncommon: 2,
  Rare: 4,
  Epic: 8,
  Legendary: 16
};

// ADD NEW MATERIAL GROUP
function addMaterialGroup() {
  MATERIAL_GROUPS.push({ quantity: 1, rarity: "Common" });
  renderMaterialGroups();
}

// RENDER MATERIAL INPUTS
function renderMaterialGroups() {
  const container = document.getElementById("materialContainer");
  container.innerHTML = "";

  MATERIAL_GROUPS.forEach((mat, index) => {
    const div = document.createElement("div");
    div.className = "material-row";

    div.innerHTML = `
      <label>
        Quantity: <input type="number" id="qty-${index}" value="${mat.quantity}" min="1" style="width:60px">
        Rarity: 
        <select id="rarity-${index}">
          <option>Common</option>
          <opti
