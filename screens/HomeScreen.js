import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { WebBrowser } from 'expo';
import homeData from '../services/data/home';
// import { Button } from '@ant-design/react-native';

const appLogos = {
  chentaibao: require('../assets/images/app/chentaibao.png'),
  suiyifang: require('../assets/images/app/suiyifang.png'),
  xiguajinrong: require('../assets/images/app/xiguajinrong.png'),
};

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '马上发',
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerStyle: Object.assign({
        backgroundColor: '#fff',
        borderBottomWidth: 0,
       }, Platform.OS === 'ios' ? {
        borderBottomWidth: 0,
        shadowOpacity: 0,
      } : {
        elevation: 0,
      }),
    // headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      appData: homeData
    }
  }

  openUrl = (item, url) => {
    if (item) {
      this.props.navigation.navigate('WebView', {
        url: item.prodURL,
        title: item.prodName,
      });
    } else {
      this.props.navigation.navigate('WebView', {
        url,
        title: '西瓜金融',
      });
    }
  }

  render() {
    const { appData } = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={styles.container}>
          <TouchableOpacity onPress={() => this.openUrl(false, 'http://xgjrshare.maozhi6.com/extend/index?source=xblb002')}>
            <View>
              <Image
                source={require('../assets/images/banner.png')}
                style={{ width: '100%', height: 180 }}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.home__list}>
            <View>
              <Image source={require('../assets/images/1.png')} style={{width: 60, height: 60}} />
              <Text style={styles.home__list_text}>下载快</Text>
            </View>
            <View>
              <Image source={require('../assets/images/2.png')} style={{width: 60, height: 60}} />
              <Text style={styles.home__list_text}>额度高</Text>
            </View>
            <View>
              <Image source={require('../assets/images/3.png')} style={{width: 60, height: 60}} />
              <Text style={styles.home__list_text}>审核快</Text>
            </View>
          </View>

          <View style={styles.recommend}>
            <Text style={styles.recommend__text}>推荐</Text>
          </View>

          {
            appData.map(item => (
              <TouchableOpacity key={item.logo} onPress={() => this.openUrl(item)}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>

                  <View style={styles.product}>
                    <View>
                      <Image source={appLogos[item.logo]} style={styles.product__logo} />
                    </View>

                    <View style={styles.product__middle}>
                      <Text>
                        <Text style={styles.product__name}>{item.prodName}</Text>
                        <Text style={styles.product__price}>{`${item.rangeLow}-${item.rangeHigh}`}</Text>
                      </Text>
                      <Text style={styles.product__time_text}>{item.intro}</Text>
                    </View>

                    <View style={styles.product__right}>
                      <Text style={styles.product__right_number}>{item.apply}人申请</Text>
                      <TouchableOpacity style={styles.product__right_btn} onPress={() => this.openUrl(item)}>
                        <Text style={styles.product__btn_text}>立即申请</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  home__list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  home__list_text: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
    marginTop: 10,
  },
  recommend: {
    paddingTop: 30,
    paddingBottom: 14,
  },
  recommend__text: {
    fontSize: 18,
    color: '#333',
    paddingLeft: 20,
  },
  product: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(86,86,86,0.1)',
    borderRadius: 10,
    minHeight: 80,
  },
  product__logo: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  product__time_text: {
    color: '#808080',
    fontSize: 11,
    marginTop: 6,
  },
  product__name: {
    fontSize: 14,
    color: '#333',
  },
  product__price: {
    fontSize: 12,
    color: '#FF3D36',
  },
  product__middle: {
    flex: 0.8,
  },
  product__right_number: {
    fontSize: 12,
    color: '#808080',
  },
  product__right_btn: {
    width: 60,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF3D36',
    marginTop: 6,
  },
  product__btn_text: {
    fontSize: 10,
    color: '#FF3D36',
    lineHeight: 16,
    textAlign: 'center',
  }
});
