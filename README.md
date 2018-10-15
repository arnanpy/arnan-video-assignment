Run:
- First time must be populating user and video database with thest command 
    docker-compose -f docker-compose.yml -f docker-compose.seed.user.yml -f docker-compose.seed.video.yml up --build

- After that, can run with these command 
    docker-compose up --build