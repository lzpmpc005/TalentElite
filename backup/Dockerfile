# 使用官方的 C++ 镜像作为基础镜像
FROM gcc:latest

# 安装必要的工具和依赖
RUN apt-get update && \
    apt-get install -y cmake git wget libsqlite3-dev libasio-dev && \
    apt-get clean

# 下载并安装 Crow
RUN git clone https://github.com/CrowCpp/Crow.git && \
    cd Crow && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make && \
    make install

# 将当前目录内容复制到容器中的 /app 目录
COPY . /app

# 设置工作目录
WORKDIR /app

# 运行 CMake 和 Make 构建项目
RUN rm -rf build && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make

# 设置容器启动时的默认命令
CMD ["./build/crow-backup"]
