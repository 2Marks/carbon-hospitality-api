const customers = [
  { name: "John Kyln", address: "planet earth", phone_number: "0802345445" },
  {
    name: "Tomiwa Adephil",
    address: "No 10, Lagos street",
    phone_number: "0803757575745",
  },
];

const data = customers.map((customer) => ({
  ...customer,
  created_at: new Date(),
  updated_at: new Date(),
}));

module.exports = { tableName: "customers", data, truncate: true };
