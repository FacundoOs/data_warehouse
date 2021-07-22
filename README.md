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

<p align="center">
  <img src="https://user-images.githubusercontent.com/68663401/126636961-ecaaa78c-16c8-4787-a7b9-f408f760467e.gif" width="80%" alt="data_warehouse1" />
  <img src="https://user-images.githubusercontent.com/68663401/126637220-92ccd1fd-a2c5-45e7-801f-1e2eb6bdb8fe.gif" width="80%" alt="data_warehouse2" />
  <img src="https://user-images.githubusercontent.com/68663401/126637480-c064bcc5-7f26-4d23-96c6-8e0b89b3bae9.gif" width="80%" alt="data_warehouse3" />
  <img src="https://user-images.githubusercontent.com/68663401/126637536-71629e24-a0d6-4479-8255-dd152f3c1ddc.gif" width="80%" alt="data_warehouse4" />
</p>

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




