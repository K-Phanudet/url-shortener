import { Elysia, t } from 'elysia'
import { LoginUseCase } from '../use-cases/login.usecase';
import { sign } from "bun-jwt";
import { configuration } from '../configurations/configurations';
import { LoginDtoSchema, LoginResponseDtoSchema } from './schemas/auth.schema';


export const authController = (loginUseCase: LoginUseCase) =>
    new Elysia({ prefix: "/auth" })
        .post(
            '/login',
            async ({ body, cookie: { auth } }) => {
                const { username, password } = body;
                const user = await loginUseCase.execute({ username, password });
                const jwtToken = await sign({
                    id: user.id,
                    username: user.username,
                    createdAt: user.createdAt.toISOString(),
                }, configuration.jwtSecret, { expires: "1h" }) as string
                console.log("PAss")
                auth.set({
                    value: jwtToken,
                    httpOnly: true,
                    maxAge: 3600,
                    path: '/',
                })

                return { accessToken: jwtToken }
            },
            {
                body: LoginDtoSchema,
                response: LoginResponseDtoSchema,
            }
        );