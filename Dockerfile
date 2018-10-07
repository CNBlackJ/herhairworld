FROM node
RUN mkdir -p /www/herhairworld
WORKDIR /www/herhairworld

#移动文件
COPY . /www/herhairworld

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install

RUN npm run build

EXPOSE 5001

CMD ["npm", "start" ]