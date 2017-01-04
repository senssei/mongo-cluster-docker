# mongo-cluster-docker

Simple 3 node replica mongodb on offcial `mongo` docker image using `docker-compose`.

# Run

```
docker-compose up
```

# Tests
> Manually for the time being

1. Connect to node1 *master*.
```bash
docker exec -it mongo1 mongo
```
```js
my-mongo-set:PRIMARY> db = (new Mongo('localhost:27017')).getDB('test')
test
```
2. Save document and query.
```js
my-mongo-set:PRIMARY> db.mycollection.insert({name : 'sample'})
WriteResult({ "nInserted" : 1 })

my-mongo-set:PRIMARY> db.mycollection.find()
{ "_id" : ObjectId("586a68612edbf31a76ebc364"), "name" : "sample" }
```

3. Same for node2, ...
```js
my-mongo-set:PRIMARY> db2 = (new Mongo('mongo2:27017')).getDB('test')
test
my-mongo-set:PRIMARY> db2.setSlaveOk()
my-mongo-set:PRIMARY> db2.mycollection.find()
{ "_id" : ObjectId("586a68612edbf31a76ebc364"), "name" : "sample" }
my-mongo-set:PRIMARY> db.mycollection.insert({name : 'sample2'})
WriteResult({ "nInserted" : 1 })
my-mongo-set:PRIMARY> db2.mycollection.find()
{ "_id" : ObjectId("586a68612edbf31a76ebc364"), "name" : "sample" }
{ "_id" : ObjectId("586a68812edbf31a76ebc365"), "name" : "sample2" }
```


# Issues and limitations

Basically `mongosetup` service is unsued after setup. My gut feeling is to move this somewhere else. :)

# Reference

* http://www.sohamkamani.com/blog/2016/06/30/docker-mongo-replica-set/
* https://github.com/singram/mongo-docker-compose
* http://stackoverflow.com/questions/31138631/configuring-mongodb-replica-set-from-docker-compose
* https://gist.github.com/garycrawford/0a45f820e146917d231d
* http://stackoverflow.com/questions/31746182/docker-compose-wait-for-container-x-before-starting-y
* https://docs.docker.com/compose/startup-order/
* http://stackoverflow.com/questions/31138631/configuring-mongodb-replica-set-from-docker-compose
* https://github.com/soldotno/elastic-mongo/blob/master/docker-compose.yml

See more @ `ENV.md`