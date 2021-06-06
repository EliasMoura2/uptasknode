import axios from 'axios';
const tasks = document.querySelector('.listado-pendientes');

// if(tasks){
  tasks.addEventListener('click', e => {
    if(e.target.classList.contains('fa-check-circle')){
      const icon = e.target;
      const taskId = icon.parentElement.parentElement.dataset.task;

      const pathname = location.pathname.split('/');
      const url = `${location.origin}/projects/${pathname[3]}/tasks/${taskId}`;
      axios.patch(url, {taskId})
        .then((res) => {
          if(res.status === 200){
            icon.classList.toggle('completo');
          }
        })
    }
  });
// }

export default tasks;