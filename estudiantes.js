const tabla = document.querySelector('#tabla-notas tbody');

fetch('alumnos.json')
  .then(response => response.json())
  .then(alumnos => {
    alumnos.forEach(estudiante => {
      const fila = document.createElement('tr');
      const nombre = document.createElement('td');
      const promedio = document.createElement('td');
      const estado = document.createElement('td');
      
      nombre.textContent = estudiante.nombre;
      promedio.textContent = estudiante.promedio;
      estado.textContent = estudiante.aprobado ? 'Aprobado' : 'Reprobado';
      
      fila.appendChild(nombre);
      fila.appendChild(promedio);
      fila.appendChild(estado);
      
      tabla.appendChild(fila);
    });
  })
  .catch(error => console.error(error));


  // Obtener la tabla donde se mostrarán los estudiantes
const tablaEstudiantes = document.querySelector('#tabla-notas1 tbody');

// Verificar si hay datos guardados en el localStorage
const estudiantesGuardados = JSON.parse(localStorage.getItem('datos'));

// Si hay datos guardados, agregarlos a la tabla
if (estudiantesGuardados && estudiantesGuardados.length > 0) {
  estudiantesGuardados.forEach((estudiante) => {
    const fila = tablaEstudiantes.insertRow();
    fila.innerHTML = `
      <td>${estudiante.nombre}</td>
      <td>${(estudiante.nota1 + estudiante.nota2) / 2}</td>
      <td>${((estudiante.nota1 + estudiante.nota2) / 2) >= 7 ? 'Aprobado' : 'Reprobado'}</td>
    `;
  });
}

// Obtener el botón y el select del HTML
const botonBuscar = document.querySelector('#boton-buscar');
const selectEstado = document.querySelector('#select-estado');

// Agregar event listener al botón buscar
botonBuscar.addEventListener('click', () => {
  // Obtener el valor seleccionado en el select
  const estadoSeleccionado = selectEstado.value;

  // Obtener todos los estudiantes de la tabla
  const estudiantes = document.querySelectorAll('#tabla-notas tbody tr');

  // Iterar sobre cada estudiante y ocultar/mostrar según el estado seleccionado
  estudiantes.forEach((estudiante) => {
    const estado = estudiante.querySelector('td:nth-child(3)').textContent.toLowerCase();
    if (estadoSeleccionado === 'todos' || estadoSeleccionado === estado) {
      estudiante.style.display = 'table-row';
    } else {
      estudiante.style.display = 'none';
    }
  });
});
