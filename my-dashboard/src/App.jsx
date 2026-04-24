import React, { useState } from "react";
import "./App.css";

function App() {
  // State for sidebar toggle
  const [sidebarHidden, setSidebarHidden] = useState(false);

  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Device data
  const devices = [
    { name: "Server-01", ip: "192.168.1.10", type: "Linux Server", status: "Critical" },
    { name: "Server-02", ip: "192.168.1.11", type: "Database", status: "Warning" },
    { name: "Router-01", ip: "192.168.1.1", type: "Network Device", status: "Active" },
    { name: "Server-03", ip: "192.168.1.12", type: "Application Server", status: "Critical" },
    { name: "Server-04", ip: "192.168.1.13", type: "Mail Server", status: "Healthy" },
  ];

  // Alert data
  const alerts = [
    { id: "AL-101", device: "Server-01", issue: "High CPU Usage", status: "Critical" },
    { id: "AL-102", device: "Server-02", issue: "Disk Space Low", status: "Warning" },
    { id: "AL-103", device: "Router-01", issue: "Packet Loss", status: "Active" },
    { id: "AL-104", device: "Server-03", issue: "Service Down", status: "Critical" },
  ];

  // Filter devices based on search
  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download CSV
  const handleDownload = () => {
    let csv = "Device Name,IP Address,Type,Status\n";

    filteredDevices.forEach((device) => {
      csv += `${device.name},${device.ip},${device.type},${device.status}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "device_report.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button
            className="menu-btn"
            onClick={() => setSidebarHidden(!sidebarHidden)}
          >
            ☰
          </button>
          <h1>Monitoring Dashboard</h1>
        </div>

        <div className="header-right">
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button className="download-btn" onClick={handleDownload}>
            Download Report
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container">
        {/* Sidebar */}
        <aside className={sidebarHidden ? "sidebar hide" : "sidebar"}>
          <h2>Menu</h2>
          <ul>
            <li>Dashboard</li>
            <li>Alerts</li>
            <li>Devices</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Cards */}
          <section className="cards">
            <div className="card">
              <h3>Total Devices</h3>
              <p>{devices.length}</p>
            </div>

            <div className="card">
              <h3>Active Alerts</h3>
              <p>{alerts.length}</p>
            </div>

            <div className="card">
              <h3>Healthy Devices</h3>
              <p>{devices.filter((d) => d.status === "Healthy").length}</p>
            </div>

            <div className="card">
              <h3>Critical Devices</h3>
              <p>{devices.filter((d) => d.status === "Critical").length}</p>
            </div>
          </section>

          {/* Alerts Table */}
          <section className="table-section">
            <h2>Recent Alerts</h2>
            <table>
              <thead>
                <tr>
                  <th>Alert ID</th>
                  <th>Device</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td>{alert.id}</td>
                    <td>{alert.device}</td>
                    <td>{alert.issue}</td>
                    <td>
                      <span className={`badge ${alert.status.toLowerCase()}`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Devices Table */}
          <section className="table-section">
            <h2>Device Status</h2>
            <table>
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>IP Address</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device, index) => (
                  <tr key={index}>
                    <td>{device.name}</td>
                    <td>{device.ip}</td>
                    <td>{device.type}</td>
                    <td>
                      <span className={`badge ${device.status.toLowerCase()}`}>
                        {device.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;