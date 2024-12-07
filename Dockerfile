FROM node:18.20.2

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy environment file
COPY . .env

# Copy the rest of the application code
COPY . .

# Start the application
CMD [ "npm", "run", "start" ]
