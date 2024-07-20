# syntax=docker/dockerfile:1.3-labs
# The above line ensures that Docker BuildKit features are enabled

# Stage 1: Build
FROM public.ecr.aws/docker/library/node:20.15.0 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install the dependencies using a mount cache to speed up the process
#RUN --mount=type=cache,target=/root/.npm \
#    npm install
RUN npm install --no-cache

# Copy the rest of the application code
COPY . .

RUN npm rebuild bcrypt --build-from-source

# Build the application (if needed, e.g., for TypeScript or bundling assets)
# RUN npm run build

# Stage 2: Run
FROM public.ecr.aws/docker/library/node:20.15.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app .

# Install only production dependencies using the cached node_modules folder from build stage
RUN npm install --only=production --prefer-offline

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/app.js"]