var json={};
json.test=function(){
	
	return new Promise(function(resolve, reject) {
		setTimeout(function(){
      alert("1");
      reject("NO");
    },1000);
		//resolve("resolve");
	})


}
var p1=json.test();


p1.then(function(n){
alert("2");
 
}, function(n) {
  alert("2");
});

/*
{
    name: 'myDoc',
    list: [
        {
            id:1
            items:[
                {id:1, name:'item1'},
                {id:2, name:'item2'}
            ]
        },
        {
            id:2
            items:[
                {id:1, name:'item1'},
                {id:3, name:'item3'}
            ]
        }
    ]
}
 var toInsert = {id: 5, name: 'item6'}
 db.abc.update(
            { name: 'myDoc', list: { $elemMatch: { id: 2 } } },
            { $addToSet: { 'list.$.items': toInsert } }
  )


quizzes" : [
      { "wk": 1, "score" : 10 },
      { "wk": 2, "score" : 8 },
      { "wk": 3, "score" : 5 },
      { "wk": 4, "score" : 6 }
   ]
$push: {
       quizzes: {
          $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ],
          $sort: { score: -1 },
          $slice: 3
       }
	{ $push: { scores: 89 } }
       { $push: { scores: { $each: [ 90, 92, 85 ] } } }



         { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } },
    { multi: true }


    $pull: { votes: { $gte: 6 } } }
    { $pull: { results: { score: 8 , item: "B" } } },
  { multi: true }

  */