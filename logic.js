function showItemsForProfession() {
  const prof = document.getElementById("professionSelect").value;
  const container = document.getElementById("itemContainer");
  container.innerHTML = "";

  ITEM_DATA.filter(i => i.Profession === prof).forEach(item => {
    const div = document.createElement("div");
    div.className = "item-card";
    div.innerHTML = `
      <h3>${item.Item}</h3>
      <p>Rarity: ${item.Rarity}</p>
      <p>${item.Materials}</p>
    `;
    container.appendChild(div);
  });
}
const RARITY_WEIGHTS = {
  Common: 1,
  Uncommon: 2,
  Rare: 4,
  Epic: 8,
  Legendary: 16
};

function renderRarityInputs(materials) {
  const container = document.getElementById("rarityInputs");
  container.innerHTML = "";

  materials.forEach((mat, index) => {
    const row = document.createElement("div");
    row.innerHTML = `
      <label>
        ${mat.Material} (${mat.Quantity})
        <select id="rarity-${index}">
          <option>Common</option>
          <option>Uncommon</option>
          <option>Rare</option>
          <option>Epic</option>
          <option>Legendary</option>
        </select>
      </label>
    `;
    container.appendChild(row);
  });
}

function calculateRarity() {
  let totalScore = 0;
  let maxScore = 0;

  CURRENT_MATERIALS.forEach((mat, index) => {
    const rarity = document.getElementById(`rarity-${index}`).value;
    totalScore += mat.Quantity * RARITY_WEIGHTS[rarity];
    maxScore += mat.Quantity * RARITY_WEIGHTS.Legendary;
  });

  const percent = (totalScore / maxScore) * 100;
  let outcome = "Common";

  if (percent >= 85) outcome = "Legendary";
  else if (percent >= 65) outcome = "Epic";
  else if (percent >= 45) outcome = "Rare";
  else if (percent >= 25) outcome = "Uncommon";

  document.getElementById("rarityResult").innerHTML =
    `Predicted Outcome: <strong>${outcome}</strong> (${percent.toFixed(1)}%)`;
}
