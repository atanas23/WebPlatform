1.  Install Node.js from ’https://nodejs.org/en/download/’.  This should installthe node.js environment and NPM.
2. Run 'npm install -g create-react-app'.
3.  Install MySQL.
4.  Run MySQL on port 3306.
5.  Clone to source repository from GitLab, or download the archive and extractthe files.
6.  Open the akh588 folder,  the go to ’frontend’ and delete the npm_modules folder.
7.  Open the akh588 folder,  the go to backend and delete the npm_modules folder.
8.  Open a terminal in the ’frontend’ folder.
9.  Run ’npm install’.
10.  Open a terminal in the ’backend’ folder.
11.  Run ’npm install’.
12.  Before running the the back-end and the front-end, import the file from thesub folder ’databaseExport’ into MySQL.
13.  Go  to  ../akh588/backend/db. There is a .txt file called ’credentials’. Inthere, on line 1 write the host of the DB, on line two the username for thedatabase, on line 3 the password, and do not change line 4 - it is the name of the database we imported.
14.  Make sure ports 3000 and 8080 are available.
15.  Open a terminal in ’akh588/backend’ and run ’node .app.js’.
16.  Open a terminal in ’akh588/frontend/src’ and run ’npm start’.