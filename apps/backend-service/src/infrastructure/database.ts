import Database from "bun:sqlite";

export class DatabaseConnection {
    private dbClient : Database

    constructor(host: string){
        this.dbClient = new Database(host)
        this.initiate()
    }

    initiate(){
        this.dbClient.run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME
            );
        `);

        this.dbClient.run(`
            CREATE TABLE IF NOT EXISTS urls (
                id TEXT PRIMARY KEY NOT NULL,
                short_url TEXT UNIQUE NOT NULL, 
                long_url TEXT NOT NULL,         
                owner TEXT NOT NULL,     
                visited_count INTEGER DEFAULT 0,
                created_at DATETIME,
                updated_at DATETIME,
                FOREIGN KEY (owner) REFERENCES users(id) ON DELETE SET NULL
            );
            `)

    }

    getClient(): Database{
        return this.dbClient
    }
}