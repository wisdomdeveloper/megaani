# Use an official Node.js image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
