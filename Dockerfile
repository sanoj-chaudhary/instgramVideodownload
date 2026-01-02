FROM node:20-bullseye

# Install yt-dlp
RUN apt-get update && apt-get install -y yt-dlp

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
