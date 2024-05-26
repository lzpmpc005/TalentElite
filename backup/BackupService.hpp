#ifndef BACKUP_SERVICE_HPP
#define BACKUP_SERVICE_HPP

#include "crow.h"
#include <string>

class BackupService {
public:
    static crow::response backupDatabase();
    static crow::response getBackupFiles();
};

#endif /* BACKUP_SERVICE_HPP */
