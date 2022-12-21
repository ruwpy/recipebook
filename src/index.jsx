import './sass/index.scss';
import App from './App';
import reactDom from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import store from "./store/store";

reactDom.createRoot(document.getElementById('root')).render(
  <>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </>
)
