ระบบเบื้องต้นประกอบด้วยสามส่วนคือ
- Database ใช้ Mongodb
- Backend ทำงานบน express framework ร่วมกับ mongoose เพื่อต่อ database
- Frontend ทำงานบน Angular framework version 6
โดยสคริปการทำงานเบื้องต้น จะต้องติดตั้งระบบทั้งสามและทำการ import ข้อมูลตัวอย่างเข้าสู่ฐานข้อมูล ด้วยคำสั่ง
```
docker-compose -f docker-compose.yml -f docker-compose.seed.user.yml -f docker-compose.seed.video.yml up
```
หลังจากนั้น สามารถสั่งเปิดระบบด้วยคำสั่ง
```
docker-compose up --build
```
- ภาพตัวอย่าง 
<img src="https://github.com/arnanpy/arnan-video-assignment/raw/master/desktop-ss.png">
<img src="https://github.com/arnanpy/arnan-video-assignment/raw/master/mobile-ss.png" width="300px">