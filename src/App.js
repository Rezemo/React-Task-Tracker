import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from "react"

function App() {
  const [showAddTask, setAddTask] = useState(false)
  /**
   * useState takes a variable and a method to update that variable,
   * in this case the method is setTasks.
   */
  //tasks is the name of this array variable
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Fetch Data
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    return data
  }

  //Fetch Data
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data
  }

  //Add Task
  const addTask = async(task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method:'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await response.json()
    setTasks([...tasks, data])
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const response = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(tasks.map((task) => task.id === id ?
    {...task, reminder:data.reminder}
    : task))
  }

  return (
    <div className="container">
      <Header 
      onAdd={() => setAddTask(!showAddTask)} 
      title="Trial"
      showAdd={showAddTask} />
      {tasks.length > 0 ?
        <Tasks tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        /> : 'No Tasks to Do!'}
        {showAddTask && <AddTask onAdd={addTask}/>}
    </div>
  );
}

export default App;
