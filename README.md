# การติดตั้ง
```
node version v16.19.0
```
# install pm2
```
sudo npm install pm2@latest -g
sudo npm i pm2-logrotate
sudo pm2 set pm2-logrotate:retain 30
```
## Clone project หรือ copy files
```
# clone project
git clone https://gitlab.com/chansetthi/production-analysis-service.git
cd production-analysis-service
```

## 1. ตั้งค่า environment variables .env
#### environment

| Variable            | Value    | Description     |
| ------------------- | -------- | --------------- |
| MONGODB_URI      | mongodb://localhost:27117 | mongo uri          |
| DB_NAME | production_analysis | ชื่อ Database |
| SECRETKEY | e2aef94ac35e811f74d63c179de4e98e7bc56f3834e68b6707e5e2ed1a690b8a |
| REFRESH_SECRET_KEY | c2fd3d9ab07a1a80a7e78f33d7e2558a16963c94a8f38830947d03713a1d90ce |
| EXPIRES_IN | 86300 | เวลาหมดอายุของ Token|
| REFRESH_TOKEN_EXPIRES_IN | 86300 | เวลาหมดอายุของ Refresh Token|
| ENDPOINT_URL | http://localhost:2100/ | URL API ของ service report|
| SIDE_ID | FU00be4397af34 |
## 2. รัน install package
```
npm install
```
## 3. start service
```
sudo sh start.sh
```
## 4. เปิดเว็บ admin

```
http://localhost:2300
```