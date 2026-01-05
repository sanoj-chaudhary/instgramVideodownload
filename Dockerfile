FROM node:20-bullseye

# Install required system packages
RUN apt-get update \
    && apt-get install -y ffmpeg curl \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp (official binary)
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp \
    && chmod +x /usr/local/bin/yt-dlp

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install node dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
