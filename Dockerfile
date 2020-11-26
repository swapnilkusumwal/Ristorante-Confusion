FROM node
FROM mongo
WORKDIR /usr/src/app
COPY confusion /usr/src/app
RUN mongorestore /usr/src/app/confusion/
COPY backend/package*.json ./

RUN npm install
RUN ls
ADD backend /usr/src/app
RUN ls

EXPOSE 3443
CMD ["npm", "start"]
