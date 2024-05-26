#include "BackupService.hpp"
#include <ctime>
#include <fstream>
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

crow::response BackupService::backupDatabase() {
    // 获取当前时间
    std::time_t now = std::time(nullptr);
    char timestamp[20];
    std::strftime(timestamp, sizeof(timestamp), "%Y%m%d_%H%M%S", std::localtime(&now));

    // 原始 SQLite 数据库文件路径
    std::string originalFile = "/Users/v/talentelite/content/db.sqlite3";
    
    // 备份文件路径
    std::string backupFile = "/Users/v/talentelite/backup/database_backup/db_backup_" + std::string(timestamp) + ".sqlite3";

    try {
        std::ifstream src(originalFile, std::ios::binary);
        if (!src.is_open()) {
            std::cerr << "Failed to open source file: " << originalFile << std::endl;
            return crow::response(500, "Backup failed: Failed to open source file");
        }

        std::ofstream dst(backupFile, std::ios::binary);
        if (!dst.is_open()) {
            std::cerr << "Failed to open destination file: " << backupFile << std::endl;
            return crow::response(500, "Backup failed: Failed to open destination file");
        }

        dst << src.rdbuf();

        if (src.fail() || dst.fail()) {
            std::cerr << "Failed to copy file from " << originalFile << " to " << backupFile << std::endl;
            return crow::response(500, "Backup failed: Failed to copy file");
        }

        std::cerr << "Backup successful from " << originalFile << " to " << backupFile << std::endl;
        return crow::response(200, "Backup successful!");
    } catch (const std::exception& e) {
        std::cerr << "Exception occurred: " << e.what() << std::endl;
        return crow::response(500, std::string("Backup failed: ") + e.what());
    }
}

crow::response BackupService::getBackupFiles() {
    std::vector<std::string> files;
    std::string path = "/Users/v/talentelite/backup/database_backup/";
    for (const auto& entry : fs::directory_iterator(path)) {
        files.push_back(entry.path().filename().string());
    }

    crow::json::wvalue response;
    response["backups"] = files;
    return crow::response(200, response);
}
