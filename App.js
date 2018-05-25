import React from 'react';
import { StyleSheet, Text, View,  Button, Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Hyperlink from 'react-native-hyperlink'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coordinates: '' };
  }

  convertCoordinates(gridReference) {
    if (!gridReference || gridReference.length != 8) {
      this.setState({coordinates: ""});
      return;
    }
    var OsGridRef = require('geodesy').OsGridRef;

    var gridref = OsGridRef.parse(gridReference);

    var pWgs84 = OsGridRef.osGridToLatLon(gridref);

    this.setState({coordinates: pWgs84.lat.toString() + ',' + pWgs84.lon.toString()})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open OS Grid Reference in Google maps</Text>
        <TextInput> {`${this.state.coordinates}`}</TextInput>
        <TextInput
           style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.convertCoordinates(text)}/>
      <Button onPress={() => Linking.openURL(`http://www.google.com/maps/place/${this.state.coordinates}`)} title="Open in Google maps" disabled={!this.state.coordinates}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
