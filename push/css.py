from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/css')
ftp.storbinary('STOR SBTShirtsRW.css', open('../css/SBTShirtsRW.css', 'rb'))
ftp.quit()
