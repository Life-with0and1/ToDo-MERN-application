import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPenAlt,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskManager({ url }) {
  const [data, setData] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks,setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  useEffect(() => {
    if (updateTask) setData(updateTask.name);
  }, [updateTask]);

  const handleTask = async () => {
    if (updateTask && data) {
        updateTaskHandler()
    } else if (updateTask === null && data) {
      handleOnSubmit();
    }
  };
  const handleOnSubmit = async () => {
    const result = {
      name: data,
      isCompleted: false,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
    try {
      const response = await fetch(url + "/api/task/add", options);
      const res = await response.json();
      if (response.ok) {
        toast.success("Task added successfully!");
        setData("");
        fetchTasks();
      } else {
        toast.error("Error adding task: " + res.message);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  const fetchTasks = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url + "/api/task/get");
      const res = await response.json();
      if (response.ok) {
        setTasks(res.data);
        setCopyTasks(res.data)
      } else {
        toast.error("Error fetching tasks: " + res.message);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  const deleteTask = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url + `/api/task/delete/${id}`);
      const res = await response.json();
      if (response.ok) {
        toast.success("Task deleted successfully.");
        fetchTasks();
      } else {
        toast.error("Error deleting task: " + res.message);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  const updateTaskHandler = async () => {
    const result = {
        name: data,
        isCompleted : updateTask.isCompleted,
      };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
    try {
      const response = await fetch(url + `/api/task/update/${updateTask._id}`, options);
      const res = await response.json();
      if (response.ok) {
        toast.success("Task updated successfully!");
        setData("");
        fetchTasks();
      } else {
        toast.error("Error while updating task: " + res.message);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

  const checkUnCheck = async (item) => {
    const { _id, isCompleted, name } = item;
    const result = {
      name,
      isCompleted: !isCompleted,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
    try {
      const response = await fetch(url + `/api/task/update/${_id}`, options);
      const res = await response.json();
      if (response.ok) {
        toast.success("Task updated successfully!");
        fetchTasks();
      } else {
        toast.error("Error while updating task: " + res.message);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);
    }
  };

const handleSearch = (e)=>{
    const term = e.target.value.toLowerCase()
    const oldTasks = [...copyTasks]
    const result = oldTasks.filter((item)=> item.name.toLowerCase().includes(term))
    setTasks(result)
}


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-1">
          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="form-control me-1"
            placeholder="Task details..."
            type="text"
          />
          <button
            className="btn btn-success btn-sm me-2"
            onClick={()=>handleTask()}
          >
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span  className="input-group-text">
            <FaSearch />
          </span>
          <input
          onChange={(e)=>handleSearch(e)}
            placeholder="Search task..."
            className="form-control"
            type="text"
          />
        </div>
      </div>
      <div className="d-flex flex-column w-100">
        {tasks.map((item) => {
          return (
            <div key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
              <span
                className={
                  item.isCompleted ? "text-decoration-line-through" : ""
                }
              >
                {item.name}
              </span>
              <div className="">
                <button
                  onClick={() => checkUnCheck(item)}
                  type="button"
                  className="btn btn-success btn-sm me-2"
                >
                  <FaCheck />
                </button>
                <button type="button" className="btn btn-primary btn-sm me-2">
                  <FaPencilAlt onClick={() => setUpdateTask(item)} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteTask(item._id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
