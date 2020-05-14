from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/js/json')
ftp.storbinary('STOR PDSBDesc.js', open('PDSBDesc.js', 'rb'))
ftp.storbinary('STOR PDSBVariantDesc.js', open('PDSBVariantDesc.js', 'rb'))
ftp.storbinary('STOR PDSBVariantDescCode.js', open('PDSBVariantDescCode.js', 'rb'))
ftp.storbinary('STOR PDSBVariantDescDisplayCode.js', open('PDSBVariantDescDisplayCode.js', 'rb'))
ftp.quit()
