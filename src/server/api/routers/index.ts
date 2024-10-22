import { customerRouter } from "./customer";
import { serviceRouter } from "./service";
import { userRouter } from "./users";

export const routers = {
  user: userRouter,
  customer: customerRouter,
  service: serviceRouter,
};
