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
def cleanUp(name):
    return name.replace(' ','_').replace('.','').replace("'",'').replace(",",'').replace("(",'').replace(")",'').replace("/",'').replace("*",'')

coll = {}
def getConfirmed():
    global coll
    with open('./data/time_series_covid_19_confirmed.csv', mode='r') as f:
        csv_reader = csv.reader(f, delimiter=',')

        for r in csv_reader:
            r1 = cleanUp(r[1])
            r0 = cleanUp(r[0])
            if r1 not in coll:
                coll[r1] = {}

            coll[r1][r0] = {}
            coll[r1][r0]["confirmed"] = []
            coll[r1][r0]["recovered"] = []
            coll[r1][r0]["deaths"] = []
            for s in range (5, len(r)):
                coll[r1][r0]["confirmed"].append(r[s])

def getDeaths():
    global coll
    with open('./data/time_series_covid_19_deaths.csv', mode='r') as f:
        csv_reader = csv.reader(f, delimiter=',')

        for r in csv_reader:
            r1 = cleanUp(r[1])
            r0 = cleanUp(r[0])
            if r1 not in coll:
                coll[r1] = {}
            if r0 not in coll[r1]:
                coll[r1][r0] = {}

            if "deaths" not in coll[r1][r0]:
                coll[r1][r0]["deaths"] = []
            for s in range (5, len(r)):
                coll[r1][r0]["deaths"].append(r[s])

def getRecovered():
    global coll
    with open('./data/time_series_covid_19_recovered.csv', mode='r') as f:
        csv_reader = csv.reader(f, delimiter=',')

        for r in csv_reader:
            r1 = cleanUp(r[1])
            r0 = cleanUp(r[0])
            if r1 not in coll:
                coll[r1] = {}
            if r0 not in coll[r1]:
                coll[r1][r0] = {}
            if "recovered" not in coll[r1][r0]:
                coll[r1][r0]["recovered"] = []
            for s in range (5, len(r)):
                coll[r1][r0]["recovered"].append(r[s])

def formatDropDown():
    print("<script type='text/javascript'>")
    print("var jsonDropDown = {};")
    for stateName in coll:
        print("jsonDropDown[\"" + stateName + "\"] = [];")
        for county in coll[stateName]:
            print("jsonDropDown[\"" + stateName + "\"].push(\"" + county + "\");")

    print("</script>")


def formatState(stateName):
    for county in coll[stateName]:
        print("<script type='text/javascript'>")
        print("")
        print("")

        if county:
            print ("function drawChart" + stateName.replace('~','_').replace('-','_') + "_" + county.replace('~','_').replace('-','_') + "(){")
        else:
            print ("function drawChart" + stateName.replace('~','_').replace('-','_') + "(){")

        print ( " var County = '" + county.replace('~','_').replace('-','_') + "';" )
        # print(" var Population = " + coll[stateName][county]["population"] + ";")
        print("var data = google.visualization.arrayToDataTable([")
        print("['Day', 'Confirmed', 'Deaths', 'Recovered'],")
        for day in range(0, len(coll[stateName][county]["confirmed"])):
            try:
                print("[" + str(day) + ", " + str(coll[stateName][county]["confirmed"][day]) + ", " + str(coll[stateName][county]["deaths"][day]) + ", " + str(coll[stateName][county]["recovered"][day]) + "],")
            except:
                x = "Bummer. This is lost..."

        print("]);")
        print("var options = {")
        # print("title: '" + stateName + " [" + county.replace('_',' ') + " county](Population: " + str(coll[stateName][county]["population"]) + ")',")
        print("title: '" + stateName + " [" + county.replace('_',' ') + " county])',")
        print("curveType: 'function',")
        print("legend: { position: 'bottom' }")
        print("};")

        print("var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));")

        print("chart.draw(data, options);")
        print("}")
        print("</script>")

def getMax(arr):
    max = 0
    for type in arr:
        if arr[type] > max:
            max = arr[type]
            return max

def getMin(arr):
    min = 999999
    for type in arr:
        if arr[type] < min:
            min = arr[type]
            return min

def equalizeArrays():
    for state in coll:
        for county in coll[state]:
            arr = {}
            for type in coll[state][county]:
                arr[type] = len(coll[state][county][type])
                max = getMax(arr)
                # min = getMin(arr)
                for type in coll[state][county]:
                    if len(coll[state][county][type]) < max:
                        for r in range(len(coll[state][county][type]), max):
                            coll[state][county][type].append(0)


def removeEmptyCountries():
    for state in coll:
        haveArea = False
        noArea = False
        st = ''
        ar = ''
        for area in coll[state]:
            if not area:
                noArea = True
                st = state
                ar = area
            else:
                haveArea = True

        if noArea and haveArea:
            coll[st].pop(ar, 'no key found')


# for x in coll['Canada']:
#     print(x)
#     for y in coll['Canada'][x]:
#         print(x + ":" + y)
#         print(coll['Canada'][x][y])

    # for y in coll['Canada'][x]:
# formatDropDown()


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
        print("      var noCountyHere = true;")
        print("      var county = document.getElementById('county');")
        print("      while(county.options.length) county.remove(0);")
        print("      var state = document.getElementById('state');")
        print("      var arr = [];")
        print("      var stateName = state.options[state.selectedIndex].value")
        print("      for(var i = 0; i < jsonDropDown[stateName].length; i++){")
        print("                var option = document.createElement('option');")
        print("                option.text = jsonDropDown[stateName][i].replace(/_/g,' ');")
        print("                noCountyHere = option.text;")
        print("                county.add(option);")
        print("         }")
        print("        if(!noCountyHere){")
        print("             google.charts.load('current', {'packages':['corechart']});")
        print("             var fName = eval('drawChart' + stateName.replace(/~/g,'_').replace(/-/g,'_') );")
        # print("             var fName = eval('drawChart' + stateName.replace(/~/g,'_').replace(/-/g,'_') );")
        print("             google.charts.setOnLoadCallback(fName);")
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
#
def printHTMLTemplate(fileName):
    f = open(fileName, "r")
    print(f.read())
    f.close()
#
# ##########################################################################################
# # get data
# # This requires two csv files:
# # time_series_covid_19_deaths_US, and
# # time_series_covid_19_confirmed_US
# getConfirmed()
# getDeaths()
# getRecovered()
# ##########################################################################################


getConfirmed()
getDeaths()
getRecovered()

equalizeArrays()
removeEmptyCountries()

printHTMLTemplate("PART1.USE")
formatDropDown()
printHTMLTemplate("PART2.USE")

printPart2A()

for state in coll:
    formatState(state)

printHTMLTemplate("PART3.USE")