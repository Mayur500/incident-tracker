import React, { useState } from "react";
import { createIncident } from "../api/incidents";

export default function CreateIncident({ onBack }) {
  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "SEV3",
    owner: "",
    summary: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);
    if (!form.title || !form.service) {
      setError("Title and Service are required");
      return;
    }

    setLoading(true);
    try {
      const incident = await createIncident(form);
      alert(`Incident created successfully (ID: ${incident.id})`);
      onBack();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create incident");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container create-incident">
      <button className="back-btn" onClick={onBack}>
        Back
      </button>

      <h3>Create Incident</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        />

        <select
          value={form.severity}
          onChange={(e) => setForm({ ...form, severity: e.target.value })}
        >
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>

        <input
          placeholder="Owner"
          value={form.owner}
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
        />

        <textarea
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />
      </div>

      <button className="save-btn" onClick={submit} disabled={loading}>
        {loading ? "Creating..." : "Create Incident"}
      </button>
    </div>
  );
}
