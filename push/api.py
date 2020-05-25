from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.storbinary('STOR PDSocialBondingGroups.html', open('../PDSocialBondingGroups.html', 'rb'))

ftp.cwd('cgi-bin')
# ftp.storbinary('STOR apikygp.php', open('../../keys/apikygp.php', 'rb'))
# ftp.storbinary('STOR apiBasegp.php', open('../php/apiBasegp.php', 'rb'))
# ftp.storbinary('STOR apiProductListgp.php', open('../php/apiProductListgp.php', 'rb'))
# ftp.storbinary('STOR apiProductgp.php', open('../php/apiProductgp.php', 'rb'))

ftp.cwd('../js')
# ftp.storbinary('STOR PrintFulAPIgp.js', open('../js/PrintFulAPIgp.js', 'rb'))
# ftp.storbinary('STOR PDSBProductDisplayGroup.js', open('../js/PDSBProductDisplayGroup.js', 'rb'))
ftp.cwd('./json')
#ftp.storbinary('STOR PDSBVariantDesc.js', open('../js/json/PDSBVariantDesc.js', 'rb'))
ftp.quit()
