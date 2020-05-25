from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/images')
ftp.storbinary('STOR PDSBBack.gif', open('../images/PDSBBack.gif', 'rb'))
ftp.quit()
