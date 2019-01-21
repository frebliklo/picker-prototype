import React from 'react'
import {
  Picker,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import PickerModal from '../components/PickerModal'

const dataItems = [
  { value: 'fuel', label: 'Fuel' },
  { value: 'next_service', label: 'Next service' },
  { value: 'next_oil_change', label: 'Next oil change' },
  { value: 'mileage', label: 'Mileage' },
  { value: 'location', label: 'Location' },
  { value: 'trip_distance', label: 'Trip distance' },
  { value: 'trip_fuel', label: 'Trip fuel' },
  { value: 'trip_avg_speed', label: 'Trip average speed' },
  { value: 'trip_time', label: 'Trip time' },
]

class ReportBadData extends React.Component {
  static navigationOptions = {
    title: 'Report faulty data'
  }

  state = {
    modalVisible: false,
    pickerText: 'Choose data type',
    dataItem: 'fuel',
    actualValue: '',
    comment: ''
  }

  onValueChange = (itemValue, itemPosition) => {
    this.setState({ 
      modalVisible: false,
      pickerText: dataItems[itemPosition].label,
      dataItem: itemValue,
    })
  }

  showIosPicker = () => {
    this.setState({ 
      modalVisible: true,
     })
  }

  closeIosPicker = () => {
    this.setState({ 
      modalVisible: false,
     })
  }

  renderAndroidPicker = () => (
    <Picker
      style={[styles.pickerBase, styles.pickerAndroid]}
      selectedValue={this.state.dataItem}
      onValueChange={this.onValueChange}
      prompt="Choose the data to report"
    >
      {dataItems.map(item => <Picker.Item key={item.value} value={item.value} label={item.label} />)}
    </Picker>
  )
  
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {Platform.OS === 'ios' && (
          <PickerModal
            modalVisible={this.state.modalVisible}
            items={dataItems}
            onValueChange={this.onValueChange}
            onDismiss={this.closeIosPicker}
            selectedValue={this.state.dataItem}
          />
        )}
        <View style={styles.container}>
          <Text style={styles.paragraph}>If you experience any data not matching the actual values in your car you can report it here, so we can work on correcting this</Text>
          <Text style={styles.label}>Data</Text>
          {Platform.OS === 'ios' ? (
            <View style={[styles.pickerBase, styles.iosShadow]}>
              <TouchableHighlight onPress={this.showIosPicker} underlayColor="rgba(0,0,0,.15)">
                <Text style={{ margin: 16 }}>{this.state.pickerText}</Text>
              </TouchableHighlight>
            </View>
          ) : this.renderAndroidPicker()}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  container: {
    padding: 24
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 20,
    color: '#222',
    marginBottom: 24
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    color: '#777',
    marginBottom: 8
  },
  pickerBase: {
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  pickerAndroid: {
    padding: 16,
    elevation: 2,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOpacity: .15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
})

export default ReportBadData
