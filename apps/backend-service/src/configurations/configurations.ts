export const configuration = {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '8080', 10),
    database: process.env.DATABASE ?? "",
    jwtSecret: process.env.JWT_SECRET ?? ""
}