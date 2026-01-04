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
