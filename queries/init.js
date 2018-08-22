sh.removeShardTag("rs1", "US");

sh.removeShardTag("rs2", "EU");

sh.addShardTag("rs1", "US");

sh.addShardTag("rs2", "EU");

sh.disableBalancing("test.sample");

db.sample.drop();

db.createCollection("sample"); 

db.sample.createIndex( { factoryId: 1 } );

sh.enableSharding("test");

sh.shardCollection("test.sample",{ location: 1, factoryId: 1});

sh.addTagRange(
  "test.sample",
  { "location" : "US", "factoryId" : MinKey },
  { "location" : "US", "factoryId" : MaxKey },
  "US"
);

sh.addTagRange(
  "test.sample",
  { "location" : "EU", "factoryId" : MinKey },
  { "location" : "EU", "factoryId" : MaxKey },
  "EU"
);




sh.enableBalancing("test.sample");

for(var i=0; i<100; i++){
    db.sample.insert({
        "location": "US",
        "factoryId": NumberInt(i)
    });
    
    db.sample.insert({
        "location": "EU",
        "factoryId": NumberInt(100+i)
    });
}

sh.startBalancer();

db.sample.find();