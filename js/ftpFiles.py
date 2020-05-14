from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/js')
ftp.storbinary('STOR SBdataBase.js', open('SBdataBase.js', 'rb'))
ftp.quit()
