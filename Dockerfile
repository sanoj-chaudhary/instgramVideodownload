FROM node:20-bookworm

# Install Python 3.11, pip, ffmpeg, curl
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ✅ FIX: allow pip to install system packages
RUN pip3 install -U yt-dlp --break-system-packages

# (Optional but recommended) verify install
RUN python3 --version && yt-dlp --version

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
