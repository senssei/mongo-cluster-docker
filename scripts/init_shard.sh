#!/bin/bash

mongodb1=`ping -c 1 ${MONGOS} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`

mongodb11=`ping -c 1 ${MONGO11} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`
mongodb12=`ping -c 1 ${MONGO12} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`
mongodb13=`ping -c 1 ${MONGO13} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`

mongodb21=`ping -c 1 ${MONGO21} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`
mongodb22=`ping -c 1 ${MONGO22} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`
mongodb23=`ping -c 1 ${MONGO23} | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`


port=${PORT:-27017}

echo "Waiting for startup.."
until curl http://${mongodb1}:${port}/serverStatus\?text\=1 2>&1 | grep uptime | head -1; do
  printf '.'
  sleep 1
done

echo curl http://${mongodb1}:${port}/serverStatus\?text\=1 2>&1 | grep uptime | head -1
echo "Started.."

echo setup.sh time now: `date +"%T" `
mongo --host ${mongodb1}:${port} <<EOF
   sh.addShard( "${RS1}/${mongodb11}:${PORT1},${mongodb12}:${PORT2},${mongodb13}:${PORT3}" );
   sh.addShard( "${RS2}/${mongodb21}:${PORT1},${mongodb22}:${PORT2},${mongodb23}:${PORT3}" );
   sh.status();
EOF
