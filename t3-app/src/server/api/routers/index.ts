import { customerRouter } from "./customer";
import { machineRouter } from "./machine";
import { paymentRouter } from "./payments";
import { serviceRouter } from "./service";
import { userRouter } from "./users";
import { utilsRouter } from "./utils";

export const routers = {
  user: userRouter,
  customer: customerRouter,
  service: serviceRouter,
  utils: utilsRouter,
  machine: machineRouter,
  payments: paymentRouter,
};
