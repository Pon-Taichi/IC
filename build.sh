npm run build

cd release

rm deploy_package.zip
rm -rf build
rm -rf node_modules

cp ../package*.json .
cp -r ../build .

npm install --omit=dev

zip -r deploy_package.zip .

