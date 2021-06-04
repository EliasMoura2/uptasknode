import Swal from 'sweetalert2';
import axios from 'axios';

const btnDelete = document.querySelector('#eliminar-proyecto');

if(btnDelete){
  btnDelete.addEventListener('click', (e) => {
    const urlProject = e.target.dataset.projectUrl;
    // console.log(urlProject);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // enviar peticion a axios
        const url = `${location.origin}/projects/delete/${urlProject}`;
        axios.delete(url, { params: {urlProject}})
          .then((res) => {
            console.log(res)
            Swal.fire(
              'Deleted!',
              `${res.data}`,
              'success'
            );
            setTimeout(() => {
              window.location.href = '/'
            }, 1000);
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: `Error`,
              text: "couldn't delete project"
            });
          })
      }
        
    })
  });
}

export default btnDelete;