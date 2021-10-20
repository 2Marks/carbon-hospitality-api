<!-- ABOUT THE PROJECT -->
## Project Overview


Test project to implement some set of API's for an hospitality reservation booking system.


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Node js](https://nodejs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [MySQL](https://www.mysql.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


### Running the project

1. Clone the repo. 
2. Make sure you have node and MySQL installed
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure your environment. Run the command below to make an env file
   ```sh
   npm run env:copy
   ```
5. Update the env file with the config as stated
6. Run database migrations
   ```sh
   npm run migrate
   ```
7. Run database seeds
   ```sh
   npm run seed all
   ```
8. Run the command below to start the project
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


### What has been covered.

The API services is splitted into three feature components:
   ```sh
   NOTE:  {{serverUrl}} = {{baseUrl}}/api/v1/ e.g http://localhost:4000/api/v1
   ```

#### Customers
The customer's endpoint allows you create one, get all customers. more information on the endpoints below:

1. Create Customer - POST
2. Get All Customers - GET
3. Get One Customer - GET


#### Rooms
The rooms's endpoint allows you create one, get all rooms. more information on the endpoints below:

1. Create Room - POST
2. Get All Rooms - GET
3. Get One Room - GET


#### Reservations
The reservations's endpoint allows you create one, get all reservations. more information on the endpoints below:

1. Create Reservation - POST
2. Get All Reservations - GET (response includes computed overstay fees and hours)
3. Get One Reservation - GET
4. Checkin Reservation - PATCH
5. Checkout Reservation - PATCH


All the endpoints both have the same response structure as described below:
```js
   {
    "success": boolean, // true if everything goes well.
    "message": string   //description of the data,
    "data":  number | string | Array | object //data here can be string,array or object
   }
```


<!-- POSTMAN COLLECTION LINK-->
## Kindly download the postman collection from the link below

[Click to dowbload postman collection](https://www.getpostman.com/collections/95ea01b7bfcb86111cd6)