/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6EF',
  },
  itemCount: {
    borderRadius: 3, 
    borderWidth: 1, 
    width: 6, 
    height: 6,
    backgroundColor: 'gray',
    borderColor: 'gray',
    top: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  itemDetailsContainer:{
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#00648D',
  },
  itemTitleRead: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#FF6600'
  },
  itemText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4C4D53',
  },
  itemDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },

});