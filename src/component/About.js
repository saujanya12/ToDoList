import { Link } from "react-router-dom";

export default function About() {
    return (
        <div>
            About Us ...
            <ul>
                <li>Add Task: Click on Add Task button and add your task with date</li>
                <li>Set Reminder: Double click on task to set or remove reminder </li>
                <li>Delete Task: Click on Cross icon to delete your task</li>
            </ul>
            <Link to='/'>Go Back</Link>
        </div>
    )
}
