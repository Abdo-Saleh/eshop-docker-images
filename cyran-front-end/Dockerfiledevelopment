FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json

# RUN npm install -g @angular/cli @angular-devkit/build-angular @angular/material && npm install
RUN npm install

# copy codebase to docker codebase
COPY . .

CMD ["npm", "start"]
