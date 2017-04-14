#!/usr/bin/env bash

kill $(cat /tmp/my-app.pid)
git pull
npm install

#sudo -u postgres psql < /home/srv/managers2/migrations/00000000000.sql

nohup node . > /dev/null & echo $! >>  /tmp/my-app.pid &

