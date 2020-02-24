# MarketplaceAPI
A simple REST API using some concepts 


## Concepts

:dart: JWT Authentication<br>
:dart: Queues Tasks(Redis)<br>
:dart: Cryptography<br>


## To Run API
```bash
  #1 Install  mongodb image docker
  sudo docker run -d -p 6379:6379 -i -t redis:3.2.5-alpine

  # Install Redis image docker
  docker run --name mongonode -p 27017:27017 -d -t mongo

  # Run Server
  yarn start
```
