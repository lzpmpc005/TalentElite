#include "crow.h"
#include "BackupService.hpp"
#include <filesystem>
#include <vector>

int main() {
    crow::SimpleApp app;


    CROW_ROUTE(app, "/backup")
    .methods("POST"_method)([](){
        return BackupService::backupDatabase();
    });

    
    CROW_ROUTE(app, "/api/backups")
    .methods("GET"_method)([](){
        return BackupService::getBackupFiles();
    });

  
    app.port(8080).multithreaded().run();
}
