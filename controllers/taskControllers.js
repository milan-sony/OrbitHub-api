import { Tasks } from '../models/taskModel.js'

// Create tasks
export const createTasks = async (req, res) => {

    try {
        const loggedInUserId = req.user?._id

        const { task, priority, status } = req.body

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

        if (!status) {
            return res.status(400).json({
                status: 400,
                message: "Status is required"
            })
        }

        const newTask = new Tasks({
            user_id: loggedInUserId,
            task: task,
            priority: priority,
            status: status
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

export const getTasks = async (req, res) => {

    try {
        const loggedInUserId = req.user?._id

        const tasks = await Tasks.find({ user_id: loggedInUserId })

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