'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var styles = require("./styleItem");
var utils = require("./utils");
var Web_View = require("./web");

var Item = React.createClass({

render: function() {
    return (
     <View style={styles.container}>
          <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.item_title}
          </Text>
          </View>
          
          <Text style={styles.text}>
            {this.props.item_text}
          </Text>
          
          <TouchableHighlight 
            onPress={() => this.openPage()}
            underlayColor='#F6F6EF'>
	          <Text style={styles.source}>
	            URL: {this.props.item_by}
	          </Text>
          </TouchableHighlight>
          
          
      </View>
     );
  },
  openPage: function(){
    this.props.navigator.push({
      title: this.props.post_title,
      component: Web_View,
      passProps: {url: this.props.item_url},
    });
  },
  
});

module.exports = Item;