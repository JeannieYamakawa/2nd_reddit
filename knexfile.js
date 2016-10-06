// Update with your config settings.

module.exports = {
    test: {
      client: 'pg',
      connection: {
          host:'localhost',
        database: '2nd_reddit_test'
      }
    },

  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
      database:  '2nd_reddit_dev'
    }
  },

};
