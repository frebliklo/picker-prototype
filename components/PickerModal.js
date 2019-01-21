import React from 'react'
import {
  Animated,
  Easing,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native'

class PickerModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalAnimation: new Animated.Value(0),
      itemValue: this.props.selectedValue,
      itemPosition: 0
    }
  }

  showModal = () => {
    Animated.timing(this.state.modalAnimation, {
      toValue: 1,
      easing: Easing.out(Easing.quad),
      duration: 300
    }).start()
  }

  _onOkButtonPress = () => {
    const { itemValue, itemPosition } = this.state

    Animated.timing(this.state.modalAnimation, {
      toValue: 0,
      duration: 175
    }).start(() => {
      this.props.onValueChange(itemValue, itemPosition)
    })
  }

  _onValueChange = (itemValue, itemPosition) => {
    this.setState({ itemValue, itemPosition })
  }
  
  render() {
    const translateY = this.state.modalAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 0]
    })

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.modalVisible}
        onShow={this.showModal}
      >
        <Animated.View style={[styles.backdrop, { opacity: this.state.modalAnimation }]} />
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.props.onDismiss}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
          <View style={styles.buttonRow}>
            <TouchableHighlight
              style={styles.buttonContainer}
              underlayColor="rgba(0,122,255,.33)"
              onPress={this._onOkButtonPress}
            >
              <Text style={styles.okButton}>OK</Text>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={this.state.itemValue}
            onValueChange={this._onValueChange}
          >
            {this.props.items.map(item => (
              <Picker.Item
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </Picker>
        </Animated.View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    borderRadius: 0,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOpacity: .15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,.35)'
  },
  buttonRow: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: .2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
  },
  okButton: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007aff'
  },
  buttonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4
  }
})

export default PickerModal
