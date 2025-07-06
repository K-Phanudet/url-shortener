import { Elysia, status, t } from 'elysia'
import { CreateUserUseCase } from '../use-cases/create-user.usecase';
import { CreateUserDtoSchema } from './schemas/user.schema';

export const userController = (
    createUserUseCase: CreateUserUseCase,
) =>
    new Elysia({ prefix: "/user" })
        .post(
            '/',
            async ({ body }) => {
                const { username, password } = body;
                await createUserUseCase.execute(username, password);
                return status(201)
            },
            {
                body: CreateUserDtoSchema,
            }
        )
        