import { APIHelper, APIRouter } from "../../helpers";
import { ReservationController } from "./reservationsController";

const router = APIRouter();

router.post("/reservations", (req, res) =>
  APIHelper({ req, res, controller: ReservationController.create })
);

router.get("/reservations", (req, res) =>
  APIHelper({
    req,
    res,
    controller: ReservationController.getAll,
    expectPayload: false,
  })
);

router.get("/reservations/:id", (req, res) =>
  APIHelper({ req, res, controller: ReservationController.getOne })
);

router.patch("/reservations/:id/checkin", (req, res) =>
  APIHelper({ req, res, controller: ReservationController.checkin })
);

router.patch("/reservations/:id/checkout", (req, res) =>
  APIHelper({ req, res, controller: ReservationController.checkout })
);

export const reservationsAPI = router;
