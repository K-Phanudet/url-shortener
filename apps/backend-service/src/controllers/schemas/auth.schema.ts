import { t } from "elysia";

export const LoginDtoSchema = t.Object({
    username: t.String(),
    password: t.String()
})

export const LoginResponseDtoSchema = t.Object({
    accessToken: t.String(),
});

export type LoginDto = typeof LoginDtoSchema.static;
export type LoginResponseDto = typeof LoginResponseDtoSchema.static;