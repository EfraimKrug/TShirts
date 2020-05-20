from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.cwd('template')
#ftp.storbinary('STOR prepPayForm.html', open('../template/prepPayForm.html', 'rb'))
ftp.storbinary('STOR menu.html', open('../template/menu.html', 'rb'))
ftp.quit()
