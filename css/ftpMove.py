from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/css')
ftp.storbinary('STOR PDSBVariantDesc.css', open('PDSBVariantDesc.css', 'rb'))
ftp.quit()
