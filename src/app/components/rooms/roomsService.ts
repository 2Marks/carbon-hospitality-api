import { isEmpty, isNotEmpty } from "../../helpers";
import {
  ResourceExistError,
  ResourceNotFoundError,
} from "../../helpers/errors";
import { CreateRoomDTO, GetAllRoomsDTO, GetOneRoomDTO } from "./roomsInterface";
import { RoomRepository } from "./roomsRepository";

export class RoomService {
  static async create(params: CreateRoomDTO) {
    const room = await RoomRepository.getByType(params.room_type);

    if (isNotEmpty(room)) {
      throw new ResourceExistError({ message: "Room aleady exist" });
    }

    return await RoomRepository.create(params);
  }

  static async getAll(params: GetAllRoomsDTO) {
    return await RoomRepository.getAll(params);
  }

  static async getOne(params: GetOneRoomDTO) {
    const room = await RoomRepository.getById(params.id);

    if (isEmpty(room)) {
      throw new ResourceNotFoundError({ message: "Room not found" });
    }

    return room;
  }

  static async validate(id: number) {
    const room = await RoomRepository.getById(id);

    if (isEmpty(room)) {
      throw new ResourceNotFoundError({ message: "Room not found" });
    }

    return room;
  }
}
