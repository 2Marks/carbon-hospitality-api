const rooms = [
  {
    room_type: "regular",
    hourly_rate: 1000,
    overstay_weekday_rate: 7,
    overstay_weekend_rate: 10,
  },
  {
    room_type: "deluxe",
    hourly_rate: 2000,
    overstay_weekday_rate: 8.5,
    overstay_weekend_rate: 12,
  },
  {
    room_type: "palatial",
    hourly_rate: 4000,
    overstay_weekday_rate: 11,
    overstay_weekend_rate: 16,
  },
];

const data = rooms.map((room) => ({
  ...room,
  created_at: new Date(),
  updated_at: new Date(),
}));

module.exports = { tableName: "rooms", data, truncate: true };
