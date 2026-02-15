import React from "react";

import { useState } from "react";
import IncidentList from "./pages/IncidentList";
import IncidentDetail from "./pages/IncidentDetail";
import CreateIncident from "./pages/CreateIncident";

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedId, setSelectedId] = useState(null);

  if (page === "detail") {
    return (
      <IncidentDetail
        id={selectedId}
        onBack={() => setPage("list")}
      />
    );
  }

  if (page === "create") {
    return <CreateIncident onBack={() => setPage("list")} />;
  }

  return (
    <IncidentList
      onCreate={() => setPage("create")}
      onSelect={(id) => {
        setSelectedId(id);
        setPage("detail");
      }}
    />
  );
}
