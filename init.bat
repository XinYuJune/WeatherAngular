@echo off
:: Checking if the dependencies exist
if exist "yarn.lock" (
    echo Dependencies exist, Executing the ng serve...
    yarn run ng serve
) else (
    echo Dependencies   not exist, Executing the sententce of dependencies installtaion ..
    npm install -g yarn
    yarn install
    yarn run ng serve
)
