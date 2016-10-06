/**
 * Created by Omkareshwar on 9/21/16.
 */
import React, {Component} from "react";
import {AppRegistry, Text, View, RecyclerViewBackedScrollView} from "react-native";
import {ListView} from "realm/react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
var styl = require('./styles');
var Realm = require('realm');


export default class ListComponent extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,

        });

        this.realm = new Realm({schema: [props.schem]});
        this.realm.addListener('change', () => {
            this.state.dataSource = dataSource.cloneWithRows(this.realm.objects('medSched'));
        });


        this.state = {
            dataSource: dataSource.cloneWithRows(props.ds.objects('medSched')),
        };
    }

    render() {
        return (
            <View style={{paddingTop: 22}}>
                <ListView
                    initialListSize={100}
                    pageSize={50}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{bottom: 49}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        return (
                            <View style={styl.rowcontainer}>
                                <View style={styl.colcontainer}>
                                    <Icon name="check-circle" size={20} color="green"/>
                                    <Text style={styl.vcol}>{rowData.medicine}</Text>
                                    <Text style={{fontSize: 14, font: 'avenirNext', color: 'orange'}}>Frequency</Text>

                                </View>
                                <View style={styl.colcontainer}>
                                    <Icon name="announcement" size={20} color="#900"/>
                                    <Text style={styl.vcol}>{rowData.quantity}</Text>
                                    <Text style={{
                                        fontSize: 24,
                                        font: 'avenir',
                                        color: 'orange'
                                    }}>{rowData.frequency}</Text>
                                </View>
                            </View>

                        );
                    }}
                />
            </View>
        );
    }
}