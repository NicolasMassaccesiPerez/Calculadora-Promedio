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