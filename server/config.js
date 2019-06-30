const env = process.env.DB_HOST;
  
const development = {
        API_KEY: "",
        DB_URI: "localhost"    
  } 

const production = {
        API_KEY: process.env.API_KEY,
        DB_URI: `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  }

module.exports = () =>  {
  return env ? production : development;
}



