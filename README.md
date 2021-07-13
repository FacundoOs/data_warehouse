# Data Warehouse

App that allows a Marketing company to manage all the contacts of its clients for their campaigns.

### Frontend
- HTML
- JavaScript
- SaaS

### Backend
- Node.js
- Express
- MongoDB

## Procedimiento:

### **1 - Install**

Clone the repository:
https://github.com/FacundoOs/data_warehouse

Installl dependencies:
```
yarn
```

After that create a .env file in the main folder and add:
```
MONGO_URI="your mongo uri"
PORT="port number"
FIRST_ADMIN=AdminAccount
TOKEN_SECRET="your secret key for jsonwebtoken"
```

### **2- Start the servers**

#### Backend
Run:
```
nodemon index.js
```

#### Frontend
If you are using Visual Studio Code and have the Live Server extension press on Go Live to start the server

