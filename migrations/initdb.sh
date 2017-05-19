#!/usr/bin/env bash
psql -f 00000000000.sql
psql -f ../fixtures/initial.sql
psql -f 20170404001.sql
psql -f 20170422001.sql
psql -f 20170423001.sql
psql -f 20170519001.sql