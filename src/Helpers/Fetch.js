export const Fetch = (url, callback) => {
    fetch(url)
       .then(response => response.json())
       .then(json => callback(null, json))
       .catch(error => callback(error, null))
}
