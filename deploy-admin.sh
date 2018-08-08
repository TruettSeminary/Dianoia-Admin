rm -rf ~/old-deploy/Dianoia-Admin

mv ~/Dianoia-Admin ~/old-deploy

cd ~ && git clone https://github.com/TruettSeminary/Dianoia-Admin.git

cp ~/config/admin/.env.production ~/Dianoia-Admin

cd ~/Dianoia-Admin && npm install

npm run-script build && cp -R ~/Dianoia-Admin/build/* /var/www/admin.dianoia.church.technology/html