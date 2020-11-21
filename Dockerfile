FROM node
WORKDIR /usr/src/app
COPY backend/package.json /usr/src/app/
RUN npm install
RUN ls
ADD backend /usr/src/app
RUN ls
EXPOSE 3443
CMD ["npm", "start"]
