from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/css')
ftp.storbinary('STOR SBTShirts.css', open('../css/SBTShirts.css', 'rb'))
ftp.quit()
