#!/bin/bash

SAVEFOLDER=$HOME/Downloads

if [ -e $SAVEFOLDER/raw.txt ]
then
	rm -f $SAVEFOLDER/raw.txt
fi

if [ -e ./data.txt ]
then
	rm -f ./data.txt
fi

if [ -e ./stats.txt ]
then
	rm -f ./stats.txt
fi

setsid chromium-browser ./libTest.html &>/dev/null &

sleep 5

mv $SAVEFOLDER/raw.txt ./data.txt

unset -v SAVEFOLDER

#Use this to find the positions of the embedded strings
echo "indeces" >./stats.txt; sed -e "s:{{}:{:g" -e "s:^\(.*\)\ .*\$:\1:g" ./data.txt | awk '{print length}' >>./stats.txt

setsid R --no-save << EOF &>/dev/null
x11();
attach(read.csv("./stats.txt"));
hist(indeces,breaks=(max(indeces)-min(indeces)+1));
Sys.sleep(999999999999);
EOF

#Use this to find the length of the strings
#echo "lengths" >./stats.txt; sed -e "s:{{}:{:g" ./data.txt | awk '{print length}' >>./stats.txt
#
#setsid R --no-save << EOF &>/dev/null
#x11();
#attach(read.csv("./stats.txt"));
#hist(lengths,breaks=(max(lengths)-min(lengths)+1));
#Sys.sleep(999999999999);
#EOF
