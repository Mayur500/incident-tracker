import React, { useEffect, useState } from "react";
import { fetchIncidents } from "../api/incidents";

export default function IncidentList({ onSelect, onCreate }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchIncidents(page).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [page]);
  

  return (
    <div className="container">
      <div className="header">
        <h1>Incidents</h1>
        <button onClick={onCreate}>Create Incident</button>
      </div>

      <div className="filters">
        <input placeholder="Search..." />
        <select>
          <option value="">All Severities</option>
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Service</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item) => (
              <tr key={item.id} onClick={() => onSelect(item.id)}>
                <td>{item.title}</td>
                <td>{item.service}</td>
                <td>
                  <span className={`badge ${item.severity.toLowerCase()}`}>
                    {item.severity}
                  </span>
                </td>
                <td>{item.status}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
