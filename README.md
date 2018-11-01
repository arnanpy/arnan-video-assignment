
จากโจทย์ ให้พัฒนาเว็บแสดง Video Chart จำนวน 10 รายการ เรียงตามลำดับคะแนน โดย
- Video แต่ละตัวสามารถ View และกด Like ได้
    video แต่ละตัวจะสามารกด ที่รูปตัวอย่าง หรือ ชื่อวิดีโอ เพื่อเปิด popup สำหรับเล่นวิดีโอขึ้นมาได้ และทำการนับยอดวิวจากตอนกดคลิ้ก play เท่านั้น
- คะแนนของ Video คำนวณจากยอด View และ ยอด Like
    ระบบ Backend จะนำยอดวิวและยอดไลค์ไปเก็บ และทำการดึงข้อมูลจาก database มาคำนวณคะแนน โดยในที่นี้จะนำยอดวิวและยอดไลค์มารวมกันเป็นคะแนนของวิดีโอ
- Video Chart เปลี่ยนแปลงการแสดงผลโดยไม่ต้อง Refresh page
    ในที่นี้ ระบบใช้วิธี polling ข้อมูลล่าสุดจาก server เพื่อแสดงผลอันดับที่อัพเดตล่าสุด รวมทั้งยอดวิวทั้งหมด และ ยอดไลค์ ยกเว้นการที่ user กดไลค์ ข้อมูลจะเปลี่ยนแปลงทันที
- พัฒนา API ที่ต้องใช้งานทั้งหมด เช่น get video chart, like video, video score calculation
    API ทั้งหมดมีดังนี้
    GET "/videos" : แสดงวิดีโอทั้งหมดแต่ไม่เรียงลำดับ
    GET "/ranking: : แสดงวิดีโอทั้งหมด 10 อันดับแรก เรียงตามคะแนน
    GET "/score/:id" : แสดงค่าคะแนนของวิดีโอ
    POST '/videos/like' : เมิ่อกด like หรือยกเลิกการกด like จะส่งค่า user ที่ชื่นชอบวิดีโอนั้น ให้ backend เพิ่มรายชื่อ user หากเป็นการกด like หรือ ลบรายชื่อหากยกเลิกการกด like
    POST '/videos/view' : เพิ่มจำนวนยอดวิวของวิดีโอของวิดีโอที่ส่งค่าไป
- ข้อมูลเก็บในฐานข้อมูล
    ใช้ฐานข้อมูล mongodb โดยมี collections videos และ users 
- ข้อมูล video เบื้องต้น สามารถดูได้จากไฟล์ video.json
    เมื่อเริ่ม install script จะนำข้อมูลใน video.json ไปเก็บไว้ในฐานข้อมูลเพื่อเป็นข้อมูลตั้งต้นในการแสดงผล
- ส่ง code ทาง repository ของ GitHub
- Application ที่พัฒนาต้องรันอยู่บน Docker Container
    ระบบเบื้องต้นประกอบด้วยสามส่วนคือ
    - Database ใช้ Mongodb
    - Backend ทำงานบน express framework ร่วมกับ mongoose เพื่อต่อ database
    - Frontend ทำงานบน Angular framework version 6
    โดยสคริปการทำงานเบื้องต้น จะต้องติดตั้งระบบทั้งสามและทำการ import ข้อมูลเข้าสู่ฐานข้อมูล ด้วยคำสั่ง

    docker-compose -f docker-compose.yml -f docker-compose.seed.user.yml -f docker-compose.seed.video.yml up

    หลังจากนั้น สามารถสั่งเปิดระบบด้วยคำสั่ง
    docker-compose up --build

Backend : Express server
    GET "/videos" : get video
    GET "/ranking: : get video with top ten ranking
    GET "/score/:id" : calculate score of video id
    POST '/videos/like' : toggle like people of video
    POST '/videos/view' : add view number of video

วิธีคำนวณคะแนน 
 ใช้ยอด view รวมกับ ยอดไลค์

Database : MongoDB
    - collection name : video

Frontend : Angular