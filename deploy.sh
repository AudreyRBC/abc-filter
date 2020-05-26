#!/bin/bash
source ./../../function.sh

# abort on errors
set -e

# Define the commit command
while getopts c: option
do
case "${option}"
in
c) COMMIT=${OPTARG};;
esac
done


if [ -n "$(git status --porcelain)" ]; then
   update
elif [ -n "$(git log origin/master..master)" ]; then
   change
fi
