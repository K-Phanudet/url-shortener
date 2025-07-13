import { Elysia, redirect, t } from 'elysia'
import { EnterShortUrlUseCase } from '../use-cases/enter-short-url.usecase'

export const shortUrlController = (enterShortUrlUseCase : EnterShortUrlUseCase) => 
    new Elysia()
        .get(
            "/:shortUrl",
            async({ params : { shortUrl }}) => {
               const url = await enterShortUrlUseCase.execute(shortUrl)
               return redirect(url, 301)
            return {}
            }, 
            {
                params: t.Object({
                    shortUrl: t.String()
                })
            }
        )