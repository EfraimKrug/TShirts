from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.retrlines('RETR charts.html', open('oldCharts.html', 'w').write)
ftp.storbinary('STOR charts.html', open('charts.html', 'rb'))
ftp.quit()
