# Build stage
FROM node:24.11.1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:24.11.1-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --no-audit --no-fund

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
