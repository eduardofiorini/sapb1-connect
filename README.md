# SAP Business One Connection Library

SAPB1 Connect is a Node.js library for connecting and interacting with HANA databases, SQL Server, and the SAP Business One Service Layer.

## 📦 Installation

```sh
npm install sapb1-connect
```

## ⚙️ Configuration

Each connection requires a configuration object passed to the corresponding class constructor.

## 🚀 How to Use

### 🔹 Connecting to HANA DB

Example configuration:

```js
const config = {
    HOSTNAME: "your-hana-host",
    USERNAME: "your-hana-username",
    PASSWORD: "your-hana-password",
};
```

```js
const { HanaDB } = require("sapb1-connect");
const hana = new HanaDB(config);

async function getData() {
    try {
        const result = await hana.query("SELECT * FROM \"SBODEMOBR\".\"OUSR\"");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
```

### 🔹 Connecting to SQL Server

Example configuration:

```js
const config = {
    HOSTNAME: "your-sql-server",
    USERNAME: "your-sql-username",
    PASSWORD: "your-sql-password",
    DATABASE: "your-database",
};
```

```js
const { SqlServerDB } = require("sapb1-connect");
const sqlServer = new SqlServerDB(config);

async function getData() {
    try {
        const result = await sqlServer.query("SELECT * FROM OUSR");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
```

### 🔹 Connecting to SAP B1 Service Layer

Example configuration:

```js
const config = {
    HOSTNAME: "your-service-layer-host",
    PORT: "50000",
    VERSION: "v1",
    COMPANY: "your-company-db"
};
```

```js
const { ServiceLayer } = require("sapb1-connect");
const sl = new ServiceLayer(config);

async function login() {
    try {
        const session = await sl.token("username", "password");
        console.log("Session started:", session);
    } catch (error) {
        console.error(error);
    }
}
```

### 🔹 Making Requests to Service Layer

#### 🔸 GET Request
```js
async function getBusinessPartners() {
    try {
        const data = await sl.request("GET", "BusinessPartners");
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

#### 🔸 POST Request
```js
async function createBusinessPartner() {
    try {
        const body = { CardCode: "C12345", CardName: "New Partner" };
        const data = await sl.request("POST", "BusinessPartners", body);
        console.log("Created:", data);
    } catch (error) {
        console.error(error);
    }
}
```

#### 🔸 PATCH Request
```js
async function updateBusinessPartner() {
    try {
        const body = { CardName: "Updated Partner" };
        const data = await sl.request("PATCH", "BusinessPartners('C12345')", body);
        console.log("Updated:", data);
    } catch (error) {
        console.error(error);
    }
}
```

#### 🔸 DELETE Request
```js
async function deleteBusinessPartner() {
    try {
        const data = await sl.request("DELETE", "BusinessPartners('C12345')");
        console.log("Deleted:", data);
    } catch (error) {
        console.error(error);
    }
}
```

## 📖 Documentation

For more details on the available methods, refer to the [Official Service Layer Documentation](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html).

## 🛠️ Development

### Run Tests

```sh
npm test
```

### Generate Documentation

```sh
npm run doc
```

## 📜 License

MIT License

