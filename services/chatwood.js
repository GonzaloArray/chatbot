const sendMessageChatWood = async (msg = '', message_type = '') => {
  const myHeaders = new Headers();
  myHeaders.append('api_access_token', 'scYvKSvYrrbnyNuaotk7kFUy');
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    content: msg,
    message_type: message_type,
    private: true,
    content_type: 'input_email',
    content_attributes: {}
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  const accountId = 4;
  const conversationId = 1;

  const url = `https://2j29grb3-3000.brs.devtunnels.ms/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;

  try {
    const response = await fetch(url, requestOptions);

    // Verificar el estado de la respuesta
    if (response.status === 204) {
      console.log('La respuesta está vacía (sin contenido).');
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error('La respuesta no es de tipo JSON.');
      return null;
    }
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    return null;
  }
};

module.exports = { sendMessageChatWood };
