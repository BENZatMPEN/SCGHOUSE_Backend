# การติดตั้ง

```
node version v16.19.0
```

# install pm2

```
npm install pm2@latest -g
npm i pm2-logrotate
```

## Clone project หรือ copy files

```
# clone project
git clone https://gitlab.com/chansetthi/production-analysis-service.git
```

## 1. ตั้งค่า environment variables .env

#### environment

| Variable                 | Value                                                            | Description                  |
| ------------------------ | ---------------------------------------------------------------- | ---------------------------- |
| MONGODB_URI              | mongodb://localhost:27117                                        | mongo uri                    |
| DB_NAME                  | production_analysis                                              | ชื่อ Database                |
| SECRETKEY                | e2aef94ac35e811f74d63c179de4e98e7bc56f3834e68b6707e5e2ed1a690b8a |
| REFRESH_SECRET_KEY       | c2fd3d9ab07a1a80a7e78f33d7e2558a16963c94a8f38830947d03713a1d90ce |
| EXPIRES_IN               | 86300                                                            | เวลาหมดอายุของ Token         |
| REFRESH_TOKEN_EXPIRES_IN | 86300                                                            | เวลาหมดอายุของ Refresh Token |
| ENDPOINT_URL             | http://localhost:2100/                                           | URL API ของ service report   |
| SIDE_ID                  | FU00be4397af34                                                   |                              |
| TELEGRAM_TOKEN           | 7958099615:AAFO82pAatz47U8eV48DVfatL7yeWszbtEQ                   |                              |
| CHAT_ID                  | -4932511454                                                      |                              |

## 2. รัน install package

```
cd production-analysis-service
npm install
```

## 3. start service

```
sh start.sh
```

## 4. เปิดเว็บ admin

```
http://localhost:2300
```
