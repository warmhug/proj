FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]


# 1. 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine
# 2. 设置工作目录
WORKDIR /app
# 3. 先复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./
# 4. 在镜像内安装 Node.js 依赖 (npm install)
RUN npm ci --only=production
# 5. 复制应用源代码到镜像中
COPY . .
# 6. 暴露端口
EXPOSE 3000
# 7. 定义容器启动时运行的命令
CMD [ "node", "server.js" ]


# 多阶段构建 (Multi-stage Builds)
# 第一阶段：构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci # 安装所有依赖（包括开发依赖）
COPY . .
RUN npm run build # 执行构建，生成静态文件
# 第二阶段：运行阶段
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# 只安装生产依赖
RUN npm ci --only=production
# 从第一阶段复制构建好的文件，而不是源代码
COPY --from=builder /app/dist ./dist
CMD [ "node", "server.js" ]
