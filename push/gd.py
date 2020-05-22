from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')

html = ["nrnhy.html","nrnhy3.html","nrnhy2.html"]
for f in html:
  print f
  ftp.storbinary('STOR ' + f, open('../' + f, 'rb'))
#
#
# ftp.cwd('js')
# css = ["HTMLTemplatesRW.js","PDSBActionRW.js","oldJS2RW.js","colorCodes.js","dataCollection.js"]
# for f in css:
#   print f
#   ftp.storbinary('STOR ' + f, open('../js/' + f, 'rb'))
#
# ftp.cwd('../template')
# template = ["pageTopRW.html"]
# for f in template:
#   print f
#   ftp.storbinary('STOR ' + f, open('../template/' + f, 'rb'))
#
# ftp.cwd('../css')
# template = ["SBTShirtsRW.css"]
# for f in template:
#   print f
#   ftp.storbinary('STOR ' + f, open('../css/' + f, 'rb'))


ftp.quit()
