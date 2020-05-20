from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.storbinary('STOR PDSocialBondingRW.html', open('../../PDSocialBondingRW.html', 'rb'))
ftp.cwd('js')
ftp.storbinary('STOR sizingInfoRW.js', open('../../js/sizingInfoRW.js', 'rb'))
ftp.quit()
