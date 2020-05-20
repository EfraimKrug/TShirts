from ftplib import FTP

import sys

if __name__ == "__main__":
    # print("Arguments count: " + str(sys.argv[1]))
    ftp = FTP('ftp.namethatthing.site')
    ftp.login('EfraimFTP','G00dSh@bb0s')
    ftp.cwd('public_html')
    ftp.cwd('js')
    js = ["colorCodes.js","dataCollection.js","doMail.js","getPFAPIData.js","HTMLTemplates.js","menu.js","oldJS2.js","PDSBAction.js","PDSBProductDisplay.js","PDSBUtilities.js","PrintFulAPI.js","productSkel.js","SBdataBase.js","SBpayPal.js","sizingInfo.js"]
    i = int(sys.argv[1])
    print("moving: " + js[i])
    ftp.storbinary('STOR ' + js[i], open(js[i], 'rb'))
