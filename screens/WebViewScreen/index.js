import React from 'react';
import { View, WebView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

export default class WebViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerLeft: (
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => {
            navigation.navigate(navigation.getParam('goBackTo') || 'Home');
          }}
        >
          <MaterialIcons name="navigate-before" size={28} color="#000000"/>
        </TouchableOpacity>
      ),
      headerStyle: Object.assign({
        backgroundColor: '#fff',
      }, Platform.OS === 'ios' ? {
        borderBottomWidth: 0,
        shadowOpacity: 0,
      } : {
        elevation: 0,
      }),
      headerTitleStyle:{
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        color: '#000',
      },
      headerRight: <View />
    };
  };

  render() {
    const uri = this.props.navigation.getParam('url');

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <WebView
          bounces={false}
          source={{ uri }}
          style={{ marginTop: 0 }}
          startInLoadingState={true}
        >
        </WebView>
      </>
    )
  }
}
