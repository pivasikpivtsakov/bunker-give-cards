# Use a lightweight web server base image
FROM nginx:alpine

# Remove the default nginx web page
RUN rm -rf /usr/share/nginx/html/*

# Copy your local files into the web server directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (already the default, but shown here for clarity)
CMD ["nginx", "-g", "daemon off;"]
