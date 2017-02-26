//Hello.json
[{
    name: 'image1',
    Image: 'url'
},{
    name: 'image1',
    Image: 'url'
},{ 
    name: 'image1',
    Image: 'url'
}]

Var hello; 

// with callback
request('hello.json', results => { 
    hello = results.map(result => result.image);
});


//with promise
requestPromise('hello.json')
    .then(results => { 
        hello = results.map(result => result.image);
    });

// OR lets say
var callbackFunc = results => { 
    hello = results.map(result => result.image);
}

//with callback
request('hello.json', callbackFunc)

//with promise
requestPromise('hello.json')
    .then(callbackFunc)

