package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"

    "github.com/golang-jwt/jwt/v4"
    "github.com/gorilla/mux"
)

var jwtKey = []byte("my_secret_key")

type Credentials struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

type Claims struct {
    Username string `json:"username"`
    jwt.StandardClaims
}

func login(w http.ResponseWriter, r *http.Request) {
    var creds Credentials
    err := json.NewDecoder(r.Body).Decode(&creds)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    if !authenticateUser(creds.Username, creds.Password) {
        w.WriteHeader(http.StatusUnauthorized)
        return
    }

    expirationTime := time.Now().Add(5 * time.Minute)
    claims := &Claims{
        Username: creds.Username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(jwtKey)
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"token": tokenString, "message": "Login successful"})
}

func authenticateUser(username, password string) bool {
    return username == "admin" && password == "admin123"
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/login", login).Methods("POST")
    log.Println("Server is running on port 8888...")
    log.Fatal(http.ListenAndServe(":8888", r))
}
