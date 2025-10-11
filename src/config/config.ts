
import dotenv from 'dotenv';

dotenv.config()

const config = {
    PORT: process.env.PORT || '3000',
    HOST: process.env.HOST || '127.0.1.1',
    DBNAME: process.env.DB_NAME || '',
    DBUSER: process.env.DB_USER || '',
    DBPWD: process.env.DB_PASSWORD || '',
    JWTAUTHKEY: process.env.JWTAUTHKEY || 'secretkey'
}

export default config