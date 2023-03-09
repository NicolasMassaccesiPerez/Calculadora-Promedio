class Alumno {
  constructor(nombre, nota1, nota2) {
    this.nombre = nombre;
    this.nota1 = parseFloat(nota1);
    this.nota2 = parseFloat(nota2);
  } // Obtener los valores de los campos

  
  
  calcularPromedio() {
    return (this.nota1 + this.nota2) / 2;
  }

  determinarEstado() {
    return this.calcularPromedio() >= 7 ? 'Aprobado' : 'Reprobado';
  }
}

// Obtener el formulario y la tabla
const form = document.querySelector('#form-notas');
const tabla = document.querySelector('#tabla-notas tbody');

// Agregar un listener al formulario para escuchar el evento submit
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que el formulario se envíe por defecto
 
  

  // Crear un nuevo objeto de la clase Alumno con los valores ingresados
  const alumno = new Alumno(form.nombre.value, form.nota1.value, form.nota2.value);

  // Crear una nueva fila en la tabla con los valores ingresados
  const fila = tabla.insertRow();
  fila.innerHTML = `
    <td>${alumno.nombre}</td>
    <td>${alumno.nota1}</td>
    <td>${alumno.nota2}</td>
    <td>${alumno.calcularPromedio()}</td>
    <td>${alumno.determinarEstado()}</td>
    
  `;

  // Limpiar los campos del formulario
  form.reset();

  // Almacenar los valores ingresados en el almacenamiento local
  const datos = JSON.parse(localStorage.getItem('datos')) || [];
  datos.push({ nombre: alumno.nombre, nota1: alumno.nota1, nota2: alumno.nota2  });
  localStorage.setItem('datos', JSON.stringify(datos));

// Mostrar un mensaje de éxito con SweetAlert
  Swal.fire({
    icon: 'success',
    title: '¡Datos agregados con éxito!',
  });
});

// Obtener los datos almacenados y mostrarlos en la tabla
const datos = JSON.parse(localStorage.getItem('datos')) || [];
datos.forEach((dato) => {
  // Crear un nuevo objeto de la clase Alumno con los valores almacenados
  const alumno = new Alumno(dato.nombre, dato.nota1, dato.nota2);

  const fila = tabla.insertRow();
  fila.innerHTML = `
  
    <td>${alumno.nombre}</td>
    <td>${alumno.nota1}</td>
    <td>${alumno.nota2}</td>
    <td>${alumno.calcularPromedio()}</td>
    <td>${alumno.determinarEstado()}</td>
   
  `;
});

// Agregar un listener al botón "Vaciar tabla" para limpiar la tabla y el almacenamiento local
const botonVaciarTabla = document.querySelector('#boton-vaciar-tabla');
botonVaciarTabla.addEventListener('click', () => {
  tabla.innerHTML = '';
  localStorage.removeItem('datos');
});

