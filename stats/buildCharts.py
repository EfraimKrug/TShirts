import os
import sys
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
##########################################################################
#   Stats from Influenza in America:
#   Population: 327,200,000
#       Highest estimates/Lowest estimates
#       45,000,000/9,300,000 affected (13.75%/2.84% of the population)
#          810,000/140,000 hospitalized
#           61,000/12,000 deaths (.0186%/.0037% of the population)
##########################################################################
# get parent directory...
sys.path.append(os.getcwd())
sys.path.append(os.getcwd()[0:os.getcwd().rfind('\\')])

import sys
import csv
import json

from datetime import datetime
from datetime import time
from datetime import date

from openpyxl import load_workbook
from openpyxl.styles import colors
from openpyxl.styles import Font, Color
from openpyxl.utils import get_column_letter

from openpyxl.styles.borders import Border, Side

import smtplib

SHOW_SWITCH = True

toaddrs  = 'EfraimMKrug@gmail.com'
title = ''
# accountArray = []
# accountArray.append(dict())
# server = 0
now_dt = datetime.today()
coll = {}
def getConfirmed():
    global coll
    with open('./data/time_series_covid_19_confirmed_US.csv', mode='r') as f:
        csv_reader = csv.reader(f, delimiter=',')

        for r in csv_reader:
            r6 = r[6].replace(' ','_').replace('.','').replace("'",'')
            r5 = r[5].replace(' ','_').replace('.','').replace("'",'')
            if r6 not in coll:
                coll[r6] = {}
            coll[r6][r5] = {}
            coll[r6][r5]["confirmed"] = []
            for s in range (11, len(r)):
                coll[r6][r5]["confirmed"].append(r[s])


def getDeaths():
    global coll
    with open('./data/time_series_covid_19_deaths_US.csv', mode='r') as f:
        csv_reader = csv.reader(f, delimiter=',')

        for r in csv_reader:
            r6 = r[6].replace(' ','_').replace('.','').replace("'",'')
            r5 = r[5].replace(' ','_').replace('.','').replace("'",'')
            if r6 not in coll:
                coll[r6] = {}
            if r5 not in coll[r6]:
                coll[r6][r5] = {}

            coll[r6][r5]["deaths"] = []
            coll[r6][r5]["population"] = r[11]
            for s in range (12, len(r)):
                coll[r6][r5]["deaths"].append(r[s])

# def getRecovered():
#     global coll
#     with open('./data/time_series_covid_19_deaths_US.csv', mode='r') as f:
#         csv_reader = csv.reader(f, delimiter=',')
#
#         for r in csv_reader:
#             r6 = r[2].replace(' ','_').replace('.','').replace("'",'')
#             r5 = r[1].replace(' ','_').replace('.','').replace("'",'')
#             if r6 not in coll:
#                 coll[r6] = {}
#             if r5 not in coll[r6]:
#                 coll[r6][r5] = {}
#
#             coll[r6][r5]["recovered"] = []
#             for s in range (12, len(r)):
#                 coll[r6][r5]["recovered"].append(r[s])


def formatDropDown():
    print("<script type='text/javascript'>")
    print("var jsonDropDown = {};")
    for stateName in coll:
        print("jsonDropDown[\"" + stateName + "\"] = [];")
        for county in coll[stateName]:
            if county[0:6].lower() == "out_of":
                continue
            if county.lower() == "unassigned":
                continue
            print("jsonDropDown[\"" + stateName + "\"].push(\"" + county + "\");")

    print("</script>")

def formatState(stateName):

    for county in coll[stateName]:
        if county[0:6].lower() == "out_of":
            continue
        if county.lower() == "unassigned":
            continue
        if not county:
            continue
        print("<script type='text/javascript'>")
        print("")
        print("")
        print ("function drawChart" + stateName.replace('~','_').replace('-','_') + "_" + county.replace('~','_').replace('-','_') + "(){")
        print ( " var County = '" + county.replace('~','_').replace('-','_') + "';" )
        pop = "Unknown"
        if ("population" in coll[stateName][county]):
            pop = coll[stateName][county]["population"]
        print(" var Population = " + pop + ";")
        print("var data = google.visualization.arrayToDataTable([")
        print("['Day', 'Confirmed', 'Deaths'],")
        for day in range(0, len(coll[stateName][county]["confirmed"])):
            print("[" + str(day) + ", " + str(coll[stateName][county]["confirmed"][day]) + ", " + str(coll[stateName][county]["deaths"][day]) + "],")

        print("]);")
        print("var options = {")
        print("title: '" + stateName + " [" + county.replace('_',' ') + " county](Population: " + str(coll[stateName][county]["population"]) + ")',")
        print("curveType: 'function',")
        print("legend: { position: 'bottom' }")
        print("};")

        print("var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));")

        print("chart.draw(data, options);")
        print("}")
        print("</script>")

def printPart2A():
        print("Pick a state and country")
        print("<select id=state onchange='getState();'>")
        stateKeys = list(coll.keys())
        stateKeys.sort()
        for stateName in stateKeys:
            print("<option value = '" + stateName + "'>" + stateName.replace('_',' ') + "</option>")
        print("</select>")
        print("<select id=county onchange='getCounty();'>")
        print("</select>")

        print("  <div id='curve_chart' style='width: 900px; height: 500px'></div>")
        print("<script>")
        print("function getState(sel){")
        print("      var county = document.getElementById('county');")
        print("      while(county.options.length) county.remove(0);")
        print("      var state = document.getElementById('state');")
        print("      var arr = [];")
        print("      var stateName = state.options[state.selectedIndex].value")
        print("      for(var i = 0; i < jsonDropDown[stateName].length; i++){")
        print("                var option = document.createElement('option');")
        print("                option.text = jsonDropDown[stateName][i].replace(/_/g,' ');")
        print("                county.add(option);")
        print("         }")
        print(" }")
        print("</script>")
        print("<script>")
        print("function getCounty(sel){")
        print("     var state = document.getElementById('state');")
        print("     var stateName = state.options[state.selectedIndex].value")
        print("     var county = document.getElementById('county');")
        print("     var countyName = county.options[county.selectedIndex].value")
        print("     countyName = countyName.replace(/\s/g, '_');")
        print("     google.charts.load('current', {'packages':['corechart']});")
        print("     var fName = eval('drawChart' + stateName.replace(/~/g,'_').replace(/-/g,'_') + '_' + countyName.replace(/~/g,'_').replace(/-/g,'_'));")
        print("     google.charts.setOnLoadCallback(fName);")
        print(" }")
        print("</script>")
        print("</body>")
        print("</html>")

def printHTMLTemplate(fileName):
    f = open(fileName, "r")
    print(f.read())
    f.close()

##########################################################################################
# get data
# This requires two csv files:
# time_series_covid_19_deaths_US, and
# time_series_covid_19_confirmed_US
getConfirmed()
getDeaths()
##########################################################################################
# print starting html
printHTMLTemplate("PART1.USE")
formatDropDown()

printHTMLTemplate("PART2.USE")

printPart2A()
for stateName in coll:
   formatState(stateName)

printHTMLTemplate("PART3.USE")
