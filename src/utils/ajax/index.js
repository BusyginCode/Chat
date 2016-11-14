
export default ({url, data, method = 'POST', responseType, contentType}) => new Promise((res, rej) => {

  console.log(url, data, method)
  
  let request = new XMLHttpRequest()

  request.open(method, url, true)
  request.setRequestHeader('Content-Type', contentType || 'application/json; charset=UTF-8')
  // request.setRequestHeader('Authorization', tocken)

  //document.querySelector('meta[name="_csrf_header"]').getAttribute('content'), document.querySelector('meta[name="_csrf"]').getAttribute('content'))

  request.onload = () => {
    if (request.status == 200) {

      let response = request.responseText

      try {
        response = JSON.parse(response)
      } catch (e) {
        rej(e)
      }

      console.log('Response: ', response)

      if (func) {
        res(response)
      }

    } else if (request.status >= 400) {
      rej()
    }
  };

  request.send((typeof data === 'object') ? JSON.stringify(data) : data)

})