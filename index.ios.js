/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    TabBarIOS,
    Switch,
    Slider,
    PickerItemIOS,
    PickerIOS
} from "react-native";
import * as atb from "react-native-animatable";
import {GoogleSignin, GoogleSigninButton} from "react-native-google-signin";


var styl = require('./styles');
var cover = require("react-native/Libraries/Image/ImageResizeMode.js").cover;

class vatak extends Component {
    constructor(props) {
        super(props);
        this.clearText = this.clearText.bind(this);
        this.state = {
            user: null,
            selectedTab: 'redTab',
        };
    }

    componentDidMount() {
        this._setupGoogleSignin();
    }

    clearText() {
        this.refs['ctr'].setNativeProps({value: ''});
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
                iosClientId: '1091183595658-ni9lkoitfibdm2rfam4aerl336m3off6.apps.googleusercontent.com',
                webClientId: '1091183595658-ni9lkoitfibdm2rfam4aerl336m3off6.apps.googleusercontent.com',
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            this.setState({user});
        }
        catch (err) {
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                this.setState({user: user});
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    _signOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({user: null});
        })
            .done();
    }

    render() {

        if (!this.state.user) {

            return (

                <View style={styl.containersignin} refreshing>

                    <atb.Image animation="fadeIn" onAnimationEnd={()=> console.log(this)}
                               style={styl.backdrop}
                               resizeMode='contain'
                               source={require('./static/images/logowtxt.png')}/>
                    <atb.Image animation="slideInDown" direction="alternate" iterationCount="infinite"
                               duration={3500}
                               style={styl.pills}
                               resizeMode='contain'
                               source={require('./static/images/pills.png')}/>
                    <atb.View animation="fadeIn" style={styl.welcomecontainer} duration={500}>
                        <atb.Text animation="fadeInUp" style={styl.welcome} delay={500}>
                            Personal medicine scheduler
                        </atb.Text>
                    </atb.View>
                    <atb.Text animation="fadeIn" delay={1500} style={styl.instructions}>
                        To get started, lets login with Google
                    </atb.Text>
                    <atb.View animation="fadeIn" delay={2200} style={{width: 130, height: 55, marginTop: 10}}>

                        <GoogleSigninButton
                            style={{width: 130, height: 48, "backgroundColor": "transparent"}}
                            size={GoogleSigninButton.Size.Standard}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this._signIn.bind(this)}

                        />
                    </atb.View>

                </View>
            );
        }
    }
}


AppRegistry.registerComponent('vatak', () => vatak);
