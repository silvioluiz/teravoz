const WebHookTypes = [
  'call.new',
  'call.standby',
  'call.waiting',
  'call.ongoing',
  'call.finished',
];

const TheirNumbers = [
  911111111,
  922222222,
  933333333,
  944444444,
  955555555,
  966666666,
  977777777,
  988888888,
];

const ourFixNumber = '08002018099';

class CallEvent {
  constructor(callId, code, direction, ourNumber, theirNumber, timestamp, type) {
    this.call_id = callId;
    this.code = code;
    this.direction = direction;
    this.our_number = ourNumber;
    this.their_number = theirNumber;
    this.timestamp = timestamp;
    this.type = type;
  }

  static builderRandom() {
    const event = new CallEvent(
      Math.random().toString(),
      Math.floor((Math.random() * 999999)).toString(),
      'inbound',
      ourFixNumber,
      TheirNumbers[
        Math.floor((Math.random() * (TheirNumbers.length)))
      ],
      new Date().toISOString(),
      WebHookTypes[
        Math.floor((Math.random() * (WebHookTypes.length)))
      ],
    );
    return event;
  }
}

module.exports = CallEvent;
