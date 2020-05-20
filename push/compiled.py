from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')

ftp.cwd('js')
js = ["colorCodes.js","dataCollection.js"]
for f in js:
  print f
  ftp.storbinary('STOR ' + f, open('../js/compiled/' + f, 'rb'))

ftp.quit()
