import AppError from "./AppError"

export default {
    DELIVERY_NOT_FOUND: () =>
        new AppError("Delivery not found", 404),
    USER_NOT_FOUND: () =>
        new AppError("User not found", 404),

    DELIVERY_MUST_BE_SHIPPED: () =>
        new AppError("Change status to shipped", 400),

    DELIVERY_ALREADY_DELIVERED: () =>
        new AppError("This order has already been delivered", 400),

    DELIVERY_FORBIDDEN: () =>
        new AppError(
            "The user can only view his own deliveries",
            401
        ),

    INVALID_CREDENTIALS: () =>
        new AppError("Invalid credentials", 401),

    EMAIL_ALREADY_EXISTS: () =>
        new AppError("Email already exists", 409),

    UNAUTHORIZED: () =>
        new AppError("Unauthorized", 401),
}