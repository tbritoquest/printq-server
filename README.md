

## Description

Node.js Rest API with Express and MySQL

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* npm
* node.js
* npx
* MySQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Configure & Connect to MySQL database in `config.json`
   ```js
   "username" : "root",
   "password" : "",
   "database" : "printq_development",
   "host" : "localhost"
   ```
5. Start MySQL
6. Create database "printq_development"
7. Run application
    ```
    node server.js
    ```
8. Running Seeds
    ```
    cd printq-server/app
    ```
    ```
    npx sequelize-cli db:seed:all
    ```


