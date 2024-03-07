# Employee Management API

This is a simple Express.js application that provides a RESTful API for managing employee data. The application uses MongoDB as its database and Mongoose for object modeling.

## Features

The application provides the following endpoints:

- `GET /employees`: Fetch all employees.
- `GET /employees/:employeeName`: Fetch a specific employee by name.
- `PUT /employees/:employeeName`: Update a specific employee by name.
- `PATCH /employees/:employeeName`: Partially update a specific employee by name.
- `DELETE /employees/:employee`: Delete a specific employee by name or id.
- `POST /employees`: Create a new employee.

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Ensure MongoDB is running on your machine or update the MongoDB connection string to point to your MongoDB instance.
4. Run `node app.js` to start the server.

## Usage

To interact with the API, you can use any HTTP client like curl or Postman. Here is an example of creating a new employee:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"employeeName": "John Doe", "employeeDepartment": "Engineering", "employeeSalary": 5000}' http://localhost:3000/employees
```

## Dependencies

- Express.js: Web application framework.
- Body-parser: Middleware to parse HTTP request body.
- Mongoose: MongoDB object modeling tool.

## License

This project is licensed under the MIT License.
