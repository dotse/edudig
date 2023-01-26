package apiserver

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "Welcome to Digish!")
	if err != nil {
		log.Printf("Fprintf messed up..")
	}
	fmt.Println("Endpoint Hit: homePage")
}

func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/digish", digish).Methods("Post")
	log.Fatal(http.ListenAndServe(":8053", myRouter))
}
