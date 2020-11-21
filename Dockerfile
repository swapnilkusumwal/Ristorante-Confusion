FROM node
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install
COPY . /usr/src/app
EXPOSE 3443
CMD ["npm", "start"]
