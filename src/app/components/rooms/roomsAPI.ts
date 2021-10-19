import { APIHelper, APIRouter } from "../../helpers";
import { RoomController } from "./roomsContoller";

const router = APIRouter();

router.post("/rooms", (req, res) =>
  APIHelper({ req, res, controller: RoomController.create })
);

router.get("/rooms", (req, res) =>
  APIHelper({ req, res, controller: RoomController.getAll })
);

router.get("/rooms/:id", (req, res) =>
  APIHelper({ req, res, controller: RoomController.getOne })
);

export const roomsAPI = router;
