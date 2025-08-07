const clientName = document.getElementById("clientName");
const invoiceDate = document.getElementById("invoiceDate");
const currencySelect = document.getElementById("currency");
const displayClient = document.getElementById("displayClient");
const displayDate = document.getElementById("displayDate");
const itemTableBody = document.getElementById("itemTableBody");
const grandTotal = document.getElementById("grandTotal");
const itemsContainer = document.getElementById("itemsContainer");

function formatCurrency(val) {
  const currency = currencySelect.value;
  return currency + parseFloat(val || 0).toFixed(2);
}

function updatePreview() {
  displayClient.textContent = clientName.value || "John Doe";
  displayDate.textContent = "Date: " + (invoiceDate.value || new Date().toLocaleDateString());

  let total = 0;
  itemTableBody.innerHTML = "";

  const rows = itemsContainer.querySelectorAll(".item-row");
  rows.forEach(row => {
    const name = row.querySelector(".item-name").value;
    const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
    const rate = parseFloat(row.querySelector(".item-rate").value) || 0;
    const amount = qty * rate;
    total += amount;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name}</td>
      <td>${qty}</td>
      <td>${formatCurrency(rate)}</td>
      <td>${formatCurrency(amount)}</td>
    `;
    itemTableBody.appendChild(tr);
  });

  grandTotal.textContent = formatCurrency(total);
}

function addItemRow() {
  const row = document.createElement("div");
  row.classList.add("item-row");
  row.innerHTML = `
    <input class="item-name" placeholder="Service name" />
    <input class="item-qty" type="number" placeholder="Qty" />
    <input class="item-rate" type="number" placeholder="Rate" />
  `;
  itemsContainer.appendChild(row);
  row.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", updatePreview);
  });
}

document.getElementById("addItem").addEventListener("click", addItemRow);
clientName.addEventListener("input", updatePreview);
invoiceDate.addEventListener("input", updatePreview);
currencySelect.addEventListener("change", updatePreview);
document.getElementById("downloadPDF").addEventListener("click", () => {
  html2pdf().from(document.getElementById("invoice")).save("invoice.pdf");
});

// Init
invoiceDate.value = new Date().toISOString().slice(0, 10);
addItemRow();
updatePreview();
