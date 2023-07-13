import React from 'react'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Card } from 'reactstrap';

function ChatWithSeller() {
  // all available props
  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#FC5241',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#FC5241',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };
  return (

    <>
    
    <div className="listContactsProveedores">
      <Card>
          <h2>Chats</h2>
          <ul>
            <li>Cliente 1</li>
            <li>Cliente 2</li>
            <li>Cliente 3</li>
            <li>Cliente 4</li>
            <li>Cliente 5</li>
          </ul>
      </Card>
    </div>

    <ThemeProvider theme={theme}>

      <ChatBot
        steps={[
          {
            id: 'hello-world',
            message: 'Hello World!',
            end: true,
          },
        ]}
      />
    </ThemeProvider>

    </>
  )
}

export default ChatWithSeller
