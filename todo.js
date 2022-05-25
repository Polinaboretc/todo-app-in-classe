// function parseUrlParams() {

//     const url = window.location.href;
//     console.log('URL', url);
//     const urlArray = url.split('?');
//     console.log('URLarray', urlArray);
//     const paramsString = urlArray[1];
//     console.log('secondo elemento', paramsString);
//     if (paramsString) {
//         const paramsArray = paramsString.split('&');
//         console.log('array dei parametri', paramsArray);
//         const paramsObj = {};
//         for (const str of paramsArray) {
//             console.log('stringa parametro', str);
//             const strArray = str.split('=')
//             console.log('array del parametro', strArray);
//             paramsObj[strArray[0]] = decodeURIComponent(strArray[1]);
//         }
//         console.log('paramsObj', paramsObj);
//     } else {
//         return null;
//     }
// }

function parseUrlParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
    // console.log('params', params);
}

const params = parseUrlParams();
console.log(params);

// function getTodoFromSessionStorage() {
//     const todoString = sessionStorage.getItem('selectedTodo');
//     if (todoString) {
//         const todo = JSON.parse(todoString);
//         console.log('todo', todo);
//     }
// }

// getTodoFromSessionStorage()