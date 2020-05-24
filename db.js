const Pool = require("pg").Pool;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL || "postgres://ygvvuxfqhwqwab:f1615e5b286fe9fb51965bf26502845d31988b6217e9fe30003312f4ea3d98a1@ec2-34-225-82-212.compute-1.amazonaws.com:5432/dctjb62hm74b1f",
  	// ssl: true
  	ssl: {
    	rejectUnauthorized: false
  	}
});

module.exports = pool;