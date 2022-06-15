import React, { useState, useEffect } from 'react';
import{View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = ()=> {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle =() =>setToggle(oldToggle => !oldToggle);

  useEffect (()=>{
  torch.switchState(toggle);
  }, [toggle]);

    
  useEffect (()=>{
    //Quando o cel for chacoalhado vai mudar o toggle
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });
    //essa função vai ser chamada quando o componente for desmontado
    return ()=>subscription.remove();
    }, [toggle]);

  return (
  <View style = {toggle ? style.containerLight : style.container}>
    <TouchableOpacity onPress={handleChangeToggle}>
    
    <Image 
    style={toggle ? style.lightingOn : style.lightingOff}
    source={
      toggle
      ?require('./assets/icons/eco-light.png')
      :require('./assets/icons/eco-light-off.png')}
    />
    <Image 
    style={style.dioLogo}
    source={
      toggle
      ?require('./assets/icons/diome.png')
      :require('./assets/icons/diome-white.png')}
    />
    </TouchableOpacity>
    </View>

  )
};
export default App;

const style = StyleSheet.create({
  container: {flex:1,
  backgroundColor: 'black',
  alignItems: 'center',
  justifyContent: 'center',
  },
  containerLight: {flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    },
    lightingOn:{
      resizeMode: 'contain',
      alignSelf: 'center',
      width: 150,
      height: 150,
    },
    lightingOff:{
      resizeMode: 'contain',
      alignSelf: 'center',
      tintColor: 'white',
      width: 150,
      height: 150,
    },
    dioLogo:{
      resizeMode: 'contain',
      alignSelf: 'center',
      width: 250,
      height: 250,
    },
    
});