import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className=" text-center bg-dark rounded-bottom d-flex justify-content-center" >
            <Link to='/about' style={{ color: 'lightcyan' }} >About Us | </Link>
            <Link onClick={() => {
                sessionStorage.setItem("token", "");
                sessionStorage.clear();
            }} to='/login' style={{ color: 'lightcyan' }} > Logout </Link>
  <p style={{color:'white'}}> ({ sessionStorage.token ? JSON.parse(sessionStorage.token).name : ''})</p>
        </footer>
    );
}