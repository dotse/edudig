package apiserver

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		return
	}
	fmt.Println("Endpoint Hit: homePage")

	response, err := json.Marshal(map[string]string{"content": "Welcome to EduDig"})
	if err != nil {
		panic(err)
	}
	w.Write(response)
}

func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/digish", digish).Methods("POST", "OPTIONS")
	log.Fatal(http.ListenAndServe(":8053", myRouter))
}
