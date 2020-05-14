from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/js')
ftp.storbinary('STOR productSkelWork.js', open('productSkelWork.js', 'rb'))
ftp.quit()
