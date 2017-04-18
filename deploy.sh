#!/usr/bin/env bash

kill $(cat /tmp/my-app.pid)

if [ ! -d ../backups ]; then
  mkdir ../backups
fi

sudo -u postgres pg_dump > ../backups/$(date +%d-%m-%y_%H:%M).sql


git pull
npm install

nohup node . > /dev/null & echo $! >  /tmp/my-app.pid &

