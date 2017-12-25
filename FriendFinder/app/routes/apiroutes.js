
const jsonfile = require('jsonfile');
const path = require('path');
module.exports = function(app){


const file = 'app/data/friends.json';
app.get('/api/friends',function(req,res){res.json(friendsData)});


function ProcessScores(user)
{
var userscores=[];
var str=JSON.stringify(user);

for(var a=str.indexOf('scores[]')+11;a<str.length-2;a++)
	if(str[a]!==','&&str[a]!=='"')
userscores.push(parseInt(str[a]));    

return userscores;

}



function findFriendMatch(user)
{
	var userscores=ProcessScores(user);
	var KeepTrack=[];
	var winningfriend;
    let contents = jsonfile.readFileSync(file);
    contents.friends.splice(contents.friends.length-1,1);
	
	contents.friends.forEach(function(friend)
	{
		
        var scores=ProcessScores(friend);
        
     var totalDiff=0;
       for(var j=0;j<scores.length;j++)
       {
        	totalDiff=totalDiff+Math.abs(scores[j]-userscores[j]);
       }   
     
            var obj={friend:friend,totalDiff:totalDiff};
       		KeepTrack.push(obj);
   });

    var min=KeepTrack =>{
    	Math.min.apply(null, KeepTrack.totalDiff);
    }

	return KeepTrack[0].friend;
}




function AddFriend(user)
{

	 let contents = jsonfile.readFileSync(file);
     contents.friends.push(user);
	 jsonfile.writeFileSync(file,contents,{spaces:2});
}




app.post("/api/friends",function(req,res)
{
var currentUser=req.body;

AddFriend(currentUser);
var newFriend=findFriendMatch(req.body);
res.json(newFriend);
//friendsArray.push(currentUser);
});


};
