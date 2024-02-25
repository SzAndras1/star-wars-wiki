FROM node:20-alpine

WORKDIR /var/lib/project

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]