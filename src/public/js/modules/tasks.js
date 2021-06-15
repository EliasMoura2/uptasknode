import Swal from 'sweetalert2';
import axios from 'axios';
import {updateProgress} from './../functions/progress';
const tasks = document.querySelector('.listado-pendientes');

if(tasks){
  tasks.addEventListener('click', e => {
    if(e.target.classList.contains('fa-check-circle')){
      const icon = e.target;
      const taskId = icon.parentElement.parentElement.dataset.task;

      const url = `${location.origin}/tasks/update-state/${taskId}`;
      axios.patch(url, {taskId})
        .then((res) => {
          if(res.status === 200){
            icon.classList.toggle('completo');
            updateProgress();
          }
        })
    }
    if(e.target.classList.contains('fa-trash')){
      const taskHTML = e.target.parentElement.parentElement,
            taskId = taskHTML.dataset.task;
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          const url = `${location.origin}/tasks/delete/${taskId}`;
          axios.delete(url, { params: {taskId}})
            .then((res) => {
              if(res.status === 200){
                taskHTML.parentElement.removeChild(taskHTML);
              }
              Swal.fire(
                'Deleted!',
                `${res.data}`,
                'success'
              );
              updateProgress();
              // setTimeout(() => {
                // window.location.href = `${location.pathname}`
              // }, 1000);
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: `Error`,
                text: "couldn't delete task"
              });
            })
        }
      })
    }
  });
}

export default tasks;