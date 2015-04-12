/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  SwitchIOS,
} = React;

//var RefreshableListView = require('react-native-refreshable-listview');

var REQUEST_URL = 'http://transientwatch.mybluemix.net/feed';




var transientwatch = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      eventSwitchIsOn: false,
      eventSwitchRegressionIsOn: true,
      colorTrueSwitchIsOn: true,
      colorFalseSwitchIsOn: false,
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
      <ScrollView horizontal={false} pagingEnabled={true}>
      <View style={styles.head}>
        <Text style={styles.titleHead}>Latest News</Text>
      </View>
      <View style={styles.filter}>

      </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderNews}
        style={styles.listView}
      />
      </ScrollView>
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

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 5,
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9C939A',
    padding: 5,
    marginTop: 20,
    paddingTop: 8,
    color: '#FFFFFF'
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 5,
    color: '#FFFFFF'
  },
  circle: {
    borderRadius: 3, 
    borderWidth: 1, 
    width: 6, 
    height: 6,
    backgroundColor: '#9C939A',
    borderColor: '#9C939A',
    top: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'left',
    color: '#463C37',
  },
  titleHead: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 11,
    color: '#9C939A',
    textAlign: 'left',
  },
  subtext: {
    fontSize: 11,
    color: '#9C939A',
    textAlign: 'left',
    fontStyle: 'italic',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('transientwatch', () => transientwatch);
