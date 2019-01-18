import React from 'react'
import {
  Animated,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

class PickerModal extends React.Component {
  state = {
    modalAnimation: new Animated.Value(0)
  }

  showModal = () => {
    Animated.timing(this.state.modalAnimation, {
      toValue: 1,
      duration: 200
    }).start()
  }

  _onOkButtonPress = () => {
    Animated.timing(this.state.modalAnimation, {
      toValue: 0,
      duration: 175
    }).start(() => {
      this.props.onConfirm()
    })
  }

  _onCancelButtonPress = () => {
    Animated.timing(this.state.modalAnimation, {
      toValue: 0,
      duration: 175
    }).start(() => {
      this.props.onDismiss()
    })
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
        <View style={{ flex: 1 }} />
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
          <View style={styles.buttonRow}>
            <TouchableHighlight
              style={styles.buttonContainer}
              underlayColor="rgba(233,16,59,.33)"
              onPress={this._onCancelButtonPress}
            >
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonContainer}
              underlayColor="rgba(0,122,255,.33)"
              onPress={this._onOkButtonPress}
            >
              <Text style={styles.okButton}>OK</Text>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={this.props.selectedValue}
            onValueChange={this.props.onValueChange}
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
    backgroundColor: '#FFF',
    borderRadius: 0,
    paddingTop: 16,
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

export default PickerModal
