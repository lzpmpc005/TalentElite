cmake_minimum_required(VERSION 3.10)

project(crow-backup)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_C_COMPILER /usr/bin/clang)
set(CMAKE_CXX_COMPILER /usr/bin/clang++)

# 查找 Crow 包
include_directories(/usr/local/include)
link_directories(/usr/local/lib)
set(CMAKE_EXE_LINKER_FLAGS "-L/usr/local/lib")

# 添加可执行文件
add_executable(crow-backup main.cpp BackupService.cpp)

# 链接 Crow 库
target_link_libraries(crow-backup pthread)
