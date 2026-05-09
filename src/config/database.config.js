const config = {
    HOST: 'localhost',
    USER:'postgres',
    PASSWORD:'postgres',
    DB:'cybercoffeedb',
    dialect:'postgres',
    PORT: '5433',
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}

export default config;