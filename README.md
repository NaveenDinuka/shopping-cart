


# Shopping Cart

Shopping Cart is a simple REST API to facilitate a simple shopping
experience.

 - [Prereuisites](#prerequisites)
 - [Tech Stack](#prerequisites)
 - [Init Steps](#init-steps)
 - [Scripts](#scripts)
 - [How to Develop](#how-to-develop)
 - [How to Deploy](#how-to-deploy)
 - [How to Test](#how-to-test)

## Prerequisites

- git  
- docker-compose
- nginx

## Tech Stack 
| |  > version <  |
|--|--|
| OS | Ubuntu 16.04 LTS |
| Node.js | 8.12.0 |
| NPM | 6.4.1 |
| PostgreSQL| 10.6 |
| Redis | 5.0.2 |

## Git Branch Guide
DEV Banches
```
|- master
| |- dev
| |  |-ft/[feature-tag]
```
RELEASE Tags 
```
|- master
| |- REL_v[VERSION_ID]
```

## Init Steps

 1. Git clone `https://github.com/NaveenDinuka/shopping-cart.git`
 2. `cd shopping-cart`
 3. create `logs` directory in `./logs`
 4. create `shopping-cart` directory in host machine `/data/shopping-cart`  
    - *volumes mount point of docker images*

## Scripts

 - `npm start`
    - this command will start the application in developer mode with nodemon and babel-node
 - `npm run build`
    - build the application
    - this command will build the app in `shopping-cart/app` and copy the build into `shopping-cart/build`
 - `npm run db:migrate`
    - this command will migrate the schemas to `PostgreSQL DB` 
    - migration files located @ `shopping-cart/build/migrations`
 - `npm run db:seed`
    - this command will seed data into partucular schemas
    - seeder files located @ `shopping-cart/build/seeders`
 - `npm run serve`
    - this command will run the application @ `shopping-cart/build`

## How to Develop

 1. Go inside of shopping-cart app. `shopping-cart`
 2. `docker-compose up -d`
 3. go inside the `node` container (`shopping-cart_app_1`)
 4. `npm install`
 5. `npm run db:migrate`
 6. `npm run db:seed`
 8. `npm start`

## How to Deploy

 1. Go inside of shopping-cart app. `shopping-cart`
 2. Checkout to the Git-Rel-Branch
 3. `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## How to Test

 1. Go inside of shopping-cart app. `shopping-cart`
 2. `docker-compose up -d`
 3. go inside the `node` container (`shopping-cart_app_`)
 4. `npm run build`
 5. `npm run test:[user/product/cart]`
