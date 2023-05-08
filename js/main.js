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
  const renderTareas = () => {
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    tareas.forEach(
      (tarea) =>
        (tbody.innerHTML += `
    <tr>
        <td>${tarea.text}</td>
        <td>
            <button type="button">Completar</button>
            <button type="button">Editar</button>
            <button type="button">Borrar</button>
        </td>
    </tr>
`)
    );
  };

