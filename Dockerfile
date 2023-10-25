# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire app source code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
