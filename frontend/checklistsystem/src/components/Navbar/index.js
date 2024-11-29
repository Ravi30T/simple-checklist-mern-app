import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './index.css'

const Navbar = () => {
    return(
        <nav className="nav-container">
            <Link to="/" className="loan-manager-heading-link">
                <h1 className="loan-manager-heading"> Loan Manager </h1>
            </Link>

            <Link to="/new-application">
                <button className='check-eligibility-btn'> Check Eligibility </button>
            </Link>
        </nav>
    )
}

export default Navbar