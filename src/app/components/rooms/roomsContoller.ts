import { RoomService } from ".";
import { validate } from "../../helpers";
import { CreateRoomDTO, GetAllRoomsDTO, GetOneRoomDTO } from "./roomsInterface";
import {
  createRoomSchema,
  getAllRoomsSchema,
  getOneRoomSchema,
} from "./roomsSchema";

export class RoomController {
  static async create(params: CreateRoomDTO) {
    const value = validate(params, createRoomSchema);
    const data = await RoomService.create(value);

    return {
      data,
      message: "Room created successfully",
    };
  }

  static async getAll(params: GetAllRoomsDTO) {
    const value = validate(params, getAllRoomsSchema);
    const data = await RoomService.getAll(value);

    return {
      data,
      message: "Rooms fetched successfully",
    };
  }

  static async getOne(params: GetOneRoomDTO) {
    const value = validate(params, getOneRoomSchema);
    const data = await RoomService.getOne(value);

    return {
      data,
      message: "Room fetched successfully",
    };
  }
}
