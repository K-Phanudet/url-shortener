import { Elysia, status, t, } from "elysia";
import { CreateUrlUseCase } from "../use-cases/create-url.usecase";
import { jwtDecode } from "jwt-decode";
import { IJwtPayload } from "../interfaces/auth/jwt-payload";
import { FetchUrlListUsecase } from "../use-cases/fetch-url-list.usecase";
import { GetUrlByIdUsecase } from "../use-cases/get-url-by-id.usecase";
import { DeleteUrlUsecase } from "../use-cases/delete-url.usecase";
import { UpdateLongUrlUseCase } from "../use-cases/update-long-url.usecase";

export const urlController = (
    createUrlUseCase: CreateUrlUseCase,
    fetchUrlListUsecase: FetchUrlListUsecase,
    getUrlByIdUseCase: GetUrlByIdUsecase,
    deleteUrlUseCase: DeleteUrlUsecase,
    updateLongUrlUseCase: UpdateLongUrlUseCase
) => new Elysia({ prefix: "/url" })
    .derive(({ cookie: { auth } }) => {
        const user = jwtDecode<IJwtPayload>(auth.value ?? "")
        return {
            user
        }
    })
    .post(
        '/',
        async ({ body, user }) => {
            await createUrlUseCase.execute({
                longUrl: body.url,
                owner: user.id
            })

            return status(201)
        }, {
        body: t.Object({
            url: t.String(),
        })
    }
    )
    .get(
        '/',
        async ({ user }) => {
            return fetchUrlListUsecase.execute(user.id)
        }
    )
    .get(
        '/:id',
        async ({ params: { id } }) => {
            return getUrlByIdUseCase.execute(id)
        }
    )
    .patch(
        "/:id",
        async ({ params: { id }, body }) => {
            return updateLongUrlUseCase.execute({ id, longUrl: body.longUrl })
        },
        {
            body: t.Object({
                longUrl: t.String()
            })
        }
    )
    .delete(
        '/:id',
        async ({ params: { id } }) => {
            return deleteUrlUseCase.execute(id)
        },
    )
