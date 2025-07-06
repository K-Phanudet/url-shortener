import { Elysia } from "elysia";
import { configuration} from "./configurations/configurations"
import { LoginUseCase } from "./use-cases/login.usecase";
import { UserService } from "./services/user.service";
import { UserRepository } from "./repositories/user.repository";
import { authController } from "./controllers/auth.controller";
import { swagger } from '@elysiajs/swagger'
import { DatabaseConnection } from "./infrastructure/database";
import { CreateUserUseCase } from "./use-cases/create-user.usecase";
import { userController } from "./controllers/user.controller";
import jwt from "@elysiajs/jwt";
import { CreateUrlUseCase } from "./use-cases/create-url.usecase";
import { UrlRepository } from "./repositories/url.repository";
import { UrlService } from "./services/url.service";
import { urlController } from "./controllers/url.controller";
import { FetchUrlListUsecase } from "./use-cases/fetch-url-list.usecase";
import { DeleteUrlUsecase } from "./use-cases/delete-url.usecase";
import { GetUrlByIdUsecase } from "./use-cases/get-url-by-id.usecase";
import { UpdateLongUrlUseCase } from "./use-cases/update-long-url.usecase";

const db = new DatabaseConnection(configuration.database);

// repositories
const userRepository = new UserRepository(db.getClient())
const urlRepository = new UrlRepository(db.getClient())

// services
const userService = new UserService(userRepository)
const urlService = new UrlService(urlRepository)

// usecases
const loginUseCase = new LoginUseCase(userService)
const createUserUseCase = new CreateUserUseCase(userService)
const createUrlUseCase = new CreateUrlUseCase(urlService)
const fetchUrlListUsecase = new FetchUrlListUsecase(urlService)
const deleteUrlUseCase = new DeleteUrlUsecase(urlService)
const getUrlByIdUseCase = new GetUrlByIdUsecase(urlService)
const updateLongUrlUseCase = new UpdateLongUrlUseCase(urlService)

const app = new Elysia().use(swagger())

app.use(
        jwt({
            name: 'jwt',
            secret: configuration.jwtSecret
        })
    )

app.use(authController(loginUseCase))
app.use(userController(createUserUseCase))
app.use(urlController(
  createUrlUseCase, 
  fetchUrlListUsecase,
  getUrlByIdUseCase,
  deleteUrlUseCase,
  updateLongUrlUseCase
))
app.get("/", () => "Hello Elysia!")
app.listen(configuration.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;

