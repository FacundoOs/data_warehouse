# Data Warehouse

App that allows a Marketing company to manage all the contacts of its clients for their campaigns.

It allows CRUD operations to be carried out on a contact database that includes their personal data, their preferences, contact details, where they work, and where they live.

### Contacts section
The most important section! It allows us to detail all our contacts.
You can create, edit and delete any contact and also search by name, region, company, interest, etc.

### Users section
The users (company employees) who can use the application will be created here.

### Companies section
All the companies for which our contacts work.
You can also list, create, edit and delete any company from here.

### Region/City section
In this section a tree of Regions, Countries and Cities is displayed.
Allows you to list, create, edit and delete any of the branches of the tree.

## Technologies used

### Frontend
- HTML
- JavaScript
- SaaS

### Backend
- Node.js
- Express
- MongoDB

The first time you run the server, it will create the first administrator user with which you can log in to start using the app.
```
User: adminAccount@mail.com
Password: AdminAccount
```

## Procedure:

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
If you are using Visual Studio Code and have the Live Server extension go to "public/home.html" and then press Go Live to start the server

