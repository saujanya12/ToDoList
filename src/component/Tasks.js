import React from 'react'
import Task from './Task'
export default function Tasks({ tasks, onDelete, toggleReminder }) {

    return (
        <div className="section">
            {
                tasks.map((task) => {
                    return <Task key={task._id}
                        task={task}
                        onDelete={onDelete}
                        toggleReminder={toggleReminder} />
                })

            }
        </div>
    )
}
