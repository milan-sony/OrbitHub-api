import { Tasks } from '../models/taskModel.js'

// Create tasks
export const createTasks = async (req, res) => {

    try {
        const loggedInUserId = req.user?._id

        const { task, priority } = req.body

        // Check empty input fields
        if (!task) {
            return res.status(400).json({
                status: 400,
                message: "Task is required"
            })
        }

        if (!priority) {
            return res.status(400).json({
                status: 400,
                message: "Priority is required"
            })
        }

        const newTask = new Tasks({
            user_id: loggedInUserId,
            task: task,
            priority: priority,
        })

        if (newTask) {
            // Save new task to the DB
            await newTask.save()
            return res.status(201).json({
                status: 201,
                message: "Task added successfully",
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Something went wrong, task not created"
            })
        }
    } catch (error) {
        console.error("Error adding the task, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error adding the task",
            error: error.message
        })
    }
}

// Get all tasks
export const getTasks = async (req, res) => {

    try {
        const loggedInUserId = req.user?._id

        const tasks = await Tasks.find({ user_id: loggedInUserId })

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No tasks found"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Tasks fetch successfully",
            data: tasks
        })

    } catch (error) {
        console.error("Error fetching the tasks: ", error)
        return res.status(500).json({
            status: 500,
            message: "Error fetching the tasks",
            error: error.message
        })
    }
}

// Update tasks
export const updateTasks = async (req, res) => {
    try {
        const { taskId, task, priority } = req.body

        if (!taskId) {
            console.error("Update task Id is missing/not found")
            return
        }

        if (!task) {
            return res.status(400).json({
                status: 400,
                message: "Task is required"
            })
        }

        if (!priority) {
            return res.status(400).json({
                status: 400,
                message: "priority is required"
            })
        }

        const updatedTaskData = {
            _id: taskId,
            task: task,
            priority: priority,
        }

        console.log("updatedTaskData: ", updatedTaskData)

        const updatedTask = await Tasks.findByIdAndUpdate(taskId, updatedTaskData)
        if (updatedTask) {
            return res.status(201).json({
                status: 201,
                message: "Task updated successfully",
            })
        }

    } catch (error) {
        console.error("Error editing the tasks", error)
        return res.status(500).json({
            status: 500,
            message: "Error editing the tasks",
            error: error.message
        })
    }
}

// Delete task
export const deleteTasks = async (req, res) => {
    try {
        const { id: taskId } = req.params

        console.log("receiverId: ", taskId)

        if (!taskId) {
            console.error("Delete task Id is missing/not found")
            return
        }

        const deletedTask = await Tasks.findByIdAndDelete(taskId)
        if (deletedTask) {
            return res.status(200).json({
                status: 200,
                message: "Task deleted successfully",
            })
        }

    } catch (error) {
        console.error("Error editing the tasks", error)
        return res.status(500).json({
            status: 500,
            message: "Error editing the tasks",
            error: error.message
        })
    }
}