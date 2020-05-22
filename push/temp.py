from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.cwd('template')
ftp.storbinary('STOR sizingChart.html', open('../template/sizingChart.html', 'rb'))
ftp.storbinary('STOR menu.html', open('../template/menu.html', 'rb'))
ftp.quit()
