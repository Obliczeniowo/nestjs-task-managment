# to create project

nest new project-name

# to install

  npm i class-validator class-transformer

typeorm and pg
  npm i typeorm @nestjs/typeorm pg

gcrypt
  npm i gcrypt

jst
  npm i @nestjs/jwt @nestjs/passport passport passport-jwt @types/passport-jwt

# to generate

nest g module name
nest g controller name
nest g service name

# pgadmin install

https://www.postgresql.org/ftp/pgadmin/pgadmin4/v8.2/windows/

# TypeOrm documentation

https://typeorm.io

# container run

docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres