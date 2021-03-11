import { useState } from 'react'
var mongoose = require('mongoose');
export default function TaskForm({ addTask }) {

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    //const [createdOn, setCreatedOn] = useState('')
    const [reminder, setReminder] = useState(false)


    // useEffect(() => {
    //     return () => {
    //         const currentDateValue = currentDate();
    //         setCreatedOn(currentDateValue);
    //     }
    // }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '') {
            return alert('Please add title');
        }

        // const currentDateValue = currentDate();
        // setCreatedOn(()=> currentDateValue);
        addTask({title, date, reminder, 'userId': mongoose.Types.ObjectId().toHexString() });

        setTitle('')
        setDate('')
        setReminder(false)
        //setCreatedOn('')
    }

    // const currentDate = () => {
    //     var today = new Date();
    //     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //     var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    //     var dateTime = date + ' ' + time;
        
    //     return dateTime;
    // }
    return (
        <form onSubmit={onSubmit} className="py-2 px-2 mb-2 rounded border bg-form">
            <input type='text'
                className="form-control mb-1"
                placeholder='Enter task title'
                value={title}
                onChange={(e) => { setTitle(e.target.value); }} />  
                {/* setCreatedOn(currentDate()); */}

            <input type='datetime-local'
                className="form-control mb-1"
                value={date}
                onChange={(e) => { setDate(e.target.value) }} />

            <div className="form-check  mb-1">
                <input type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => { setReminder(e.target.checked) }} />
                <label className="form-check-label" htmlFor="exampleCheck1">Set Reminder</label>
            </div>

            <div className="text-center">
                <button type="submit" className="btn">Save Task</button>
            </div>
        </form>

    );
}