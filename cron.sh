#!/bin/bash
. /home/olore/.bashrc
export PATH=$PATH:/home/olore/.nvm/versions/node/v8.11.2/bin
cd $HOME/cypress-playground
npm run cypress:run | mail -s "Beaches price check" brian@olore.net
#npm run cypress:run | mail -s "Beaches price check" -A cypress/screenshots/Window\ --\ do\ stuff.png brian@olore.net
