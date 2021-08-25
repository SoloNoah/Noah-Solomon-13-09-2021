import { Provider } from 'react-redux';

import ChildComponent from './components/ChildComponent/ChildComponent';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <ChildComponent />
      </div>
    </Provider>
  );
}

export default App;
