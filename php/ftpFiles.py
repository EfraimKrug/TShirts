from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html/cgi-bin')
ftp.storbinary('STOR confirmEmail.php', open('confirmEmail.php', 'rb'))
ftp.storbinary('STOR insertSBMail.php', open('insertSBMail.php', 'rb'))
# ftp.storbinary('STOR email.php', open('email.php', 'rb'))
ftp.quit()
