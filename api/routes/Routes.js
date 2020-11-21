// import required essentials
const express = require('express');
// create new router
const router = express.Router();
const Twitter = require('twitter');

data2 = []
// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data2);
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {
    data = []

    async function main(a,b = 15) {
    try {
    // Initialization of arrays
    var best10 = [];
    var texts = [];
    var wordsArray = [];
    var wordsMap = [];

    // Authentication
    const client = new Twitter()

    console.log(1)
    // Getting results using a as query string and b as number of results
    console.log(a)
    console.log( a +' lang:en')
    client.get('search/tweets', { q: a + ' lang:en', result_type: 'popular', count: b },function (error, tweets, response) {

            // Getting tweet datas
            let data = tweets['statuses'];

            // teking first tweet id and text of all others
            for (i in data) {
                if (i < 10) {
                    best10.push(data[i]["id"]);

                }
                texts.push(data[i]["text"]);
            }


            // splitting texts, counting number of words and returning them as wordMap
            var stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
            for (i in texts) {
                var words = texts[i].toLowerCase().split(/\W+/).filter(function (token) {
                    token = token.toLowerCase();
                    return token.length >= 2 && stopwords.indexOf(token) == -1;
                });
                //console.log(words)
                wordsArray = wordsArray.concat(words);
                //console.log(wordsArray)
            }
            //console.log(texts[0]);
            //console.log(texts[1]);
            console.log(wordsArray);
            wordsArray.forEach(function (key) {
                if (wordsMap.hasOwnProperty(key)) {
                    wordsMap[key]++;
                } else {
                    wordsMap[key] = 1;
                }
            });
            console.log(wordsMap);    
            return (wordsMap);


        });
} catch (e) {
    console.log(e);
}  
};

    
    newItem = main(req.body.search,2).catch((error) => {
    console.error(error);
    console.log("error in main");
    process.exit(1);
    });
    
    newItem.then(function (result) {
        console.log('ne');
        console.log(result);
    })
    
    console.log(newItem);
    data2.push(newItem);
    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newItem);

});



// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 
module.exports = router;