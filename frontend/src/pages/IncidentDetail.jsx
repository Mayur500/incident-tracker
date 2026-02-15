import React from "react";

import { useEffect, useState } from "react";
import { fetchIncident, updateIncident } from "../api/incidents";

export default function IncidentDetail({ id, onBack }) {
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    fetchIncident(id).then(setIncident);
  }, [id]);

  if (!incident) return <p>Loading...</p>;

  async function save() {
    await updateIncident(id, {
      status: incident.status,
      owner: incident.owner,
      summary: incident.summary,
    });
    alert("Saved");
  }

  return (
    <div className="incident-detail">
      <button className="back-btn" onClick={onBack}>
        Back
      </button>

      <h3>{incident.title}</h3>

      <select
        value={incident.status}
        onChange={(e) => setIncident({ ...incident, status: e.target.value })}
      >
        <option>OPEN</option>
        <option>MITIGATED</option>
        <option>RESOLVED</option>
      </select>

      <div className="form-group">
        <input
          placeholder="Owner"
          value={incident.owner || ""}
          onChange={(e) => setIncident({ ...incident, owner: e.target.value })}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Summary"
          value={incident.summary || ""}
          onChange={(e) =>
            setIncident({ ...incident, summary: e.target.value })
          }
        />
      </div>

      <button className="save-btn" onClick={save}>
        Save Changes
      </button>
    </div>
  );
}
