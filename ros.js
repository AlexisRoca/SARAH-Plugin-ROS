exports.action = function(data, callback, config, SARAH) 
{
    var WebSocket = require('./lib/ws');

    var config = config.modules.ros;
    var ip = config.ip;
    var messageType = config.messageType;
    var topic = config.topic;

    var command = data.command;
    var init = JSON.stringify({'op': 'advertise', 'topic': topic, 'type': messageType});
    var msg =  JSON.stringify({'op': 'publish', 'topic': topic, 'msg': {'data': command}});

    if(command == "moderos" || command == "modeSARAH")
    {
        if(command == "moderos")
        {
            console.log("\n--------------------------   Mode ROS active   --------------------------\n")         
        }

        else
        {
            console.log("\n\n--------------------------   Fonctionnement general   --------------------------\n")         
        }    
        SARAH.play('./plugins/ros/medias/transformers.mp3');
        callback({'tts' : ""}); 
    } 

    else
    {
        var ws = new WebSocket('ws://' + ip + ':9090');

        ws.on('open', function() {
            ws.send(init);
            ws.send(msg);
        });

        callback({'tts' : command});         
    }
}