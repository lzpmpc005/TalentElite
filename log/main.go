package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

// LogEntry represents an API operation log entry
type LogEntry struct {
	Timestamp string `json:"timestamp"`
	Method    string `json:"method"`
	Endpoint  string `json:"endpoint"`
	Status    int    `json:"status"`
}

var logFilePath = "api_log.json" // 日志文件路径

// logToFile writes a log entry to the log file
func logToFile(entry LogEntry) {
	file, err := os.OpenFile(logFilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println("Error opening log file:", err)
		return
	}
	defer file.Close()

	entryJSON, err := json.Marshal(entry)
	if err != nil {
		log.Println("Error marshalling log entry:", err)
		return
	}

	if _, err := file.Write(entryJSON); err != nil {
		log.Println("Error writing log entry to file:", err)
		return
	}
	if _, err := file.WriteString("\n"); err != nil {
		log.Println("Error writing newline to log file:", err)
		return
	}

	log.Println("Log entry written to file:", entry)
}

// logApiOperation handles logging API operations
func logApiOperation(w http.ResponseWriter, r *http.Request) {
	var entry LogEntry
	if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	entry.Timestamp = time.Now().Format(time.RFC3339)
	logToFile(entry)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Log entry created"})
}

// getLogEntries retrieves log entries from the log file
func getLogEntries(w http.ResponseWriter, r *http.Request) {
	file, err := ioutil.ReadFile(logFilePath)
	if err != nil {
		http.Error(w, "Error reading log file", http.StatusInternalServerError)
		return
	}

	logEntries := []LogEntry{}
	for _, line := range strings.Split(string(file), "\n") {
		if len(line) == 0 {
			continue
		}

		var entry LogEntry
		if err := json.Unmarshal([]byte(line), &entry); err != nil {
			log.Println("Error unmarshalling log entry:", err)
			continue
		}

		logEntries = append(logEntries, entry)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(logEntries)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/log", logApiOperation).Methods("POST")
	router.HandleFunc("/logs", getLogEntries).Methods("GET")

	port := "8081"
	fmt.Printf("Server is running on port %s\n", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatal(err)
	}
}
