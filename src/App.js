import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Warranty from "./pages/Warranty";
import Document from "./pages/Document";
import ServiceHistory from "./pages/ServiceHistory";
import Notification from "./pages/Notification";
import ChatAssistant from "./pages/ChatAssistant";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Product />} />

        <Route path="/warranty" element={<Warranty />} />

        <Route path="/documents" element={<Document />} />

        <Route path="/service-history" element={<ServiceHistory />} />

        <Route path="/notifications" element={<Notification />} />

        <Route path="/chat" element={<ChatAssistant />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;