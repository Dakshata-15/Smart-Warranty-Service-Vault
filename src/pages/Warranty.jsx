import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Warranty.css";

function Warranty() {

    const [warranties, setWarranties] = useState([]);

    const [warrantyId, setWarrantyId] = useState("");

    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [warrantyPeriod, setWarrantyPeriod] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [notes, setNotes] = useState("");
    const [invoiceFile, setInvoiceFile] = useState(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadWarranty();
    }, []);

    useEffect(() => {

        if (purchaseDate !== "" && warrantyPeriod !== "") {

            let date = new Date(purchaseDate);

            date.setMonth(date.getMonth() + parseInt(warrantyPeriod));

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const expiry = `${year}-${month}-${day}`;

            setExpiryDate(expiry);

            body: JSON.stringify({

    productName,
    brand,
    purchaseDate,
    warrantyPeriod,
    expiryDate,
    notes

})
        }

    }, [purchaseDate, warrantyPeriod]);

    function loadWarranty() {

        fetch("http://localhost:8080/warranty")
            .then(response => response.json())
            .then(data => {
                setWarranties(data);
            });

    }

    function addWarranty() {

        fetch("http://localhost:8080/warranty", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

    productName,
    brand,
    purchaseDate,
    warrantyPeriod,
    expiryDate,
    notes

})

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            clearForm();

            loadWarranty();

        });

    }

    function updateWarranty() {

        fetch("http://localhost:8080/warranty", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

           body: JSON.stringify({

    warrantyId,
    productName,
    brand,
    purchaseDate,
    warrantyPeriod,
    expiryDate,
    notes

})

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            clearForm();

            loadWarranty();

        });

    }

    function deleteWarranty(id) {

        fetch("http://localhost:8080/warranty/" + id, {

            method: "DELETE"

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadWarranty();

        });

    }

    function editWarranty(warranty) {

        setWarrantyId(warranty.warrantyId);
        setProductName(warranty.productName);
        setBrand(warranty.brand);
        setPurchaseDate(warranty.purchaseDate);
        setWarrantyPeriod(warranty.warrantyPeriod);
        setExpiryDate(warranty.expiryDate);
        setNotes(warranty.notes);

    }

    function clearForm() {

        setWarrantyId("");
        setProductName("");
        setBrand("");
        setPurchaseDate("");
        setWarrantyPeriod("");
        setExpiryDate("");
        setNotes("");

    }

async function scanInvoice() {

    if (!invoiceFile) {

        alert("Choose an invoice first");

        return;

    }

    try {

        const formData = new FormData();

        formData.append("file", invoiceFile);

        const response = await fetch(
            "http://localhost:8080/ocr/parse",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.text();

        console.log(result);

        const data = JSON.parse(result);

        // Product Name
        setProductName(data.productName || "");

        // Brand
        setBrand(data.brand || "");

        // ==========================
        // FIX PURCHASE DATE
        // ==========================

        let formattedDate = "";

        if (data.purchaseDate) {

            if (data.purchaseDate.includes("/")) {

                const [day, month, year] = data.purchaseDate.split("/");

                formattedDate = `${year}-${month}-${day}`;

            }

            else if (data.purchaseDate.includes("-")) {

                const parts = data.purchaseDate.split("-");

                if (parts[0].length === 4) {

                    formattedDate = data.purchaseDate;

                } else {

                    formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

                }

            }

        }

        setPurchaseDate(formattedDate);

        // ==========================
        // WARRANTY PERIOD
        // ==========================

        let months = 0;

        if (data.warrantyPeriod) {

            const text = data.warrantyPeriod.toLowerCase();

            if (text.includes("year")) {

                months = parseInt(text) * 12;

            }

            else {

                months = parseInt(text);

            }

        }

        setWarrantyPeriod(months);

        // ==========================
        // AUTO CALCULATE EXPIRY DATE
        // ==========================

        if (formattedDate && months > 0) {

            const expiry = new Date(formattedDate);

            expiry.setMonth(expiry.getMonth() + months);

            setExpiryDate(expiry.toISOString().split("T")[0]);

        }

        // ==========================
        // NOTES
        // ==========================

        setNotes(
            "Seller : " + (data.seller || "") +
            "\nInvoice No : " + (data.invoiceNumber || "") +
            "\nPrice : " + (data.price || "")
        );

    }

    catch (error) {

        console.error(error);

        alert("Invoice Scan Failed");

    }

}

    const filteredWarranty = warranties.filter((w) => {

    const keyword = search.toLowerCase().trim();

    return (
        (w.productName || "")
            .toLowerCase()
            .includes(keyword) ||

        (w.brand || "")
            .toLowerCase()
            .includes(keyword)
    );

});
        return (

        <div className="warrantyPage">

            <Link to="/dashboard" className="backButton">
                ← Back
            </Link>

            <h1>Warranty Management</h1>

            <div className="warrantyForm">

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />

                <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Warranty Period (Months)"
                    value={warrantyPeriod}
                    onChange={(e) => setWarrantyPeriod(e.target.value)}
                />

                <textarea
                    placeholder="Notes (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setInvoiceFile(e.target.files[0])}
                />

                <div className="buttonGroup">

                    <button
                        className="saveBtn"
                        onClick={addWarranty}
                    >
                        Save Warranty
                    </button>

                    <button
                        className="updateBtn"
                        onClick={updateWarranty}
                    >
                        Update Warranty
                    </button>

                    <button
                        className="clearBtn"
                        onClick={clearForm}
                    >
                        Clear
                    </button>

                    <button
                        className="scanBtn"
                        onClick={scanInvoice}
                    >
                        📷Scan Invoice
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
                            <th>Brand</th>
                            <th>Purchase Date</th>
                            <th>Warranty</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredWarranty.map((warranty) => (

                                <tr key={warranty.warrantyId}>

                                    <td>{warranty.warrantyId}</td>

                                    <td>{warranty.productName}</td>

                                    <td>{warranty.brand}</td>

                                    <td>{warranty.purchaseDate}</td>

                                    <td>{warranty.warrantyPeriod} Months</td>

                                    <td>{warranty.expiryDate}</td>

                                    <td>

{
    (() => {

        const today = new Date();

        const expiryDate = new Date(warranty.expiryDate);

        const daysLeft = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
        );


        if(daysLeft < 0){

            return (
                <span className="expiredStatus">
                    Expired
                </span>
            );

        }

        else if(daysLeft <= 30){

            return (
                <span className="expiringStatus">
                 Nearing
                </span>
            );

        }

        else{

            return (
                <span className="activeStatus">
                    Active
                </span>
            );

        }

    })()

}

</td>

                                    <td>{warranty.notes}</td>

                                    <td>

                                        <button
                                            className="editBtn"
                                            onClick={() => editWarranty(warranty)}
                                        >
                                            Edit
                                        </button>

                                    </td>

                                    <td>

                                        <button
                                            className="deleteBtn"
                                            onClick={() => deleteWarranty(warranty.warrantyId)}
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

export default Warranty;