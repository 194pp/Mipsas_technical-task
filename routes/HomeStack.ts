import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Home from "../screens/Home";
import Issues from "../screens/Issues";

const screens = {
  Home: {
    screen: Home,
  },
  Issues: {
    screen: Issues,
  }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
