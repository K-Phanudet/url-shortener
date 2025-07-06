import { t } from "elysia";

export const CreateUserDtoSchema = t.Object({
    username: t.String(),
    password: t.String()
})


export type CreateUserDto = typeof CreateUserDtoSchema.static;