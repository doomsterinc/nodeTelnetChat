var net = require("net"); //TCP Module
var carrier = require("carrier"); //Carrier Module
var connections = []; //Conections Array

//Start Server

var server = net.createServer(function(conn){
	
	//Add in array one user connection
	connections.push(conn);

	//Event for remove user if connection down
	conn.on('close', function(){
		var pos = connections.indexOf(conn);
		if(pos >= 0){
			connections.splice(pos, 1);
		}
	});

	//Show in client message the start in mini-chat
	conn.write("Node Chat Name: ");

	//Var for identify name of user connection
	var username;

	//In event carry is this mini-chat happens

	//This var line is responsible for loading chat messages

	carrier.carry(conn, function(line){
		//if var username in null state, is defined one name for her.

		if(!username){
			username = line;
			conn.write("Hi! " + username +"\n");
			return;
		}

		//Here compare this value in line for this keywords "end", "quit" and "exit" if this finish connection.

		if(line == 'end' || line == 'quit' || line == 'exit'){
			conn.end();
			return;
		} 

		//If nothing of condictions happens, while prepare one feedback message

		var feedback = username +": " + line +"\n";

		//Here happens loop of distribuiction of messages

		connections.forEach(function(one_conection){
			one_conection.write(feedback);
		});
	});
});

//Star server in 4000 port

server.listen(4000);

//Message the Server On

console.log("Mini-Chat Server in execution");