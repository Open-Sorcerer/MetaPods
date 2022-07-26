import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {ScanQRCode} from '../../../../assets/image';
import {colors} from '../../shared/styles';
import {H1, H2, H3, P1, P2} from '../../shared/Typography';
import {useMoralisDapp} from '../../../providers/MoralisDappProvider/MoralisDappProvider';

const windowWidth = Dimensions.get('window').width;

const Scan = () => {
  const [name, setName] = useState();
  const {walletAddress, chainId} = useMoralisDapp();

  const getMyName = async () => {
    try {
      const myName = await AsyncStorage.getItem('myName');
      if (myName !== null) {
        setName(myName);
      } else {
        console.log('nai milla');
      }
    } catch (error) {
      // Error retrieving data
      console.log('error hai bhai', error);
    }
  };
  useEffect(() => {
    getMyName();
  }, []);
  const QRdata = {name: name, walletAddress: walletAddress};
  return (
    <View style={styles.viewContainer}>
      <H2>CONNECT</H2>
      <View
        style={{
          marginTop: 30,
          padding: 20,
          width: '100%',
          backgroundColor: 'white',
          borderColor: colors.black,
          borderRadius: 20,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
        }}>
        <QRCode value={JSON.stringify(QRdata)} size={windowWidth * 0.7} />
      </View>
      <H3 style={{alignSelf: 'center', color: colors.gray, marginVertical: 15}}>
        OR
      </H3>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: colors.primary,
          borderRadius: 25,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image source={ScanQRCode} style={{width: 30, height: 30}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
});

export default Scan;
