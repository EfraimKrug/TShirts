from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.storbinary('STOR suggestions.html', open('../suggestions.html', 'rb'))
ftp.cwd('css')
ftp.storbinary('STOR SBTShirts.css', open('../css/SBTShirts.css', 'rb'))
ftp.quit()
