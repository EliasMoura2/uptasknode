import Swal from 'sweetalert2';

export const updateProgress = () => {
  const tasks = document.querySelectorAll('li.tarea');
  if(tasks.length){
    const completedTasks = document.querySelectorAll('i.completo');
    const progress = Math.round((completedTasks.length / tasks.length) * 100); 
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