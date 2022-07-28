module.exports = {
  development: {
    url: `postgres://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${
      process.env.DB_PORT
    }/${process.env.DB_NAME}`,
    dialect: 'postgres',
  },

  test: {
    url: `postgres://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${
      process.env.DB_PORT
    }/${process.env.DB_NAME}`,
    dialect: 'postgres',
  },

  production: {
    url: `postgres://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${
      process.env.DB_PORT
    }/${process.env.DB_NAME}`,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};
