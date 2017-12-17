# Api that perfroms CRUD operations a mongodb database with  ALC students name
 Javascript files output is in dist folder


## To run it in a docker environment as a container 
`$ git clone https://github.com/Demi-ob/alc_node.git`

`$ run docker-compose build`

`$ run docker-compose up`
 
 Note: for a docker environment a mongodb server is already setup in Dockerfile at `mongodb:mongo:27010/alc`

 Also in .env file,  `MONGODB_URI = "mongodb://mongo:27017/alc"`

 localhost isnt used to prevent conflict

 OR

docker image can also be downlaoded by running 

`$ docker pull demilade/alc_node`


## To run in a system environment

1. clone repository `$ git clone https://github.com/Demi-ob/alc_node.git`
2. Install dependencies - `npm install`
3. Compile - `gulp scripts` 
4. Run the development server - `npm start`

Note: for a system environment a mongodb server should be created at `mongodb:localhost:27010/alc`

Also in .env file MONGODB_URI should be changed, `MONGODB_URI = "mongodb://localhost:27017/alc"`



# API Routes

## Get list of students
GET localhost:3000/api/v1/students

example: `http.get(localhost:3000/api/v1/students)`

## Add new student
@params {string} req.body.name

POST localhost:3000/api/v1/students

example: `http.post(localhost:3000/api/v1/students, {name: "Demilade"})`

## update student name
(student_id is  "_id" key in response object when a student is gotten from database)

@params {string} req.params.student_id

@params {string} req.body.name

POST localhost:3000/api/v1/students/:student_id

example: `http.put(localhost:3000/api/v1/students/{_id}, {name: "Updated Demilade"})`

## delete student
@params {string} req.params.student_id

POST localhost:3000/api/v1/students/:student_id

example: `http.put(localhost:3000/api/v1/students/{_id})`

