#!/bin/sh
/usr/bin/rsync -avz --progress --exclude "node_modules" -e "ssh -i ~/.ssh/strictdev2_macbook.pem" ./dist/sb-clean-blog-angular/ ec2-user@aws-2.strictdev.com:/usr/local/www/apache24/data/skydiveorbust.com/html/
## scp -i ~/.ssh/strictdev2_macbook.pem ./dist/api/index.js ec2-user@aws-1.strictdev.com:/usr/local/www/apache24/data/skydiveorbust.com/api/ && ssh -i ~/.ssh/strictdev2_macbook.pem ec2-user@aws-1.strictdev.com 'sudo -u pm2 pm2 restart 11'
