from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.storbinary('STOR blogs.html', open('../blogs.html', 'rb'))
ftp.quit()
