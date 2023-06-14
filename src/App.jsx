
import './App.css'
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import TaskCard from './Shared/TaskCard'
function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    const name = data.name
    const title = data.title
    const details = data.details

    const taskDetails = {
      name,
      title,
      details
    }

    fetch('http://localhost:5000/add-task', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',

      },
      body: JSON.stringify(taskDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire(
            'Added Your Task',
            'successfully Added Your Task',
            'success'
          )
          refetch()
          reset()
        }
      })




  }


  // get method 
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ['all-task'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/all-task')
      return res.json()
    }
  })
  console.log(tasks)

  const handleComplete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do You Complete This Task",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/task-update/${id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },

        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.modifiedCount > 0) {
              refetch()
              Swal.fire(
                'Complete Your Task',
                'successfully Complete Your Task',
                'success'
              )
            }
          })

      }
    })


  }




  return (
    <>
      <div>
        <form className=" mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              {...register("name", { required: true, maxLength: 30 })}

              className="flex-grow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="*Task Name"
            />
            {errors.name && errors.name.type === "required" && (
              <span className='text-sm text-red-600'>Name is required</span>
            )}

            {errors.name && errors.name.type === "maxLength" && (
              <span className='text-sm text-red-600'>maximum length of 30 letters</span>
            )}


            <input
              type="text"
              className="flex-grow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="*Task title"
              name="title"
              {...register("title", { required: true })}
            />
            {errors.title && errors.title.type === "required" && (
              <span className='text-sm text-red-600'>Title is required</span>
            )}

            <input
              type="text"
              className="flex-grow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="*Task Details"
              name="details"
              {...register("details", { required: true, maxLength: 150 })}

            />
            {errors.details && errors.details.type === "required" && (
              <span className='text-sm text-red-600'>Details is required</span>
            )}


            {errors.details && errors.details.type === "maxLength" && (
              <span className='text-sm text-red-600'>maximum length of 150 letters</span>
            )}


          </div>
          <button
            type="submit"
            className="bg-yellow-500 m-2 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Submit
          </button>
        </form>




        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              {(
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {
                tasks && tasks.map((task, i) => <TaskCard key={task._id} handleComplete={handleComplete} task={task} i={i}></TaskCard>)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
