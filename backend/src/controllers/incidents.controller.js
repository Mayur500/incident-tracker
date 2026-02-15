const prisma = require("../db");

async function createIncident(req, res) {
  const data = req.body;

  if (!data.status) {
    data.status = "OPEN";
  }

  const incident = await prisma.incident.create({
    data: data,
  });

  res.status(201).json(incident);
}

async function getIncidents(req, res) {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "20");

  const search = req.query.search;
  const severity = req.query.severity;
  const status = req.query.status;

  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";

  const whereClause = {};

  if (severity) {
    whereClause.severity = severity;
  }

  if (status) {
    whereClause.status = status;
  }

  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { service: { contains: search, mode: "insensitive" } },
    ];
  }

  const incidents = await prisma.incident.findMany({
    where: whereClause,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
  });

  const totalCount = await prisma.incident.count({
    where: whereClause,
  });

  res.json({
    data: incidents,
    pagination: {
      page: page,
      limit: limit,
      totalRecords: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  });
}

async function getIncidentById(req, res) {
  const id = req.params.id;

  const incident = await prisma.incident.findUnique({
    where: { id: id },
  });

  if (!incident) {
    return res.status(404).json({ message: "Incident not found" });
  }

  res.json(incident);
}

async function updateIncident(req, res) {
  const id = req.params.id;

  const updatedIncident = await prisma.incident.update({
    where: { id: id },
    data: req.body,
  });

  res.json(updatedIncident);
}

module.exports = {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
};
