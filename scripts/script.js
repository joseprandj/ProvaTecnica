const incialDataBase = [
  { predio: "Prédio 1", localDeTrabalho: "Local de Trabalho 1" },
  { predio: "Prédio 2", localDeTrabalho: "Local de Trabalho 2" },
  { predio: "Prédio 3", localDeTrabalho: "Local de Trabalho 3" },
  { predio: "Prédio 4", localDeTrabalho: "Local de Trabalho 4" },
  { predio: "Prédio 5", localDeTrabalho: "Local de Trabalho 5" },
];

const getSessionStorage = () =>
  JSON.parse(sessionStorage.getItem("fullDataBase")) ?? incialDataBase;
const setSessionStorage = (dbItems) =>
  sessionStorage.setItem("fullDataBase", JSON.stringify(dbItems));

const deleteItems = (index) => {
  const dbItems = getSessionStorage();
  dbItems.splice(index, 1);
  setSessionStorage(dbItems);
};

const editItems = (index, items) => {
  const dbItems = getSessionStorage();
  dbItems[index] = items;
  setSessionStorage(dbItems);
};

const createItems = (items) => {
  const dbItems = getSessionStorage();
  dbItems.push(items);
  setSessionStorage(dbItems);
};

function addItem() {
  const getValuePredio = document.getElementById("edifice").value;
  const getValueInput = document.getElementById("textEdifice").value;
  const templateItems = {
    predio: getValuePredio,
    localDeTrabalho: getValueInput,
  };
  if (getValueInput == 0) {
    removeAndAddModal();
  } else {
    createItems(templateItems);
    updateTable();
  }
}

const createRow = (item, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${item.predio}</td>
    <td>${item.localDeTrabalho}</td>
    <td>
      <img src="./assets/edit.png" alt="Editar" id="editItem-${index}" data-type="button">
      <img src="./assets/trash.png" alt="Excluir" id="deleteItem-${index}" data-type="button">
    </td>
  `;
  document.querySelector("#tableList>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableList>tbody tr+tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbItems = getSessionStorage();
  clearTable();
  dbItems.forEach(createRow);
};

const fillFields = (items) => {
  document.getElementById("edifice2").value = items.predio;
  document.getElementById("textEdificeEdit").value = items.localDeTrabalho;
};

const editItem = (index) => {
  const items = getSessionStorage()[index];
  fillFields(items);

  document.getElementById("saveEdit").addEventListener("click", () => {
    const getValuePredio = document.getElementById("edifice2").value;
    const getValueInput = document.getElementById("textEdificeEdit").value;
    const templateItems = {
      predio: getValuePredio,
      localDeTrabalho: getValueInput,
    };
    editItems(index, templateItems);
    removeAndAddModal2();
    updateTable();
  });
};

const editAndDelete = (event) => {
  if (event.target.dataset.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "editItem") {
      removeAndAddModal2();
      editItem(index);
    } else {
      removeAndAddModal3();
      document.getElementById("checkDelete").addEventListener("click", () => {
        deleteItems(index);
        removeAndAddModal3();
        window.location.reload();
      });
    }
  }
};
document
  .querySelector("#tableList>tbody")
  .addEventListener("click", editAndDelete);

function removeAndAddModal() {
  let modal = document.getElementById("modalTable");
  modal.classList.toggle("active");
}

function removeAndAddModal2() {
  let modal = document.getElementById("modalEditTable");
  modal.classList.toggle("active");
}

function removeAndAddModal3() {
  let modal = document.getElementById("modalTableDelete");
  modal.classList.toggle("active");
}
