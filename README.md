# การติดตั้ง
```
node version v16.19.0
```
## Clone project หรือ copy files
```
# clone project
git clone https://gitlab.com/chansetthi/production-analysis-service.git
```

## 1. ตั้งค่า environment variables ใน docker-compose.yaml
#### environment

| Variable            | Value    | Description     |
| ------------------- | -------- | --------------- |
| MONGODB_URI      | mongodb://localhost:27217 | mongo uri          |
| DB_NAME | production_analysis | ชื่อ Database |
| SECRETKEY | e2aef94ac35e811f74d63c179de4e98e7bc56f3834e68b6707e5e2ed1a690b8a |
| REFRESH_SECRET_KEY | c2fd3d9ab07a1a80a7e78f33d7e2558a16963c94a8f38830947d03713a1d90ce |
| EXPIRES_IN | 86300 | เวลาหมดอายุของ Token|
| REFRESH_TOKEN_EXPIRES_IN | 86300 | เวลาหมดอายุของ Refresh Token|
| ENDPOINT_URL | http://localhost:2100/ | URL API ของ service report|
## 2. รัน install package
```
npm install
```
## 3. start docker compose mongodb
```
docker compose up -d
```
## 4. create database on mongodb โดยตั้งชื่อตาม environment DB_NAME เช่น production_analysis
## 3. start service
```
sh start.sh
```
## 4. เปิดเว็บ admin

```
http://localhost:2300
```