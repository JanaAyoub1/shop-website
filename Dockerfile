# Step 1: Build the Angular application
# Use an official Node.js image as the base for building the Angular app
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project to the working directory
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Step 2: Serve the Angular application using an NGINX web server
# Use an official NGINX image as the base for the production server
FROM nginx:alpine

# Copy the built Angular app from the previous step to the NGINX directory
COPY --from=build /app/dist/shop-website /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
