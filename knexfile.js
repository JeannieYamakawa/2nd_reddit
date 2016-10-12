// Update with your config settings.

module.exports = {
    test: {
      client: 'pg',
      connection: {
          host:'localhost',
        database: '2nd_reddit_test'
      }
    },
production: {
    client: 'pg',
    connection:   {
        dbname: 'd5p2ugapnpc6ch',
        host: 'ec2-23-23-225-246.compute-1.amazonaws.com',
        user: 'pqysxyyasdboqa',
        password: 'gyUmXJEk-a0tT3wegYj5YEhOB2',
        sslmode: 'require'
    }


    "dbname=d5p2ugapnpc6ch host=ec2-23-23-225-246.compute-1.amazonaws.com port=5432 user=pqysxyyasdboqa password=gyUmXJEk-a0tT3wegYj5YEhOB2 sslmode=require"

    'postgres://pqysxyyasdboqa:gyUmXJEk-a0tT3wegYj5YEhOB2@ec2-23-23-225-246.compute-1.amazonaws.com:5432/d5p2ugapnpc6ch'


},

  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
      database:  '2nd_reddit_dev'
    }
  },

};
