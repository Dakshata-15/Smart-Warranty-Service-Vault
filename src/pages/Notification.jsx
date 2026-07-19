import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Notification.css";

function Notification() {

    const [notifications, setNotifications] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadNotifications();

        const interval = setInterval(() => {

            loadNotifications();

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    function loadNotifications() {

        fetch("http://localhost:8080/notifications")

            .then(res => res.json())

            .then(data => setNotifications(data));

    }

    function markAsRead(notification) {

        fetch("http://localhost:8080/notifications", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                notificationId: notification.notificationId,

                productName: notification.productName,

                title: notification.title,

                message: notification.message,

                notificationDate: notification.notificationDate,

                status: "Read"

            })

        })

        .then(res => res.text())

        .then(data => {

            alert(data);

            loadNotifications();

        });

    }

    function deleteNotification(id) {

        fetch("http://localhost:8080/notifications/" + id, {

            method: "DELETE"

        })

        .then(res => res.text())

        .then(data => {

            alert(data);

            loadNotifications();

        });

    }

    const filteredNotifications = notifications.filter(notification =>

        notification.productName.toLowerCase().includes(search.toLowerCase()) ||

        notification.title.toLowerCase().includes(search.toLowerCase())

    );
        return (

        <div className="notificationPage">

            <Link to="/dashboard" className="backButton">
                ← Back
            </Link>

            <h1>Notifications</h1>

            <div className="searchBar">

                <span className="searchIcon">
                    <FiSearch />
                </span>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <div className="tableContainer">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Product</th>
                            <th>Title</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Read</th>
                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredNotifications.map(notification=>(

                                <tr key={notification.notificationId}>

                                    <td>{notification.notificationId}</td>

                                    <td>{notification.productName}</td>

                                    <td>{notification.title}</td>

                                    <td>{notification.message}</td>

                                    <td>{notification.notificationDate}</td>

                                    <td>

                                        <span className={
                                            notification.status==="Unread"
                                            ? "unread"
                                            : "read"
                                        }>

                                            {notification.status}

                                        </span>

                                    </td>

                                    <td>

                                        <button

                                            className="readBtn"

                                            onClick={()=>markAsRead(notification)}

                                        >

                                            Mark Read

                                        </button>

                                    </td>

                                    <td>

                                        <button

                                            className="deleteBtn"

                                            onClick={()=>deleteNotification(notification.notificationId)}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Notification;