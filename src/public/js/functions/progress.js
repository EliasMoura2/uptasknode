import Swal from 'sweetalert2';

export const updateProgress = () => {
  // seleccionar tareas existentes
  const tasks = document.querySelectorAll('li.tarea');
  if(tasks.length){
    // seleccionar tareas completadas
    const completedTasks = document.querySelectorAll('i.completo');
    // calcaluar avance
    const progress = Math.round((completedTasks.length / tasks.length) * 100); 
    // mostrar avance
    const percent = document.querySelector('#porcentaje');
    percent.style.width = `${progress}%`;

    if(progress === 100){
      Swal.fire(
        'Project Completed',
        'Congratulations',
        'success'
      );
    }
  }
};