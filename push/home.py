from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')

html = ["home.html","index.html", "about.html","mission.html","blogs.html","suggestions.html"]
for f in html:
  print f
  ftp.storbinary('STOR ' + f, open('../' + f, 'rb'))
