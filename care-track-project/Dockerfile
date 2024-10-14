# Stage 1: Build the Next.js app
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file from the host machine into the container
# Assuming the .env file is in the root directory of your project
COPY /home/g65070248/CareTrack/care-track-project/.env .env

# Build the Next.js app
RUN npm run build

# Stage 2: Production image with only necessary files
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copy the build files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Copy the .env file into the production stage
COPY --from=builder /app/.env .env

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
