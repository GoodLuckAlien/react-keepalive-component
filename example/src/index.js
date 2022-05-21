import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import store from './store'
import { KeepaliveScope } from 'react-keepalive-component'

//打包时，用的HashRouter并加上了basename，因为放在服务器的二级目录下

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<HashRouter>
  <LocaleProvider locale={zh_CN}>
    <Provider {...store}>
      <KeepaliveScope>
        <App />
      </KeepaliveScope>   
    </Provider>
  </LocaleProvider>
</HashRouter>)

registerServiceWorker();
