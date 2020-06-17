import os
import sys
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pops
from pops import getPop
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
    return name.strip().replace(' ','_').replace('.','').replace("'",'').replace(",",'').replace("(",'').replace(")",'').replace("/",'').replace("*",'')

coll = {}
def getDeaths():
    global coll
    line = 0
    with open('./data/Analysis02.csv', mode='r') as f:
        csv_reader = csv.reader(f, delimiter=',')

        for r in csv_reader:
            line = line + 1
            # print(line,r[1],len(r))
            r1 = cleanUp(r[1])
            if r1 not in coll:
                coll[r1] = {}
            if "deaths" not in coll[r1]:
                coll[r1]["deaths"] = []
            for s in range (5, len(r)):
                coll[r1]["deaths"].append(r[s])


def formatState(stateName):
    for county in coll[stateName]:
        popO = "Unknown"
        if getPop(stateName.replace("_"," ").strip()):
            popO = getPop(stateName.replace("_"," ").strip())

    coll[stateName]["population"] = popO

getDeaths()
for state in coll:
    formatState(state)
    # print(state,len(coll[state]["deaths"]))

# for state in coll:
#     print(state)

for state in coll:
    arr = []
    arr.append(state)
    arr.append(coll[state]['population'])
    # print(coll[state])
    for i in range(len(coll[state]["deaths"])-1,0,-1):
        if coll[state]["deaths"][i].find("/") < 0:
            x = int(coll[state]["deaths"][i]) - int(coll[state]["deaths"][i-1])
            arr.append(x)
    s = ""
    for e in range(len(arr)):
        s += str(arr[e]) + ","
    print(s)

# print(coll)
