# 使用官方 Node.js 镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（或 yarn.lock）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用的其余文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 设置环境变量
ENV NODE_ENV production

# 启动 Next.js 服务（SSR）
CMD ["npm", "run", "start"]
