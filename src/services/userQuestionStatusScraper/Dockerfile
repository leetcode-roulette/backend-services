FROM node as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder app/dist ./dist

EXPOSE 8080
CMD [ "npm", "start" ]