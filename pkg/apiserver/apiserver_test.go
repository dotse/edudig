package apiserver

import (
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", homePage)
	return router
}
func TestAPIServer_homePage(t *testing.T) {
	request, _ := http.NewRequest("GET", "/", nil)
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.Equal(t, response.Body.String(), "Welcome to Digish!")

}


package apiserver

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", "*")
	w.Header().Set("access-control-allow-methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("access-control-allow-headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
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
	myRouter := mux.NewRouter()
	myRouter.HandleFunc("/", homePage).Methods("GET", "OPTIONS")
	myRouter.HandleFunc("/digish", digish).Methods("POST")
	log.Fatal(http.ListenAndServe(":8053", myRouter))
}
