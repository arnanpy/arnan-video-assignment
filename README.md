Run:
- First time must be populating user and video database with thest command 
    docker-compose -f docker-compose.yml -f docker-compose.seed.user.yml -f docker-compose.seed.video.yml upw
- After that, can run with these command 
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