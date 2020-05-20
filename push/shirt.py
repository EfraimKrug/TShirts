from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')

html = ["PDSocialBondingRW.html"]
for f in html:
  print f
  ftp.storbinary('STOR ' + f, open('../' + f, 'rb'))

# ftp.cwd('css')
# css = ["SBTShirts.css"]
# for f in css:
#   print f
#   ftp.storbinary('STOR ' + f, open('../css/' + f, 'rb'))
ftp.quit()
