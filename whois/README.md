# whois-lookup
Client for whoi is lookup database - designed as whois web page for security scenarios

## Steps to run
1. Download whois database - only sample is for free on this page https://whoisdatacenter.com/whois-database/
2. Specify name of whois database file with all data to whoisToJSON.py script in prepara_data folder 
3. Run whoisToJSON.py script
4. Use command to load created data to postgres database:
psql -h hostname -d databasename -U username -f file.sql

## Install node_modules dependencies and run it
cd project root directory  
npm istall  
npm start  
type http://localhost:8080/ to your browser  

## Test it!
Type domain name which is in database. If you used provided data you can insert 01cukurovabims.com and type search.



# DOCKER 

## ONLY FOR A TRY

1. Download folder whois-docker from repository    
2. Move inside it using command  
	cd path/to/whois-docker 
3. Call following commands  
	docker-compose pull  
	docker-compose up  
4. If nodejs server fails, plese wait for insertion of data in database and text that is ready and call command docker-compose up again  


## INICIALIZATION

1. Move to cloned repository
2. Call command:  
	docker-compose up --build  
3. Find out which id belongs to postgres container:  
	docker ps  
3. Call commands to insert data: (new.sql is a file with data and 0fd79a00 are first chars of running postgres container)  
	docker cp ./prepare_data/new.sql 0fd79a00:/new.sql  
	docker exec -it 0fd79a00 psql -d postgres -U postgres -f ./new.sql  

	template for commands is:  
		docker cp ./prepare_data/new.sql postgresContainerId:/new.sql  
		docker exec -it postgresContainerId psql -d postgres -U postgres -f ./new.sql  
4. Open browser on http://localhost:8080  
5. Type cukurova in the input in the middle and hit search  
	if result is displayed all is configured well  


## NORMAL USAGE AFTER INICIALIZATION
   Only run command:  
	docker-compose up  

   Aplication should run on link in browser: http://localhost:8080  
