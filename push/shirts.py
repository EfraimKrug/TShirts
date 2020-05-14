from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.storbinary('STOR PDSocialBonding.html', open('../PDSocialBonding.html', 'rb'))
ftp.quit()
