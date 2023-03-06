package apiserver

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// func homePage(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("access-control-allow-origin", "*")
// 	w.Header().Set("access-control-allow-methods", "POST, GET, OPTIONS, PUT, DELETE")
// 	w.Header().Set("access-control-allow-headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
// 	_, err := fmt.Fprintf(w, "Welcome to Digish!")
// 	if err != nil {
// 		log.Printf("Fprintf messed up..")
// 	}
// 	fmt.Println("Endpoint Hit: homePage")
// }

func homePage(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("access-control-allow-origin", "*")
	// w.Header().Set("access-control-allow-methods", "POST, GET, OPTIONS, PUT, DELETE")
	// w.Header().Set("access-control-allow-headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	// Stop here if its Preflighted OPTIONS request
	if r.Method == "OPTIONS" {
		return
	}
	fmt.Println("Endpoint Hit: homePage")

	response, err := json.Marshal(map[string]string{"content": "hello world"})
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
