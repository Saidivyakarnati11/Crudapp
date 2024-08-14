var selectedRow = null;

function onFormSubmit(e) {
  event.preventDefault();
  var formData = readFormData();
  if (!formData.Product || !formData.Quantity || !formData.Price) {
    alert("Please fill all the fields");
    return;
  }
  if (selectedRow == null) {
    insertNewRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
  calculateTotal();
}

const productInput = document.getElementById('Product');
const productSelect = document.getElementById('productSelect');

productSelect.addEventListener('change', () => {
  productInput.value = productSelect.value;
  productSelect.value = ''; // Reset the select element
});

function calculateTotal() {
  const table = document.getElementById('BillList');
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  let totalBill = 0;

  for (let i = 0; i < rows.length; i++) {
    const totalCell = rows[i].cells[3];
    totalBill += parseFloat(totalCell.textContent);
  }
  console.log('Total Bill:', totalBill.toFixed(2));
  document.getElementById('totalPrice').textContent = totalBill.toFixed(2);
}

function readFormData() {
  var formData = {};
  formData["Product"] = document.getElementById("Product").value;
  formData["Quantity"] = document.getElementById("Quantity").value;
  formData["Price"] = document.getElementById("Price").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById("BillList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.Product;
  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.Quantity;
  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.Price;
  var total = data.Quantity * data.Price; 
  var cell4 = newRow.insertCell(3);
  cell4.innerHTML = total.toFixed(2); 

  resetForm();
  calculateTotal();
  var cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("Product").value = selectedRow.cells[0].innerHTML;
  document.getElementById("Quantity").value = selectedRow.cells[1].innerHTML;
  document.getElementById("Price").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.Product;
  selectedRow.cells[1].innerHTML = formData.Quantity;
  selectedRow.cells[2].innerHTML = formData.Price;
}

function onDelete(td) {
  if (confirm('Are you sure you want to delete this record?')) {
    row = td.parentElement.parentElement;
    document.getElementById('BillList').deleteRow(row.rowIndex);
    resetForm();
    calculateTotal();
  }
}

function resetForm() {
  document.getElementById("Product").value = '';
  document.getElementById("Quantity").value = '';
  document.getElementById("Price").value = '';
  selectedRow = null;
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    const inputs = document.querySelectorAll('input');
    const index = Array.from(inputs).indexOf(event.target);
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  }
});