from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.cwd('js')
ftp.storbinary('STOR getPFAPIData.js', open('../js/getPFAPIData.js', 'rb'))
ftp.storbinary('STOR PrintFulAPI.js', open('../js/PrintFulAPI.js', 'rb'))
ftp.quit()
