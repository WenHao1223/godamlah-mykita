// Mock victim data after MyKad scan
export const mockVictims = [
  {
    id: "V001",
    nric: "880512-14-****",
    name: "Ahmad bin Abdullah",
    age: 36,
    gender: "Male",
    address: "No. 45, Jalan Mawar, Taman Indah",
    phone: "012-345****",
    registeredAt: "2024-01-15T08:30:00",
    ppsLocation: "SK Taman Melati",
    bedNumber: "A-12",
  },
  {
    id: "V002",
    nric: "950823-10-****",
    name: "Siti Nurhaliza binti Razak",
    age: 28,
    gender: "Female",
    address: "Blok C-12-5, Pangsapuri Seri",
    phone: "019-876****",
    registeredAt: "2024-01-15T09:15:00",
    ppsLocation: "SK Taman Melati",
    bedNumber: "B-08",
  },
  {
    id: "V003",
    nric: "670310-08-****",
    name: "Muthu a/l Krishnan",
    age: 57,
    gender: "Male",
    address: "No. 12, Lorong Cemara 3",
    phone: "016-234****",
    registeredAt: "2024-01-15T10:45:00",
    ppsLocation: "SK Taman Melati",
    bedNumber: "C-03",
  },
];

// Mock medical records with severity flags
export const mockMedicalRecords = [
  {
    victimId: "V001",
    conditions: ["Type 2 Diabetes", "Hypertension"],
    medications: ["Metformin 500mg", "Amlodipine 5mg"],
    severity: "warning",
    allergies: ["Penicillin"],
    bloodType: "A+",
    lastCheckup: "2024-01-15T14:00:00",
  },
  {
    victimId: "V002",
    conditions: ["Asthma (Mild)"],
    medications: ["Salbutamol Inhaler"],
    severity: "normal",
    allergies: [],
    bloodType: "O+",
    lastCheckup: "2024-01-15T11:30:00",
  },
  {
    victimId: "V003",
    conditions: ["Chronic Kidney Disease Stage 3", "Diabetes", "Heart Disease"],
    medications: ["Insulin", "Warfarin", "Furosemide"],
    severity: "critical",
    allergies: ["Sulfa drugs", "Iodine"],
    bloodType: "B-",
    lastCheckup: "2024-01-15T12:00:00",
  },
];

// Mock victim requests
export const mockRequests = [
  {
    id: "R001",
    victimId: "V001",
    victimName: "Ahmad bin Abdullah",
    type: "Supplies",
    item: "Extra blankets (2)",
    status: "pending",
    priority: "normal",
    createdAt: "2024-01-15T16:00:00",
  },
  {
    id: "R002",
    victimId: "V002",
    victimName: "Siti Nurhaliza binti Razak",
    type: "Medical",
    item: "Sanitary pads",
    status: "approved",
    priority: "normal",
    createdAt: "2024-01-15T14:30:00",
  },
  {
    id: "R003",
    victimId: "V003",
    victimName: "Muthu a/l Krishnan",
    type: "Medical",
    item: "Insulin refill - URGENT",
    status: "pending",
    priority: "high",
    createdAt: "2024-01-15T17:00:00",
  },
  {
    id: "R004",
    victimId: "V001",
    victimName: "Ahmad bin Abdullah",
    type: "Electronics",
    item: "Powerbank",
    status: "fulfilled",
    priority: "low",
    createdAt: "2024-01-15T10:00:00",
  },
];

// Mock doctor remarks
export const mockRemarks = [
  {
    id: "RM001",
    victimId: "V003",
    doctorName: "Dr. Lee Wei Ming",
    remark: "Patient requires daily insulin monitoring. Blood sugar levels unstable. Arrange priority dialysis transport if needed.",
    severity: "critical",
    createdAt: "2024-01-15T12:30:00",
  },
  {
    id: "RM002",
    victimId: "V001",
    doctorName: "Nurse Farah",
    remark: "Blood pressure slightly elevated (145/90). Continue monitoring twice daily.",
    severity: "warning",
    createdAt: "2024-01-15T15:00:00",
  },
];

// Mock PPS data
export const mockPPSLocations = [
  {
    id: "PPS001",
    name: "SK Taman Melati",
    address: "Jalan Taman Melati 1, 53100 Gombak",
    lat: 3.2156,
    lng: 101.7187,
    totalCapacity: 200,
    currentOccupancy: 156,
    bedsAvailable: 44,
    volunteers: 12,
    doctors: 2,
    nurses: 4,
    status: "operational",
    lastUpdated: "2024-01-15T18:00:00",
  },
  {
    id: "PPS002",
    name: "Dewan Komuniti Setapak",
    address: "Jalan Genting Kelang, 53300 Setapak",
    lat: 3.1892,
    lng: 101.7234,
    totalCapacity: 150,
    currentOccupancy: 148,
    bedsAvailable: 2,
    volunteers: 8,
    doctors: 1,
    nurses: 3,
    status: "near-capacity",
    lastUpdated: "2024-01-15T17:45:00",
  },
  {
    id: "PPS003",
    name: "Balai Raya Kampung Baru",
    address: "Jalan Raja Muda, 50300 KL",
    lat: 3.1677,
    lng: 101.7012,
    totalCapacity: 100,
    currentOccupancy: 45,
    bedsAvailable: 55,
    volunteers: 6,
    doctors: 1,
    nurses: 2,
    status: "operational",
    lastUpdated: "2024-01-15T17:30:00",
  },
];

// Mock resources inventory
export const mockResources = [
  { id: "RES001", name: "Mineral Water (500ml)", category: "Food & Water", quantity: 2450, unit: "bottles", minStock: 500, ppsId: "PPS001" },
  { id: "RES002", name: "Rice (5kg bags)", category: "Food & Water", quantity: 180, unit: "bags", minStock: 50, ppsId: "PPS001" },
  { id: "RES003", name: "Blankets", category: "Bedding", quantity: 85, unit: "pieces", minStock: 100, ppsId: "PPS001" },
  { id: "RES004", name: "First Aid Kits", category: "Medical", quantity: 24, unit: "kits", minStock: 10, ppsId: "PPS001" },
  { id: "RES005", name: "Paracetamol (strips)", category: "Medical", quantity: 340, unit: "strips", minStock: 100, ppsId: "PPS001" },
  { id: "RES006", name: "Sanitary Pads", category: "Hygiene", quantity: 420, unit: "packs", minStock: 100, ppsId: "PPS001" },
  { id: "RES007", name: "Baby Diapers", category: "Hygiene", quantity: 156, unit: "packs", minStock: 50, ppsId: "PPS001" },
  { id: "RES008", name: "Insulin Pens", category: "Medical", quantity: 12, unit: "pens", minStock: 20, ppsId: "PPS001" },
];

// Mock missing reports
export const mockMissingReports = [
  {
    id: "MR001",
    reporterId: "V002",
    type: "person",
    name: "Razak bin Hassan",
    relationship: "Father",
    description: "65 years old, last seen wearing blue shirt",
    lastLocation: "Taman Seri Gombak",
    status: "searching",
    createdAt: "2024-01-15T10:00:00",
  },
  {
    id: "MR002",
    reporterId: "V001",
    type: "pet",
    name: "Mimi",
    relationship: "Pet Cat",
    description: "Orange tabby, wearing blue collar",
    lastLocation: "Near house at Jalan Mawar",
    status: "searching",
    createdAt: "2024-01-15T11:30:00",
  },
];
