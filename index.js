const smpp = require('smpp')

const options = {
  url: 'smpp://localhost:2775',
  auto_enquire_link_period: 10000,
  debug: true,
}

const session = smpp.connect(options, sessionCallback)

function sessionCallback(session) {
  session.bind_transceiver(
    {
      system_id: 'TR_c3397457208',
      password: 'e6491f5b',
    },
    function (pdu) {
      console.log('pdu =======>', pdu)
      if (pdu.command_status === 0) {
        // Successfully bound
        session.submit_sm(
          {
            destination_addr: '2250758991427',
            short_message: 'Hello!',
          },
          function (pdu) {
            console.log('pdu =======>', pdu)
            if (pdu.command_status === 0) {
              // Message successfully sent
              console.log(pdu.message_id)
            }
          },
        )
      }
    },
  )
}
