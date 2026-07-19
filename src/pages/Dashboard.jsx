import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const navigate = useNavigate();

    return (
        <>

            <Sidebar />


        <div className="dashboard">

            <h1>Welcome to Smart Warranty & Service Vault</h1>

            <p>Manage all your products and warranties in one place.</p>

            <div className="cardContainer">

                <Link to="/products" className="card">
                    <div className="icon">💻</div>
                    <h2>Products</h2>
                    <p>Add and manage your purchased products.</p>
                </Link>

                <Link to="/warranty" className="card">
                    <div className="icon">🛡️</div>
                    <h2>Warranty</h2>
                    <p>Track warranty expiry dates.</p>
                </Link>

                <Link to="/documents" className="card">
                    <div className="icon">📄</div>
                    <h2>Documents</h2>
                    <p>Store invoices and warranty cards.</p>
                </Link>

                <Link to="/service-history" className="card">
                    <div className="icon">🛠️</div>
                    <h2>Service History</h2>
                    <p>View previous repairs and services.</p>
                </Link>

                <Link to="/notifications" className="card">
                    <div className="icon">🔔</div>
                    <h2>Notifications</h2>
                    <p>Receive warranty reminders.</p>
                </Link>

            </div>

            <div className="ai-button-container">

                <button
                    className="ai-button"
                    onClick={() => navigate("/chat")}
                >
                    🤖 AI Assistant
                </button>

            </div>

            <div className="logout">

                <Link to="/">
                    <button>Logout</button>
                </Link>

            </div>

        </div>
        </>

    );

}

export default Dashboard;