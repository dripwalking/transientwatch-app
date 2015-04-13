'use strict';

var React = require('react-native');

var {
  Text,
  View,
  ListView,
  StyleSheet,
} = React;

var REQUEST_URL = 'http://transientwatch.mybluemix.net/feed';


//View Elements
var ItemCell = require("./ItemCell");
var ItemView = require("./ItemView");

var ShowTopics = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      this.renderListView()
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading update...
        </Text>
      </View>
    );
  },

  renderListView: function() {
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItemCell}
        style={styles.postsListView}/>
    );
  },

  renderNews: function(item) {
    var txt = ''
    if (item.Url) {
      if (item.Url.charAt(0) == 'h'){
        txt = item.Url
      }
      
    } 
    return (
      
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.text}>{item.Body}</Text>
          <Text style={styles.subtext}>{item.Source}</Text>
        </View>
      </View>
      
    );
  },

  renderItemCell: function(item){
    return(
      <ItemCell 
      	onSelect={() => this.selectItem(item)}
      	item={item}/>
    );
  },
  selectItem: function(item){
    this.props.navigator.push({
      title: item.Title,
      component: ItemView,
      passProps: {item_url: item.Url,
                  item_title: item.Title,
                  item_by: item.Source,
                  item_text: item.Body,}
    });
  },

});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6EF',
  },
  loadingText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    color: '#FF6600'
  },
  postsListView:{
    backgroundColor: '#F6F6EF',
  }
});

module.exports = ShowTopics;