#!/bin/bash -e

src=./src
lib=lib

rm -rf $lib
rm -rf node_modules/
yarn
webpack
