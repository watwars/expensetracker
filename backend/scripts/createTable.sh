#! /bin/bash

str=$(cat ../.env | grep DATABASE_URL)
split=(${str//URL=/ })
DATABASE_URL=${split[1]}

cat ../db/tables.sql | cockroach sql --url $DATABASE_URL
