import React from 'react'
import {
  Animated,
  Modal,
  Picker,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

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
    backdropOpacity: new Animated.Value(0),
    pickerText: 'Choose data type',
    dataItem: 'fuel',
    actualValue: '',
    comment: ''
  }

  onValueChange = (itemValue, itemPosition) => {
    this.setState({ dataItem: itemValue })
  }

  onValueChangeIos = (itemValue, itemPosition) => {
    this.setState({ 
      pickerText: dataItems[itemPosition].label,
      dataItem: itemValue,
    })
  }

  onOkButtonPress = () => {
    this.state.backdropOpacity.setValue(0)
    
    this.setState({ 
      modalVisible: false
    })
  }

  onCancelButtonPress = () => {
    this.state.backdropOpacity.setValue(0)
    
    this.setState({ 
      pickerText: 'Choose data type',
      modalVisible: false
    })
  }

  showIosPicker = () => {
    this.setState({ modalVisible: true })

    Animated.timing(this.state.backdropOpacity, {
      toValue: 1,
      duration: 300
    }).start()
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

  renderIosPicker = () => {
    const translateY = this.state.backdropOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0]
    })

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onShow={this.showIosPicker}
      >
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.35)' }} />
        <View style={{ flex: 1 }} />
        <Animated.View style={[styles.iosShadow, styles.pickerIos, { transform: [{ translateY }] }]}>
          <View style={styles.buttonRow}>
            <TouchableHighlight
              style={styles.buttonContainer}
              underlayColor="rgba(233,16,59,.33)"
              onPress={this.onCancelButtonPress}
            >
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonContainer}
              underlayColor="rgba(0,122,255,.33)"
              onPress={this.onOkButtonPress}
            >
              <Text style={styles.okButton}>OK</Text>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={this.state.dataItem}
            onValueChange={this.onValueChangeIos}
          >
            {dataItems.map(item => <Picker.Item key={item.value} value={item.value} label={item.label} />)}
          </Picker>
        </Animated.View>
      </Modal>
    )
  }
  
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        {Platform.OS === 'ios' && this.renderIosPicker()}
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
  pickerIos: {
    backgroundColor: '#FFF',
    borderRadius: 0,
    paddingTop: 16,
    paddingBottom: 24,
  },
  buttonRow: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  okButton: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007aff'
  },
  cancelButton: {
    fontSize: 15,
    color: '#e9103b'
  },
  buttonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4
  }
})

export default ReportBadData
