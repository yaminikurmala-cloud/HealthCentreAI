import {
  collection,
  writeBatch,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function seedPHCs() {
  const batch = writeBatch(db);

  const phcs = [
    {
      id: "PHC Tadepalli",
      name: "PHC Tadepalli",
      district: "Tadepalli",
      status: "Active",
      doctorCount: 1,
      patientCount: 32,
      totalBeds: 25,
      occupiedBeds: 22,
      availableBeds: 3,
      testsAvailable: 5,
    },
    {
      id: "PHC Nunna",
      name: "PHC Nunna",
      district: "Nunna",
      status: "Active",
      doctorCount: 2,
      patientCount: 18,
      totalBeds: 25,
      occupiedBeds: 15,
      availableBeds: 10,
      testsAvailable: 7,
    },
    {
      id: "PHC Kanuru",
      name: "PHC Kanuru",
      district: "Kanuru",
      status: "Active",
      doctorCount: 2,
      patientCount: 14,
      totalBeds: 20,
      occupiedBeds: 18,
      availableBeds: 2,
      testsAvailable: 9,
    },
    {
      id: "PHC Mangalagiri",
      name: "PHC Mangalagiri",
      district: "Mangalagiri",
      status: "Active",
      doctorCount: 3,
      patientCount: 26,
      totalBeds: 30,
      occupiedBeds: 20,
      availableBeds: 10,
      testsAvailable: 8,
    },
    {
      id: "PHC Penamaluru",
      name: "PHC Penamaluru",
      district: "Penamaluru",
      status: "Active",
      doctorCount: 3,
      patientCount: 12,
      totalBeds: 20,
      occupiedBeds: 5,
      availableBeds: 15,
      testsAvailable: 10,
    },
    {
      id: "PHC Ibrahimpatnam",
      name: "PHC Ibrahimpatnam",
      district: "Ibrahimpatnam",
      status: "Active",
      doctorCount: 3,
      patientCount: 9,
      totalBeds: 20,
      occupiedBeds: 4,
      availableBeds: 16,
      testsAvailable: 10,
    },
  ];

  phcs.forEach((phc) => {
    const ref = doc(db, "phcs", phc.id);
    batch.set(ref, phc);
  });

  await batch.commit();

  alert("✅ PHCs Seeded Successfully");
}

export async function seedDoctors() {
  const batch = writeBatch(db);

  const doctors = [
    {
      id: "DR001",
      name: "Dr. Ravi Kumar",
      specialization: "General Physician",
      experience: 8,
      phone: "9876501001",
      email: "ravi@phc.gov.in",
      phcName: "PHC Tadepalli",
      status: "Available",
    },
    {
      id: "DR002",
      name: "Dr. Sushma Reddy",
      specialization: "Pediatrician",
      experience: 6,
      phone: "9876501002",
      email: "sushma@phc.gov.in",
      phcName: "PHC Nunna",
      status: "Available",
    },
    {
      id: "DR003",
      name: "Dr. Kiran Rao",
      specialization: "General Physician",
      experience: 10,
      phone: "9876501003",
      email: "kiran@phc.gov.in",
      phcName: "PHC Nunna",
      status: "Available",
    },
    {
      id: "DR004",
      name: "Dr. Lakshmi Devi",
      specialization: "Gynecologist",
      experience: 7,
      phone: "9876501004",
      email: "lakshmi@phc.gov.in",
      phcName: "PHC Kanuru",
      status: "Available",
    },
    {
      id: "DR005",
      name: "Dr. Harish Kumar",
      specialization: "General Physician",
      experience: 5,
      phone: "9876501005",
      email: "harish@phc.gov.in",
      phcName: "PHC Kanuru",
      status: "Available",
    },
    {
      id: "DR006",
      name: "Dr. Anjali Sharma",
      specialization: "General Physician",
      experience: 12,
      phone: "9876501006",
      email: "anjali@phc.gov.in",
      phcName: "PHC Mangalagiri",
      status: "Available",
    },
    {
      id: "DR007",
      name: "Dr. Naveen Kumar",
      specialization: "Orthopedic",
      experience: 9,
      phone: "9876501007",
      email: "naveen@phc.gov.in",
      phcName: "PHC Mangalagiri",
      status: "Available",
    },
    {
      id: "DR008",
      name: "Dr. Meghana Rao",
      specialization: "Pediatrician",
      experience: 4,
      phone: "9876501008",
      email: "meghana@phc.gov.in",
      phcName: "PHC Mangalagiri",
      status: "Available",
    },
    {
      id: "DR009",
      name: "Dr. Vinay Kumar",
      specialization: "General Physician",
      experience: 15,
      phone: "9876501009",
      email: "vinay@phc.gov.in",
      phcName: "PHC Penamaluru",
      status: "Available",
    },
    {
      id: "DR010",
      name: "Dr. Rekha Devi",
      specialization: "Gynecologist",
      experience: 8,
      phone: "9876501010",
      email: "rekha@phc.gov.in",
      phcName: "PHC Penamaluru",
      status: "Available",
    },
    {
      id: "DR011",
      name: "Dr. Ajay Kumar",
      specialization: "General Physician",
      experience: 6,
      phone: "9876501011",
      email: "ajay@phc.gov.in",
      phcName: "PHC Penamaluru",
      status: "Available",
    },
    {
      id: "DR012",
      name: "Dr. Swathi Reddy",
      specialization: "Pediatrician",
      experience: 11,
      phone: "9876501012",
      email: "swathi@phc.gov.in",
      phcName: "PHC Ibrahimpatnam",
      status: "Available",
    },
    {
      id: "DR013",
      name: "Dr. Manoj Kumar",
      specialization: "General Physician",
      experience: 13,
      phone: "9876501013",
      email: "manoj@phc.gov.in",
      phcName: "PHC Ibrahimpatnam",
      status: "Available",
    },
    {
      id: "DR014",
      name: "Dr. Priyanka Rao",
      specialization: "Gynecologist",
      experience: 7,
      phone: "9876501014",
      email: "priyanka@phc.gov.in",
      phcName: "PHC Ibrahimpatnam",
      status: "Available",
    },
  ];

  doctors.forEach((doctor) => {
    const ref = doc(db, "doctors", doctor.id);
    batch.set(ref, doctor);
  });

  await batch.commit();

  alert("✅ Doctors Seeded Successfully");
}
export async function seedPatients() {
  const batch = writeBatch(db);

  const patientDistribution = [
    { phc: "PHC Tadepalli", count: 18 },
    { phc: "PHC Mangalagiri", count: 10 },
    { phc: "PHC Nunna", count: 8 },
    { phc: "PHC Kanuru", count: 6 },
    { phc: "PHC Penamaluru", count: 4 },
    { phc: "PHC Ibrahimpatnam", count: 4 },
  ];

  const diseases = [
    "Dengue",
    "Dengue",
    "Dengue",
    "Viral Fever",
    "Malaria",
    "Typhoid",
    "Diabetes",
    "Hypertension",
  ];

 const statuses = [
  "Critical",
  "Critical",
  "Critical",
  "Stable",
  "Stable",
  "Stable",
  "Stable",
  "Stable",
];

  const genders = [
    "Male",
    "Female",
  ];

  let patientNumber = 1;

  for (const phc of patientDistribution) {
    for (let i = 0; i < phc.count; i++) {

      const id = `PT${String(patientNumber).padStart(3, "0")}`;

      let disease =
        diseases[Math.floor(Math.random() * diseases.length)];

      // Create Dengue outbreak in Tadepalli
      if (phc.phc === "PHC Tadepalli" && i < 10) {
        disease = "Dengue";
      }

const names = [
  "Ravi Kumar",
  "Suresh Reddy",
  "Lakshmi Devi",
  "Anjali Sharma",
  "Kiran Kumar",
  "Priya Reddy",
  "Swathi Rao",
  "Harish Kumar",
  "Meghana Devi",
  "Ajay Kumar",
  "Deepika Reddy",
  "Venkatesh Rao",
  "Naveen Kumar",
  "Bhavani Devi",
  "Rahul Krishna",
  "Sneha Reddy",
  "Vinay Kumar",
  "Pooja Sharma",
  "Mahesh Babu",
  "Keerthi Reddy",
  "Srinivas Rao",
  "Divya Lakshmi",
  "Praveen Kumar",
  "Sowmya Devi",
  "Arjun Reddy",
  "Nikhil Kumar",
  "Aishwarya Rao",
  "Chaitanya Kumar",
  "Durga Prasad",
  "Sandhya Devi",
  "Sai Kiran",
  "Madhavi Reddy",
  "Teja Kumar",
  "Ramya Lakshmi",
  "Rohit Sharma",
  "Sravani Devi",
  "Pavan Kumar",
  "Anusha Reddy",
  "Gopi Krishna",
  "Jyothi Devi",
  "Karthik Reddy",
  "Nandini Rao",
  "Lokesh Kumar",
  "Bhargavi Devi",
  "Abhishek Kumar",
  "Gayathri Reddy",
  "Surya Prakash",
  "Harika Devi",
  "Tarun Kumar",
  "Neha Sharma"
];

const villages = {
  "PHC Tadepalli": ["Tadepalli", "Undavalli"],
  "PHC Nunna": ["Nunna", "Enikepadu"],
  "PHC Kanuru": ["Kanuru", "Yanamalakuduru"],
  "PHC Mangalagiri": ["Mangalagiri", "Chinakakani"],
  "PHC Penamaluru": ["Penamaluru", "Poranki"],
  "PHC Ibrahimpatnam": ["Ibrahimpatnam", "Ketanakonda"],
};

const patient = {
  id,

  fullName: names[patientNumber - 1],

  age: Math.floor(Math.random() * 45) + 20,

  gender:
    genders[Math.floor(Math.random() * genders.length)],

  village:
    villages[phc.phc][
      Math.floor(Math.random() * villages[phc.phc].length)
    ],

  phcName: phc.phc,

  diagnosis: disease,

  status:
    statuses[Math.floor(Math.random() * statuses.length)],

  admittedDate: `2026-07-${String(
    Math.floor(Math.random() * 8) + 1
  ).padStart(2, "0")}`,
};
      const ref = doc(db, "patients", id);

      batch.set(ref, patient);

      patientNumber++;
    }
  }

  await batch.commit();

  alert("✅ 50 Patients Seeded Successfully");
}

export async function seedMedicines() {
  const batch = writeBatch(db);

  const medicineNames = [
    "Paracetamol 500mg",
    "Amoxicillin 500mg",
    "ORS Sachet",
    "Cetirizine 10mg",
    "Azithromycin 500mg",
    "Metformin 500mg",
    "Amlodipine 5mg",
    "Iron Tablets",
    "Vitamin C",
    "Doxycycline 100mg",
  ];

  const phcs = [
    "PHC Tadepalli",
    "PHC Nunna",
    "PHC Kanuru",
    "PHC Mangalagiri",
    "PHC Penamaluru",
    "PHC Ibrahimpatnam",
  ];

  let medicineId = 1;

  for (const phc of phcs) {
    for (let i = 0; i < medicineNames.length; i++) {

let stock = 120;
let required = 180;
let status = "Healthy";
let transferFrom = "No Transfer Required";

// ---------- PHC TADEPALLI ----------
if (phc === "PHC Tadepalli") {

  if (i === 0) {
    stock = 8;
    required = 250;
    status = "Critical";
    transferFrom = "PHC Ibrahimpatnam";
  }

  else if (i === 1) {
    stock = 12;
    required = 220;
    status = "Critical";
    transferFrom = "PHC Penamaluru";
  }

  else if (i === 2) {
    stock = 18;
    required = 200;
    status = "Warning";
    transferFrom = "PHC Mangalagiri";
  }

  else if (i === 3) {
    stock = 25;
    required = 170;
    status = "Warning";
    transferFrom = "PHC Nunna";
  }
}

// ---------- PHC KANURU ----------
else if (phc === "PHC Kanuru") {

  if (i === 0) {
    stock = 10;
    required = 230;
    status = "Critical";
    transferFrom = "PHC Penamaluru";
  }

  else if (i === 1) {
    stock = 22;
    required = 180;
    status = "Warning";
    transferFrom = "PHC Ibrahimpatnam";
  }

  else if (i === 4) {
    stock = 18;
    required = 190;
    status = "Warning";
    transferFrom = "PHC Nunna";
  }
}

// ---------- PHC NUNNA ----------
else if (phc === "PHC Nunna") {

  if (i === 5) {
    stock = 9;
    required = 210;
    status = "Critical";
    transferFrom = "PHC Penamaluru";
  }

  else if (i === 2) {
    stock = 24;
    required = 170;
    status = "Warning";
    transferFrom = "PHC Ibrahimpatnam";
  }
}

// ---------- PHC MANGALAGIRI ----------
else if (phc === "PHC Mangalagiri") {

  if (i === 7) {
    stock = 14;
    required = 210;
    status = "Critical";
    transferFrom = "PHC Penamaluru";
  }

  else if (i === 8) {
    stock = 28;
    required = 190;
    status = "Warning";
    transferFrom = "PHC Ibrahimpatnam";
  }
}

// ---------- PHC PENAMALURU ----------
else if (phc === "PHC Penamaluru") {

  if (i === 9) {
    stock = 11;
    required = 220;
    status = "Critical";
    transferFrom = "PHC Ibrahimpatnam";
  }

  else if (i === 6) {
    stock = 20;
    required = 170;
    status = "Warning";
    transferFrom = "PHC Nunna";
  }
}

// ---------- PHC IBRAHIMPATNAM ----------
else if (phc === "PHC Ibrahimpatnam") {

  if (i === 3) {
    stock = 13;
    required = 210;
    status = "Critical";
    transferFrom = "PHC Penamaluru";
  }

  else if (i === 4) {
    stock = 27;
    required = 180;
    status = "Warning";
    transferFrom = "PHC Mangalagiri";
  }
}
      // 🔴 Critical shortages in Tadepalli
      if (phc === "PHC Tadepalli") {
        if (i === 0) {
          stock = 8;
          required = 250;
          status = "Critical";
        } else if (i === 2) {
          stock = 15;
          required = 180;
          status = "Warning";
        } else if (i === 9) {
          stock = 6;
          required = 150;
          status = "Critical";
        }
      }

      // 🟡 Warning shortages in Kanuru
      if (phc === "PHC Kanuru") {
        if (i === 1 || i === 7) {
          stock = 20;
          required = 160;
          status = "Warning";
        }
      }

const medicine = {
  id: `MED${String(medicineId).padStart(3, "0")}`,
  name: medicineNames[i],
  phcName: phc,
  stock,
  required,
  status,
  transferFrom,
  lastUpdated: "2026-07-08",
};

      const ref = doc(db, "medicines", medicine.id);

      batch.set(ref, medicine);

      medicineId++;
    }
  }

  await batch.commit();

  alert("✅ 60 Medicines Seeded Successfully");
}
export async function seedTests() {
  const batch = writeBatch(db);

  const tests = [
    {
      id: "TEST001",
      phcName: "PHC Tadepalli",
      bloodPressure: true,
      bloodSugar: false,
      cbc: true,
      malaria: false,
      dengue: true,
      urine: false,
      pregnancy: true,
      ecg: false,
      xray: true,
      ultrasound: false,
      lastAudit: "2026-07-08",
    },

    {
      id: "TEST002",
      phcName: "PHC Nunna",
      bloodPressure: true,
      bloodSugar: true,
      cbc: true,
      malaria: false,
      dengue: true,
      urine: false,
      pregnancy: true,
      ecg: false,
      xray: true,
      ultrasound: true,
      lastAudit: "2026-07-08",
    },

    {
      id: "TEST003",
      phcName: "PHC Kanuru",
      bloodPressure: true,
      bloodSugar: true,
      cbc: true,
      malaria: true,
      dengue: true,
      urine: true,
      pregnancy: true,
      ecg: false,
      xray: true,
      ultrasound: true,
      lastAudit: "2026-07-08",
    },

    {
      id: "TEST004",
      phcName: "PHC Mangalagiri",
      bloodPressure: true,
      bloodSugar: true,
      cbc: true,
      malaria: true,
      dengue: true,
      urine: true,
      pregnancy: true,
      ecg: true,
      xray: true,
      ultrasound: true,
      lastAudit: "2026-07-08",
    },

    {
      id: "TEST005",
      phcName: "PHC Penamaluru",
      bloodPressure: true,
      bloodSugar: true,
      cbc: true,
      malaria: true,
      dengue: true,
      urine: true,
      pregnancy: true,
      ecg: true,
      xray: false,
      ultrasound: true,
      lastAudit: "2026-07-08",
    },

    {
      id: "TEST006",
      phcName: "PHC Ibrahimpatnam",
      bloodPressure: true,
      bloodSugar: true,
      cbc: true,
      malaria: true,
      dengue: true,
      urine: true,
      pregnancy: true,
      ecg: true,
      xray: true,
      ultrasound: true,
      lastAudit: "2026-07-08",
    },
  ];

  tests.forEach((test) => {
    const ref = doc(db, "tests", test.id);
    batch.set(ref, test);
  });

  await batch.commit();

  alert("✅ Tests Seeded Successfully");
}