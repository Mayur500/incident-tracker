import React, { useEffect, useState } from "react";
import { fetchIncidents } from "../api/incidents";

export default function IncidentList({ onSelect, onCreate }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const params = {
      page,
      search,
      severity: severityFilter,
      status: statusFilter,
    };

    fetchIncidents(params).then((res) => {
      setData(res.data);
      setTotalPages(res.pagination.totalPages);
    });
  }, [page, search, severityFilter, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, severityFilter, statusFilter]);

  return (
    <div className="container">
      <div className="header">
        <h1>Incidents</h1>
        <button onClick={onCreate}>Create Incident</button>
      </div>

      <div className="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="SEV1">SEV1</option>
          <option value="SEV2">SEV2</option>
          <option value="SEV3">SEV3</option>
          <option value="SEV4">SEV4</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="OPEN">OPEN</option>
          <option value="MITIGATED">MITIGATED</option>
          <option value="RESOLVED">RESOLVED</option>
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
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
