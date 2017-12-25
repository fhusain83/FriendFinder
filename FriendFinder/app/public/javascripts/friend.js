$(document).ready(function(){

$('#Submit').on('click',function(event){
 var userScores=[];
event.preventDefault();

function userProfilefunc(name,photo){
this.name=name;
this.photo=photo;
};

for(var e=1;e<11;e++)
{
	var s=$('#q'+e).val();
	userScores.push(s);
	$('#'+e).val('');
}

var userProfile=new userProfilefunc($('#name').val(),$("#photo").val());

userProfile.scores=[];

for(var o=0;o<userScores.length;o++)
{
	userProfile.scores.push(userScores[o]);
}


CallController(userProfile);
});
function CallController(userProfile){

$.post("/api/friends",userProfile,'JSON').done(function(data)
{
	console.log("hero");
//$('#FriendName').text(data.name);
//$('#FriendImg').attr('src',data.photo);
$('#friendmodal').modal('show');
});
}
});