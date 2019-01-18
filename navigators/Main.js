import { createAppContainer, createStackNavigator } from 'react-navigation'

import ReportBadData from '../containers/ReportBadData'

const Main = createStackNavigator({
  ReportBadData: {
    screen: ReportBadData
  }
})

export default createAppContainer(Main)
