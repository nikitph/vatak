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
import ListComponent from "./ListComponent";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Container, Content, List, ListItem, Thumbnail, Button} from "native-base";


var styl = require('./styles');
var cover = require("react-native/Libraries/Image/ImageResizeMode.js").cover;
var Realm = require('realm');

const medSchedSchema = {
    name: 'medSched',
    properties: {
        medicine: 'string',
        quantity: {type: 'int', default: 1},
        frequency: {type: 'int', default: 1},
        sdate: 'date',
        edate: 'date'
    }
};

let realm = new Realm({schema: [medSchedSchema]});

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

        if (this.state.user) {
            return (
                <TabBarIOS
                    unselectedTintColor="grey"
                    tintColor="#ffa54c"
                    barTintColor="white">
                    <Icon.TabBarItemIOS
                        title="List"
                        iconName="list"
                        iconColor="grey"
                        selectedIconName="list"
                        selectedIconColor="#ffa54c"
                        renderAsOriginal={true}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}>
                        <atb.View style={styl.containerlist} animation="fadeIn" delay={500}>
                            <ListComponent ds={realm} ref='ls' schem={medSchedSchema}/>
                        </atb.View>
                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        title="Record"
                        iconName="fiber-smart-record"
                        iconColor="grey"
                        selectedIconName="fiber-smart-record"
                        selectedIconColor="#ffa54c"
                        renderAsOriginal={true}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                            this.refs['desc']._focus();
                        }}>

                        <Container>
                            <Content>


                                <List>

                                    <ListItem style={{marginTop: 10}}>
                                        <Thumbnail size={40} source={{uri: this.state.user.photo}}
                                                   style={{alignItems: "center"}}/>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: 'AvenirNext-UltraLight',
                                            marginBottom: 20,
                                            marginTop: 20
                                        }}>
                                            Hey {this.state.user.name.split(' ')[0]}</Text>

                                    </ListItem>
                                </List>


                                <Button block style={{
                                    marginLeft: 100,
                                    marginRight: 100,
                                    backgroundColor: 'rgba(0,0,255,0.5)'
                                }} onPress={() => {

                                    realm.write(() => {
                                        realm.create('Thought', {
                                            desc: this.state.desc,
                                            distortion: this.state.distortion,
                                            counter: this.state.counter,
                                            anxiety: this.state.anxiety,
                                            ddate: new Date()
                                        });

                                    });

                                    this.setState({
                                        selectedTab: 'blueTab',
                                        medicine: '',
                                        quantity: 1,
                                        frequency: 1,
                                    });

                                }}> Submit </Button>
                            </Content>
                        </Container>

                    </Icon.TabBarItemIOS>

                    <Icon.TabBarItemIOS
                        title="Account"
                        iconName="keyboard-arrow-right"
                        iconColor="grey"
                        selectedIconName="keyboard-arrow-right"
                        selectedIconColor="#ffa54c"
                        selected={this.state.selectedTab === 'pinkTab'}
                        renderAsOriginal={true}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'pinkTab'
                            });
                        }}>

                        <Container>
                            <Content>


                                <List>

                                    <ListItem style={{marginTop: 10}}>
                                        <Thumbnail size={40} source={{uri: this.state.user.photo}}
                                                   style={{alignItems: "center"}}/>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: 'AvenirNext-UltraLight',
                                            marginBottom: 20,
                                            marginTop: 20
                                        }}>
                                            {this.state.user.name}</Text>

                                    </ListItem>
                                    <ListItem style={{marginTop: 10}}>

                                        <Button block style={{
                                            marginLeft: 100,
                                            marginRight: 100,
                                            backgroundColor: 'rgba(255,0,0,0.8)'
                                        }} onPress={() => {

                                            realm.write(() => {
                                                let medSched = realm.objects('medSched');
                                                realm.delete(medSched);

                                            });

                                            this.setState({
                                                selectedTab: 'blueTab'
                                            });
                                        }}> Delete All Data </Button>
                                    </ListItem>

                                    <ListItem style={{marginTop: 10}}>

                                        <Button block style={{
                                            marginLeft: 100,
                                            marginRight: 100,
                                            backgroundColor: 'blue'
                                        }} onPress={() => {
                                            this.setState({
                                                selectedTab: 'redTab'
                                            });
                                            this._signOut();
                                        }



                                        }> Logout </Button>
                                    </ListItem>

                                </List>

                            </Content>
                        </Container>
                    </Icon.TabBarItemIOS>
                </TabBarIOS>


            );
        }

    }
}


AppRegistry.registerComponent('vatak', () => vatak);
