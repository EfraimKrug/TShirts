from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.retrlines('RETR chartsWorld.html', open('oldChartsWorld.html', 'w').write)
ftp.storbinary('STOR chartsWorld.html', open('chartsWorld.html', 'rb'))
ftp.quit()
