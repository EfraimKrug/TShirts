from ftplib import FTP

ftp = FTP('ftp.namethatthing.site')
ftp.login('EfraimFTP','G00dSh@bb0s')
ftp.cwd('public_html')
ftp.storbinary('STOR PDSocialBonding.html', open('../PDSocialBonding.html', 'rb'))
ftp.cwd('js')
ftp.storbinary('STOR PDSBAction.js', open('../js/PDSBAction.js', 'rb'))
ftp.storbinary('STOR PDSBCart.js', open('../js/PDSBCart.js', 'rb'))
ftp.storbinary('STOR dataCollection.js', open('../js/dataCollection.js', 'rb'))
ftp.storbinary('STOR getPFAPIData.js', open('../js/getPFAPIData.js', 'rb'))
ftp.storbinary('STOR PrintFulAPI.js', open('../js/PrintFulAPI.js', 'rb'))
ftp.storbinary('STOR HTMLTemplates.js', open('../js/HTMLTemplates.js', 'rb'))
ftp.storbinary('STOR oldJS2.js', open('../js/oldJS2.js', 'rb'))
ftp.cwd('../css')
ftp.storbinary('STOR PDSBCart.css', open('../css/PDSBCart.css', 'rb'))
ftp.storbinary('STOR SBTShirts.css', open('../css/SBTShirts.css', 'rb'))
ftp.cwd('../template')
ftp.storbinary('STOR prepPayPal.html', open('../template/prepPayPal.html', 'rb'))
ftp.storbinary('STOR pageTop.html', open('../template/pageTop.html', 'rb'))
ftp.quit()
