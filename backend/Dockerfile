# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev --no-audit --no-fund

# Copy application files
COPY . .

# Create uploads directory
RUN mkdir -p public/uploads

ENV NODE_ENV=production

# Expose port
EXPOSE 4000

# Start command (migrations run via docker-compose)
CMD ["npm", "start"]
