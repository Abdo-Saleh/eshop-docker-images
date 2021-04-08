# SecurityEshop

This project was developed as part of team project. 
 
Frontend: localhost:4200  
Backend (cant be seen): localhost:8080  
Whois: localhost:5001  
Email server: localhost:8025  
 
 
## BUILD
- if you build app on your own and you cant build spring on your own, please download latest image on link below and replace old one in cyran-back-end/target
  https://ulozto.cz/file/H4kqRvTWzFli/server-0-0-1-snapshot-jar
  password: cyran  

## FOR LOCAL DEPLOYMENT - RECOMMENDED  (WITH WHOIS)
1. Download docker, docker-compose  
2. sudo docker-compose -f docker-compose-local-with-mail-whois.yml up  
   or  
    docker-compose -f docker-compose-local-with-mail-whois.yml up  
Open localhost:5001 to see if Whois works


## FOR LOCAL DEPLOYMENT - RECOMMENDED  (WITHOUT WHOIS)
1. Download docker, docker-compose  
2. sudo docker-compose -f docker-compose-local-with-mail.yml up  
   or  
    docker-compose -f docker-compose-local-with-mail.yml up  


### FOR OPENING FAKE MAIL SERVER AND SEE MAILS  
 - system must have evidence about email to deliver message  
 - open in your browser: localhost:8025  


## RESTARTING WITH CLEAN DATA  
 - first call docker-compose with down and after it with up to run again  
	docker-compose -f docker-compose-local-with-mail.yml down  
	docker-compose -f docker-compose-local-with-mail.yml up  


## ONLY FOR A TRY  

1. Download docker, docker-compose  
2. sudo docker-compose up  