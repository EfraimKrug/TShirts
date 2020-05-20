from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.cwd('js')
ftp.storbinary('STOR dataCollection.js', open('../js/dataCollection.js', 'rb'))
ftp.quit()
