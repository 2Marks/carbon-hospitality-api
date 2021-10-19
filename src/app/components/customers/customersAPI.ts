import { APIHelper, APIRouter } from "../../helpers";
import { CustomerController } from "./customersController";

const router = APIRouter();

router.post("/customers", (req, res) =>
  APIHelper({ req, res, controller: CustomerController.create })
);

router.get("/customers", (req, res) =>
  APIHelper({ req, res, controller: CustomerController.getAll })
);

router.get("/customers/:id", (req, res) =>
  APIHelper({ req, res, controller: CustomerController.getOne })
);

router.patch("/customers/:id", (req, res) =>
  APIHelper({ req, res, controller: CustomerController.create })
);

export const customersAPI = router;
