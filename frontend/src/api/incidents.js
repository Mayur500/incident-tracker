const BASE_URL = "http://localhost:4000/api/incidents";

export async function fetchIncidents(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}?${query}`);
  return res.json();
}

export async function fetchIncident(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createIncident(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateIncident(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
