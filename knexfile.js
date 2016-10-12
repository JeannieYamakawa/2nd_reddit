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
  production: {
      client: 'pg',
      connection: 'postgres://pqysxyyasdboqa:gyUmXJEk-a0tT3wegYj5YEhOB2@ec2-23-23-225-246.compute-1.amazonaws.com:5432/d5p2ugapnpc6ch',

  }
};
