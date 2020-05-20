from ftplib import FTP

import sys

if __name__ == "__main__":
    # print("Arguments count: " + str(sys.argv[1]))
    ftp = FTP('ftp.namethatthing.site')
    ftp.login('EfraimFTP','G00dSh@bb0s')
    ftp.cwd('public_html')
    ftp.cwd('js/json')
    js = ["PDSBDesc.js","PDSBVariantDescCode.js","PDSBVariantDescDisplayCode.js","PDSBVariantDesc.js"]
    # i = int(sys.argv[1])
    for i in range(0,4):
        print("moving: " + js[i])
        ftp.storbinary('STOR ' + js[i], open(js[i], 'rb'))
