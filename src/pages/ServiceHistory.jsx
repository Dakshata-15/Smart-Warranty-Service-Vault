import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./ServiceHistory.css";

function ServiceHistory() {

    const [services, setServices] = useState([]);

    const [serviceId, setServiceId] = useState("");

    const [productName, setProductName] = useState("");
    const [serviceCenter, setServiceCenter] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceCost, setServiceCost] = useState("");
    const [serviceDate, setServiceDate] = useState("");
    const [nextServiceDate, setNextServiceDate] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadServices();

    }, []);

    function loadServices() {

        fetch("http://localhost:8080/services")

            .then(response => response.json())

            .then(data => {

                setServices(data);

            });

    }

    function addService() {

    fetch("http://localhost:8080/services", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            productName,
            serviceCenter,
            serviceDescription,
            serviceCost,
            serviceDate,
            nextServiceDate

        })

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        clearForm();

        loadServices();

    });

}

function updateService() {

    fetch("http://localhost:8080/services", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            serviceId,
            productName,
            serviceCenter,
            serviceDescription,
            serviceCost,
            serviceDate,
            nextServiceDate

        })

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        clearForm();

        loadServices();

    });

}

    function deleteService(id) {

        fetch("http://localhost:8080/services/" + id, {

            method: "DELETE"

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadServices();

        });

    }

    function editService(service){

    setServiceId(service.serviceId);   // IMPORTANT

    setProductName(service.productName);
    setServiceDate(service.serviceDate);
    setServiceCenter(service.serviceCenter);
    setServiceDescription(service.serviceDescription);
    setServiceCost(service.serviceCost);
    setNextServiceDate(service.nextServiceDate);

}
    function clearForm() {

        setServiceId("");

        setProductName("");

        setServiceCenter("");

        setServiceDescription("");

        setServiceCost("");

        setServiceDate("");

        setNextServiceDate("");

    }

    const filteredServices = services.filter((service) =>

        service.productName.toLowerCase().includes(search.toLowerCase()) ||

        service.serviceCenter.toLowerCase().includes(search.toLowerCase())

    );
        return (

        <div className="servicePage">

            <Link to="/dashboard" className="backButton">
                ← Back
            </Link>

            <h1>Service History</h1>

            <div className="serviceForm">

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Service Center"
                    value={serviceCenter}
                    onChange={(e) => setServiceCenter(e.target.value)}
                />

                <div className="inputGroup">
    <label>Service Cost</label>

    <input
        type="number"
        placeholder="Service Cost"
        value={serviceCost}
        onChange={(e)=>setServiceCost(e.target.value)}
    />
</div>

                <div className="inputGroup">
    <label>Service Date</label>
    <input
        type="date"
        value={serviceDate}
        onChange={(e) => setServiceDate(e.target.value)}
    />
</div>

<div className="inputGroup">
    <label>Next Service Due Date</label>
    <input
        type="date"
        value={nextServiceDate}
        onChange={(e) => setNextServiceDate(e.target.value)}
    />
</div>

                <textarea
                    placeholder="Service Description"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                />

                <div className="buttonGroup">

                    <button
                        className="saveBtn"
                        onClick={addService}
                    >
                        Save Service
                    </button>

                    <button
                        className="updateBtn"
                        onClick={updateService}
                    >
                        Update Service
                    </button>

                    <button
                        className="clearBtn"
                        onClick={clearForm}
                    >
                        Clear
                    </button>

                </div>

            </div>

            <div className="searchBar">
                <span className="searchIcon">
    <FiSearch />
</span>


            <input
                type="text"
                placeholder="Search Product / Brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>


            <div className="tableContainer">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Product</th>
                            <th>Service Center</th>
                            <th>Cost</th>
                            <th>Service Date</th>
                            <th>Next Service</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredServices.map((service) => (

                                <tr key={service.serviceId}>

                                    <td>{service.serviceId}</td>

                                    <td>{service.productName}</td>

                                    <td>{service.serviceCenter}</td>

                                    <td>₹ {service.serviceCost}</td>

                                    <td>{service.serviceDate}</td>

                                    <td>{service.nextServiceDate}</td>

                                    <td>{service.serviceDescription}</td>

                                    <td>

                                        <button
                                            className="editBtn"
                                            onClick={() => editService(service)}
                                        >
                                            Edit
                                        </button>

                                    </td>

                                    <td>

                                        <button
                                            className="deleteBtn"
                                            onClick={() => deleteService(service.serviceId)}
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

export default ServiceHistory;