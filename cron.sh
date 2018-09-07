#!/bin/bash
. /home/olore/.bashrc
export PATH=$PATH:/home/olore/.nvm/versions/node/v8.11.2/bin
cd $HOME/dev/beaches
#npm run cypress:run | mail -s "Beaches price check" brian@olore.net
rm -f output.log
npm run cypress:run > /dev/null
cat output.log | mail -s "Beaches price check" brian@olore.net