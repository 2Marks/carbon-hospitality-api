export interface CreateRoomDTO {
  room_type: string;
  hourly_rate: number;
  overstay_weekday_rate: number;
  overstay_weekend_rate: number;
}

export interface GetAllRoomsDTO {
  page: number;
  per_page: number;
}

export interface GetOneRoomDTO {
  id: number;
}
