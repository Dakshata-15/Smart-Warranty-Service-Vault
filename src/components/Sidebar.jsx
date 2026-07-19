import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

    const location = useLocation();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠"
        },

        {
            name: "Products",
            path: "/products",
            icon: "💻"
        },

        {
            name: "Warranty",
            path: "/warranty",
            icon: "🛡️"
        },

        {
            name: "Documents",
            path: "/documents",
            icon: "📄"
        },

        {
            name: "Service History",
            path: "/service-history",
            icon: "🛠️"
        },

        {
            name: "Notifications",
            path: "/notifications",
            icon: "🔔"
        },

        {
            name: "AI Assistant",
            path: "/chat",
            icon: "🤖"
        }

    ];

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                🛡 SmartVault

            </div>

            <div className="sidebar-menu">

                {

                    menuItems.map((item) => (

                        <Link

                            key={item.path}

                            to={item.path}

                            className={

                                location.pathname === item.path

                                    ? "sidebar-item active"

                                    : "sidebar-item"

                            }

                        >

                            <span className="sidebar-icon">

                                {item.icon}

                            </span>

                            {item.name}

                        </Link>

                    ))

                }

            </div>

            <div className="sidebar-bottom">

                <Link

                    to="/"

                    className="logout-btn"

                >

                     Logout

                </Link>

            </div>

        </div>

    );

}

export default Sidebar;