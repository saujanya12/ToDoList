import "../css/Header.css";
import AddBtn from '../component/AddBtn';

export default function Header({title, showBtn, toggleAddTask}) {
    return (
        <>
            <header  className="bg-dark rounded-top px-2 mb-1">
                <h1 className="AppTitle">{title}</h1>
                <AddBtn showBtn={showBtn} toggleAddTask={toggleAddTask}/>
            </header>
        </>
    )
}

Header.defaultProps = {
    title: 'TODO APP',
}
