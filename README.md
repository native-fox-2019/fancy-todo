# Fancy TODO

## How to setup database

1. Install PostgreSQL
2. Create new database named FancyToDo
3. Create `.env` file:

    ```
    DB_USER=yourpostgresusername
    DB_PASSWORD=yourpassword
    ```

4. Execute: `npx sequelize-cli db:migrate`

## How to run Server

```
cd Server
npm i
npm run start
```

## How to run Client

```
cd Client
npm i -g parcel
parcel index.html
```

## How to test App

Open in browser: `http://localhost:1234`
