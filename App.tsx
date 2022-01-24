import {Provider} from "react-redux";
import store from "./store";
import Navigator from './routes/HomeStack';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
