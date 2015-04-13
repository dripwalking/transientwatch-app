'use strict';

var React = require('react-native');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var styles = require("./style");
var utils = require("./utils");

var ItemCell = React.createClass({
  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
      <View style={styles.container}>
        <Text style={styles.itemCount}>
          
        </Text>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemTitle}>
            {this.props.item.Title}
          </Text>
          <Text style={styles.itemText}>
            {utils.htmlToString(this.props.item.Body).substring(0, 60)} ...
          </Text>
          <Text style={styles.itemDetailsLine}>
            Posted by {this.props.item.Source} 
          </Text>
          <View style={styles.separator}/>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
});



module.exports = ItemCell;