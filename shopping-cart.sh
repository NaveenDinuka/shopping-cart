#!/bin/bash
# shopping-cart.sh

npm install
npm run build
npm run db:migrate
npm run db:seed

npm run serve
