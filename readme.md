to init db  you need 
* to run `/migrations/initdb.sh`
also you need to make postgres datasource, for this 
* add to ~/.profile `NODE_ENV=develop`
* run `source ~/.profile`
* create `server/datasources.develop.json`
* add there in that file something like
 ```{
      "db": {
        "name": "db",
        "connector": "memory"
      },
      "postgres": {
        "host": "/var/run/postgresql/",
        "port": "5432",
        "database":"--your_database_here--",
        "debug": true,
        "connector": "postgresql"
      }
    }
    
```
* run `node .`