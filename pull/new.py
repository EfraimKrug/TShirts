from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.cwd('cgi-bin')
with open('apiky.php', 'wb') as fp:
    ftp.retrbinary('RETR apiky.php', fp.write)
ftp.quit()
