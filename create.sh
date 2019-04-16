#!/bin/bash
if [ -z "$1" ] 
then
echo -e "\e[01;31mError\e[0m Name is missing" >&2
exit
else
cd editors
yarn create react-app $1
cd $1
npm install react-app-rewired --save-dev
cp ../default/config-overrides.js ./
cp ../default/package.json ./
cp ../default/src/Default.js ./src/
cp ../default/src/index.js ./src/
sed -i "s/default/$1/" package.json
cd ../../
sed -i '/"build": "lerna run build --concurrency=1 --stream",/a "'$1'": "cd editors/'$1' && yarn start",' package.json
yarn $1
fi
