'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var PostsView = require('./components/ShowLastFeed');

var transientwatch = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          title: 'Transient Daily',
          component: PostsView,
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
});

AppRegistry.registerComponent('transientwatch', () => transientwatch);
