import { Room } from "../../database/models";
import { CreateRoomDTO, GetAllRoomsDTO } from "./roomsInterface";

export class RoomRepository {
  static async create(params: CreateRoomDTO) {
    return await Room.query().insert(params);
  }

  static async getAll(params: GetAllRoomsDTO) {
    return await Room.query().page(params.page - 1, params.per_page);
  }

  static async getById(id: number) {
    return await Room.query().findById(id);
  }

  static async getByType(roomType: string) {
    return await Room.query().findOne({ room_type: roomType });
  }
}
