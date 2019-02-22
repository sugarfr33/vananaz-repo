import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, CheckBox, Button, Alert, ScrollView, AsyncStorage } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputEmail: '',
      TextInputPass: '',
      EmailErrorMsg: '',
      PassErrorMsg: '',
      HasError: true
    };
    AsyncStorage.getItem('myEmail').then((value) => {
            this.setState({TextInputEmail: value});
        }).done();
    AsyncStorage.getItem('myPass').then((value) => {
      this.setState({TextInputPass: value});
      if (this.state.TextInputEmail !== null 
          || this.state.TextInputPass !== null){
            this.setState({HasError: false});
      }
    }).done();
  }
  CheckTextInput = () => {
    if (this.state.TextInputEmail == null) {
      this.setState({EmailErrorMsg: 'required email address'})
    }else{
      alert('Successfully Login');
      if (this.state.checked){
        AsyncStorage.setItem('myEmail', this.state.TextInputEmail)
        AsyncStorage.setItem('myPass', this.state.TextInputPass)
      }else{
        AsyncStorage.removeItem('myEmail')
        AsyncStorage.removeItem('myPass')
      }
      
    }
  }
  validate_email = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
      this.setState({EmailErrorMsg: 'not correct format for email address'})
      this.setState({TextInputEmail:text})
      this.setState({HasError: true})
      return false;
    }
    else {
      this.setState({TextInputEmail:text})
      this.setState({EmailErrorMsg: ''})
    }
  }
  validate_password = (text) => {
    if(text.length < 6 || text.length > 12)
    {
      this.setState({PassErrorMsg: 'please use at least 6 - 12 characters'})
      this.setState({TextInputPass:text})
      this.setState({HasError: true})
      return false;
    }
    else {
      this.setState({TextInputPass:text})
      this.setState({PassErrorMsg: ''})
      this.setState({HasError: false})
    }
  }
  validate_email_pass = (textEmail,textPass) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(textEmail) === false)
    {
      this.setState({EmailErrorMsg: 'not correct format for email address'})
      this.setState({TextInputEmail:textEmail})
      this.setState({HasError: true})
      return false;
    }
    else {
      if(textPass.length < 6 || textPass.length > 12)
      {
        this.setState({PassErrorMsg: 'please use at least 6 - 12 characters'})
        this.setState({TextInputPass:textPass})
        this.setState({HasError: true})
        return false;
      }
      else {
        this.setState({TextInputPass:textPass})
        this.setState({PassErrorMsg: ''})
        this.setState({HasError: false})
        this.setState({TextInputEmail:textEmail})
        this.setState({EmailErrorMsg: ''})
      }
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
      
        <Image source={require('./assets/Logo.png')} />
        <Text>
          {"\n"}{"\n"}
            Email
        </Text>
        <TextInput
          placeholder='Input email address'
          style={styles.text_input_style}
          onChangeText={(TextInputEmail) => this.validate_email(TextInputEmail)}
          value={this.state.TextInputEmail}
        />
        <Text style={styles.label_error}>
          {this.state.EmailErrorMsg}
        </Text>
        <Text>
          Password
        </Text>
        <TextInput
          placeholder='Input password'
          style={styles.text_input_style}
          secureTextEntry={true}
          onChangeText={(TextInputPass) => this.validate_password(TextInputPass)}
          value={this.state.TextInputPass}
        />
        <Text style={styles.label_error}>
          {this.state.PassErrorMsg}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            style={{borderColor: 'purple'}}
            value={this.state.checked}
            onValueChange={() => this.setState({ checked: !this.state.checked })}
          />
          <Text style={{marginTop: 5}}> Remember me</Text>
        </View>
        <Button
          onPress={this.CheckTextInput}
          style={styles.button_style}
          title="Sign In"
          color="#841584"
          accessibilityLabel="Sign In"
          disabled={this.state.HasError}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  button_style: {
    minWidth: 300, paddingLeft: 50, paddingRight: 50
  },
  label_error: {
    color: '#B71C1C',
    fontStyle: 'italic'
  },
  text_input_style:{
    height: 40, borderColor: 'purple', borderWidth: 1, width: 300,
    padding: 10, borderRadius: 3
  }
});
