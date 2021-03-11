
export default function AddBtn({ showBtn, toggleAddTask }) {
    return (
        <>
            <input type="button"
                className="btn addBtn mt-2 mb-2 "
                onClick={toggleAddTask}
                value={showBtn ? 'Close' : 'Add Task'} />
        </>
    )
}
