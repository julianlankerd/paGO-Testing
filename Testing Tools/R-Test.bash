#!/bin/bash

SAVEFOLDER=$HOME/Downloads
BROWSER="chromium-browser"

RPlot(){
	R --no-save << EOF &>/dev/null &
	x11();
	attach(read.csv("$2"));
	barplot(table($1),breaks=(max($1)-min($1)+1));
	Sys.sleep(999999999999);
EOF
}

if [ -e $SAVEFOLDER/raw.txt ]
then
	rm -f $SAVEFOLDER/raw.txt
fi
if [ -e ./data.txt ]
then
	rm -f ./data.txt
fi
if [ -e ./stats/ ]
then
	rm -Rf ./stats/
fi

mkdir ./stats/
$BROWSER &>/dev/null &

for INDEX in $(seq 0 1 7)
do
	$BROWSER ./libTest.html &>/dev/null &
	sleep 2.5
	cat $SAVEFOLDER/raw.txt >>./data.txt
	rm -f $SAVEFOLDER/raw.txt
done

killall $BROWSER
unset -v BROWSER INDEX SAVEFOLDER

#Use this to find the positions of the embedded strings
echo "indeces" >./stats/indeces.txt; sed -e "s:{{}:{:g" -e "s:^\(.*\)\ .*\$:\1:g" ./data.txt | awk '{print length}' >>./stats/indeces.txt
RPlot "indeces" ./stats/indeces.txt &

#Use this to find the length of the strings
echo "lengths" >./stats/lengths.txt; sed -e "s:{{}:{:g" ./data.txt | awk '{print length}' >>./stats/lengths.txt
RPlot "lengths" ./stats/lengths.txt &

wait
