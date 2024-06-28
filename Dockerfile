FROM node:16.19.0-alpine
#cappy all files in the current directory to the container except node_modules, data
COPY . /app
#set the working directory in the container
WORKDIR /app
#install all dependencies
RUN npm install
#install dotenv
RUN npm install dotenv
#start the application npm run local_v1
CMD ["npm", "run", "local_v1"]