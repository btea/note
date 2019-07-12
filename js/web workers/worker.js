onmessage = function(e){
    let data = e.data;
    console.log(data);

    postMessage('worker post message');
}