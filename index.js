const hdb = require("@sap/hana-client");
const sql = require("mssql");
const axios = require("axios");
const https = require("https");

class HanaDB {
    constructor(config) {
        this.connOptions = {
            serverNode: config.HOSTNAME,
            uid: config.USERNAME,
            pwd: config.PASSWORD
        };
    }
    async query(query) {
        const conn = hdb.createConnection();
        return new Promise((resolve, reject) => {
            conn.connect(this.connOptions, (err) => {
                if (err) return reject(err);
                conn.exec(query, (err, result) => {
                    conn.disconnect();
                    err ? reject(err) : resolve(result);
                });
            });
        });
    }
}

class SqlServerDB {
    constructor(config) {
        this.connOptions = {
            user: config.USERNAME,
            password: config.PASSWORD,
            database: config.DATABASE,
            server: config.HOSTNAME,
            pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
            options: { encrypt: false, trustServerCertificate: false }
        };
    }
    async query(query) {
        try {
            await sql.connect(this.connOptions);
            const result = await sql.query(query);
            await sql.close();
            return result;
        } catch (err) {
            throw err;
        }
    }
}

class ServiceLayer {
    constructor(config) {
        this.host = config.HOSTNAME;
        this.port = config.PORT;
        this.version = config.VERSION;
        this.company = config.COMPANY;
        this.sessionId = "";
        this.instance = axios.create({
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
    }
    async token(username, password) {
        try {
            const response = await this.instance.post(`${this.host}:${this.port}/b1s/${this.version}/Login`, {
                UserName: username, Password: password, CompanyDB: this.company
            });
            this.sessionId = response.data.SessionId;
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async request(method, endpoint, data = null) {
        try {
            const response = await this.instance({
                method,
                url: `${this.host}:${this.port}/b1s/${this.version}/${endpoint}`,
                headers: { 'Cookie': `B1SESSION=${this.sessionId};` },
                data
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { HanaDB, SqlServerDB, ServiceLayer };
