class ApiCall {
  getData(userInput, displayData){
    let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(results) {
      displayData(results)
    }, function() {
      console.log('something went wrong');
    });
  }
}

export { ApiCall };
