# Dockerfile for Frontend
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "build"]
