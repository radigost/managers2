#!/usr/bin/env bash
psql -f 00000000000.sql
psql -f ../fixtures/initial.sql
psql -f 20170404001.sql