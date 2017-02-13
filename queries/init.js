sh.removeShardTag("rs1", "US");

sh.removeShardTag("rs2", "EU");

sh.addShardTag("rs1", "US");

sh.addShardTag("rs2", "EU");

sh.disableBalancing("test.sample");

db.sample.drop();

db.createCollection("sample"); 

db.sample.createIndex( { location: 1, _id: 1 } )

sh.addTagRange(
  "test.sample",
  { "location" : "US", "_id" : MinKey },
  { "location" : "US", "_id" : MaxKey },
  "US"
);

sh.addTagRange(
  "test.sample",
  { "location" : "EU", "_id" : MinKey },
  { "location" : "EU", "_id" : MaxKey },
  "EU"
)


sh.enableSharding("test");

sh.shardCollection("test.sample",{ location: 1, _id: 1 });

sh.enableBalancing("test.sample");

db.sample.insert({
    "_id" : ObjectId("5787936b94afebe02398521a"),
    "location": "US",
    "__v" : 0
});

db.sample.insert({
    "_id" : ObjectId("5787a08c94afebe023985224"),
    "location": "EU",
    "__v" : 0
});

sh.startBalancer();

db.sample.find();