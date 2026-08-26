# SCGHOUSE Backend — Production Analysis Service

ระบบ Backend สำหรับติดตามและวิเคราะห์ข้อมูลการผลิตของ SCG House พัฒนาบนพื้นฐาน [Node-RED](https://nodered.org/) v3.0.2

## ความสามารถหลัก

- **เชื่อมต่อ Factory Line** — รับข้อมูลจาก QR/Barcode Scanner ผ่าน TCP และสื่อสารกับ PLC ผ่าน Modbus TCP/RTU (Zone 1–12)
- **ติดตามการผลิต** — บันทึกข้อมูลการผลิตบ้าน, ชิ้นส่วน, cycle time, น้ำหนัก, การย้ายข้าม zone และวันติดตั้ง
- **REST API** — สำหรับ React Dashboard, ระบบ Authentication (JWT), จัดการตารางงาน และ Export รายงาน Excel
- **แจ้งเตือน Telegram** — ส่งการแจ้งเตือนผ่าน Telegram Bot

## Tech Stack

| เทคโนโลยี | เวอร์ชัน / รายละเอียด |
|---|---|
| Node.js | v16.19.0 |
| Node-RED | v3.0.2 (embedded monorepo) |
| MongoDB | latest (Docker) / standalone |
| PM2 | Process Manager |
| Modbus | node-red-contrib-modbus v5.31.0 |
| Authentication | JWT + bcrypt |
| Excel Export | xlsx |

---

## สารบัญ

- [Prerequisites](#prerequisites)
- [การติดตั้ง](#การติดตั้ง)
  - [1. Clone โปรเจกต์](#1-clone-โปรเจกต์)
  - [2. ติดตั้ง Dependencies](#2-ติดตั้ง-dependencies)
  - [3. ตั้งค่า Database (MongoDB)](#3-ตั้งค่า-database-mongodb)
  - [4. ตั้งค่า Environment Variables](#4-ตั้งค่า-environment-variables)
  - [5. Start Service](#5-start-service)
- [การรันด้วย Docker](#การรันด้วย-docker)
- [API Endpoints](#api-endpoints)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [เอกสารเพิ่มเติม](#เอกสารเพิ่มเติม)

---

## Prerequisites

ติดตั้งเครื่องมือเหล่านี้ก่อนเริ่มต้น:

- **Node.js** v16.19.0 — [ดาวน์โหลด](https://nodejs.org/) หรือใช้ [nvm](https://github.com/nvm-sh/nvm)
  ```bash
  nvm install 16.19.0
  nvm use 16.19.0
  ```
- **PM2** — Process Manager สำหรับรัน service ใน background
  ```bash
  npm install pm2@latest -g
  npm install pm2-logrotate -g
  ```
- **MongoDB** — ติดตั้งแบบ standalone หรือใช้ Docker (ดูหัวข้อ [ตั้งค่า Database](#3-ตั้งค่า-database-mongodb))
- **Docker & Docker Compose** *(optional)* — หากต้องการรัน MongoDB ผ่าน Docker

---

## การติดตั้ง

### 1. Clone โปรเจกต์

```bash
git clone https://gitlab.com/chansetthi/production-analysis-service.git
cd production-analysis-service
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Database (MongoDB)

#### วิธีที่ 1: ใช้ Docker Compose (แนะนำ)

```bash
docker-compose up -d mongodb
```

คำสั่งนี้จะ:
- รัน MongoDB container บน port `27117`
- เมาท์ข้อมูลไว้ที่ `./data/mongodb_data`
- รัน `mongo-init.js` เพื่อสร้าง database, collections และ seed ข้อมูลเริ่มต้น

#### วิธีที่ 2: ใช้ MongoDB ที่ติดตั้งเอง

หากมี MongoDB อยู่แล้ว ให้รัน init script เพื่อสร้าง database และ seed data:

```bash
mongosh < mongo-init.js
```

> **หมายเหตุ:** `mongo-init.js` จะสร้าง database `production_analysis`, สร้าง user, สร้าง collections ทั้งหมด และเพิ่ม admin users เริ่มต้น 3 คน (`admin`, `admin1`, `admin2`)

### 4. ตั้งค่า Environment Variables

คัดลอกไฟล์ตัวอย่างและแก้ไขค่าตามต้องการ:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env`:

| Variable | ตัวอย่าง | คำอธิบาย |
|---|---|---|
| `MONGODB_URI` | `mongodb://admin:password@localhost:27117` | MongoDB connection URI |
| `DB_NAME` | `production_analysis` | ชื่อ Database |
| `SECRETKEY` | `e2aef94ac35e811f74d63c179de4e98e7bc56f3834e68b6707e5e2ed1a690b8a` | Secret key สำหรับสร้าง JWT Token |
| `REFRESH_SECRET_KEY` | `c2fd3d9ab07a1a80a7e78f33d7e2558a16963c94a8f38830947d03713a1d90ce` | Secret key สำหรับ Refresh Token |
| `EXPIRES_IN` | `86300` | เวลาหมดอายุของ Token (วินาที) |
| `REFRESH_TOKEN_EXPIRES_IN` | `86300` | เวลาหมดอายุของ Refresh Token (วินาที) |
| `MAX_BLOCK_ZONE_1` | `99` | จำนวน block สูงสุดของ Zone 1 |
| `ENDPOINT_URL` | `http://localhost:3303/api/interfaces/update` | URL API ของ service report |
| `SIDE_ID` | `FU00be4397af34` | Site ID สำหรับระบุโรงงาน |
| `TELEGRAM_TOKEN` | `your-telegram-bot-token` | Token ของ Telegram Bot สำหรับแจ้งเตือน |
| `CHAT_ID` | `your-chat-id` | Chat ID ของ Telegram สำหรับรับแจ้งเตือน |

> [!CAUTION]
> **ค่า `SECRETKEY` และ `REFRESH_SECRET_KEY` ที่แสดงด้านบนเป็นตัวอย่างเท่านั้น**
> คุณ **ต้องสร้าง key ใหม่** ก่อนนำไปใช้งานจริง เพื่อความปลอดภัยของระบบ
>
> วิธีสร้าง secret key ใหม่:
> ```bash
> # วิธีที่ 1: ใช้ Node.js
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
>
> # วิธีที่ 2: ใช้ openssl
> openssl rand -hex 32
> ```
> รันคำสั่งข้างต้น 2 ครั้ง เพื่อสร้าง key สำหรับ `SECRETKEY` และ `REFRESH_SECRET_KEY` แยกกัน

### 5. Start Service

#### รันด้วย PM2 (แนะนำสำหรับ production)

```bash
sh start.sh
```

คำสั่งนี้จะรัน service ผ่าน PM2 โดย:
- ตั้งชื่อ process ว่า `production-analysis-service`
- เขียน log ไว้ที่ `/app/logs/production-analysis-service.log`
- รัน Node-RED บน port **2300**

คำสั่ง PM2 ที่ใช้บ่อย:

```bash
pm2 list                                    # ดู process ทั้งหมด
pm2 logs production-analysis-service        # ดู log
pm2 restart production-analysis-service     # restart service
pm2 stop production-analysis-service        # หยุด service
```

#### รันแบบ development (ไม่ใช้ PM2)

```bash
npm run local_v1
```

#### เปิดใช้งาน

- **Admin UI (Node-RED Editor):** http://localhost:2300
- **API Base URL:** http://localhost:2300

---

## การรันทั้งระบบ

ระบบแบ่งการ deploy เป็น 2 ส่วน:

| Service | วิธีรัน | Port |
|---|---|---|
| **MongoDB** | Docker Compose | 27117 |
| **Frontend (React Dashboard)** | Docker Compose | 8000 |
| **Backend (Node-RED)** | PM2 บน host | 2300 |

### 1. Start MongoDB + Frontend (Docker Compose)

```bash
docker compose up -d --build
```

คำสั่งนี้จะ:
- Build Frontend image จาก `../SCGHOUSE_Front/Dockerfile` โดยอัตโนมัติ
- รัน MongoDB container พร้อม health check
- รัน Frontend container หลัง MongoDB พร้อมใช้งาน

### 2. Start Backend (PM2)

```bash
sh start.sh
```

### ตรวจสอบสถานะ

```bash
# Docker services
docker compose ps

# Backend (PM2)
pm2 list
```

---

## API Endpoints

### Authentication
| Method | Endpoint | คำอธิบาย |
|---|---|---|
| POST | `/api/login` | เข้าสู่ระบบ |
| POST | `/api/register` | สมัครสมาชิก |
| GET | `/api/auth` | ตรวจสอบ JWT Token |

### Production Data
| Method | Endpoint | คำอธิบาย |
|---|---|---|
| POST | `/api/scan-qr` | รับข้อมูล QR/Barcode |
| POST | `/api/cross-zone` | ย้ายข้อมูลข้าม Zone |
| PUT | `/api/skip-zone/:id` | ข้าม Zone |
| PUT | `/api/weight/:id` | อัปเดตน้ำหนัก |
| PUT | `/api/update/install-date` | อัปเดตวันติดตั้ง |

### Reports
| Method | Endpoint | คำอธิบาย |
|---|---|---|
| GET | `/api/report/house` | รายงานการผลิตบ้าน |
| GET | `/api/report/part` | รายงานชิ้นส่วน |
| GET | `/api/report/part-zone/:zone` | รายงานชิ้นส่วนตาม Zone |
| GET | `/api/report/weight` | รายงานน้ำหนัก |
| GET | `/api/export/house` | Export รายงานบ้าน (Excel) |
| GET | `/api/export/part` | Export รายงานชิ้นส่วน (Excel) |

### Work Schedule
| Method | Endpoint | คำอธิบาย |
|---|---|---|
| GET | `/api/schedules` | ดูตารางงานทั้งหมด |
| POST | `/api/schedule/` | สร้างตารางงาน |
| PUT | `/api/schedule/edit` | แก้ไขตารางงาน |

---

## โครงสร้างโปรเจกต์

```
SCGHOUSE_Backend/
├── flow/
│   └── production_analysis.json    # Node-RED flow หลัก (logic ทั้งหมดของระบบ)
├── packages/
│   └── node_modules/
│       ├── @node-red/                # Node-RED core modules
│       └── node-red/                 # Node-RED executable (red.js)
├── scripts/
│   ├── build-custom-theme.js         # สร้าง theme สำหรับ Node-RED UI
│   ├── set-package-version.js        # จัดการ version ของ packages
│   └── verify-package-dependencies.js
├── docker-compose.yml                # Docker services (MongoDB, Frontend)
├── Dockerfile                        # Docker image สำหรับ Backend
├── mongo-init.js                     # Script สร้าง database และ seed data
├── settings.js                       # ค่าตั้งค่า Node-RED runtime
├── start.sh                          # Script สำหรับรันด้วย PM2
├── package.json                      # Dependencies และ scripts
├── .env                              # Environment variables (ไม่ commit)
└── README.md
```

### Node-RED Flow Tabs

| Tab | คำอธิบาย |
|---|---|
| Config | ตั้งค่า global, database connection pools |
| TCP Scan QR | รับข้อมูลจาก QR/Barcode Scanner ผ่าน TCP |
| API | REST API endpoints ทั้งหมด |
| API Send data | ส่งข้อมูลไปยังระบบภายนอก |
| Schedule Zone | จัดการกะทำงานและเวลาพัก |
| Send data to modbus | อ่าน/เขียนข้อมูลไปยัง PLC แต่ละ Zone |
| Report Send data to modbus | ส่งข้อมูล KPI ไปแสดงบน display board |

---