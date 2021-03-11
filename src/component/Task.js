import React from 'react'
import "../css/Task.css";
import { FaWindowClose } from 'react-icons/fa';
import { BiCalendarAlt, BiListUl } from 'react-icons/bi';

export default function Task({ task, onDelete, toggleReminder }) {

    function deleteTask(id) {
        onDelete(id);
    }

    return (
        <div className={`taskBox ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => toggleReminder(task._id)}>
            <div className="task" >
                <p><BiListUl size='1.5em' color='firebrick' /> {task.title}</p>
                <FaWindowClose size='2em' className="closeIcon" onClick={() => { deleteTask(task._id) }} />
            </div>
            <div className="task" >
                <p> <BiCalendarAlt size='1.5em' color='firebrick' /> {task.date}</p>
                <p ><span className="createdAt colorGray"> Created On: {task.createdAt ? task.createdAt : ' -- ' } </span></p>

            </div>

        </div>
    )
}
