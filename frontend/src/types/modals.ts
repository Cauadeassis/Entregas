import type Delivery from "./deliveries";
export type CrudDeliveriesModal =
    | { type: "create" }
    | { type: "update"; delivery: Delivery }
    | null
export type LoginModal = "login" | "register"