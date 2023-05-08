// Creo el array para guardar las tareas
let tareas = [];

// Capturo el formulario para poder procesar los datos
const form = document.querySelector("form");

// Capturo el input text y agregamos a un array tareas y reinicio el evento para vaciar el input
form.addEventListener("submit", (event) => {
  // Prevengo el comportamiento por default d eformulario
  event.preventDefault();

  const inputText = document.querySelector("#text");

  // Agrego datos a un array
  tareas.push({
    id: Date.now(),
    text: inputText.value,
    complete: false,
  });

  // reseteo el input text
  event.target.reset();

  // Guardo en almacenamiento local localStorage, para que queden los datos cuando reinicie la página
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderTareas();
});
// Mostramos las tareas de forma dinamica
const renderTareas = () => {
  tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // Capturamos la tabla
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  // Recorremos foreach y le agremos las tareas en tbody
  tareas.forEach(
    (tarea) =>
      (tbody.innerHTML += `
    <tr>
        <td class="${tarea.complete ? "complete" : ""}">${tarea.text}</td>
        <td>
            <button type="button" data-id="${
              tarea.id
            }" class="btn-complete">Completar</button>
            <button type="button">Editar</button>
            <button type="button" onclick="borrarTarea(${
              tarea.id
            })">Borrar</button>
        </td>
    </tr>
`)
  );
};
// Alistamos las tareas cuando cargamos la pagina
renderTareas();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-complete")) {
    completarTarea(e.target.dataset.id);
  }
});
const completarTarea = (id) => {
  tareas.forEach((tarea) => {
    if (tarea.id == id) {
      tarea.complete = !tarea.complete;
    }
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
  renderTareas();
};
const borrarTarea = (id) => {
  if (confirm("Está seguro de eliminar?")) {
    const filtradas = tareas.filter((tarea) => tarea.id != id);
    localStorage.setItem("tareas", JSON.stringify(filtradas));
    renderTareas();
  }
};
document.addEventListener("DOMContentLoaded", () => {
  renderTareas();
});
