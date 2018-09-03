//FIXME: Colocar apenas os eventos de Webhook. Criar eventos de atendente e enviar no mesmo builderRandom
//TODO Implementar EventEmitter Pattern.
const WebHookTypes = [
    "call.new",
    "call.waiting",
    "call.standby",
    "call.ongoing",
    "call.overflow", 
    "call.follow-me",
    "call.finished"
];

const TheirNumbers = [
    "911111111",
    "922222222",
    "933333333",
    "944444444",
    "955555555",
];

const ourNumber = "08002018099";

class CallEvent {
    constructor(call_id, code, direction, our_number, their_number, timestamp, type){
        this.call_id = call_id;
        this.code = code;
        this.direction = direction;
        this.our_number = our_number;
        this.their_number = their_number;
        this.timestamp = timestamp;
        this.type = type;
    }

    static builderRandom(){
        let event = new CallEvent(
            Math.random().toString(),
            Math.floor((Math.random()* 999999)).toString(),
            'inbound',
            ourNumber,
            TheirNumbers[
                Math.floor((Math.random()* (TheirNumbers.length ))) 
            ],
            new Date().toISOString(),
            WebHookTypes[ 
                Math.floor((Math.random()* (WebHookTypes.length))) 
            ]
        );
        return event;
    }
}

module.exports = CallEvent;