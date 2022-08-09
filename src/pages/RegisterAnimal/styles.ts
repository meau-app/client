import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  buttonMargin: {
    marginTop: 10
  },

  buttonStyle: {
    width: 232,
    height:40,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#ffd358',
    justifyContent: 'center',
  },

  textTitle: {
    fontSize: 20,
    fontFamily: 'Roboto Medium',
    color: '#434343',
    flexDirection: 'row',
    textAlign: 'center',
  },

  backgroundTitle: {
    width: 360,
    height: 56,
    color: '#ffd358'
  },

  textType: {
    fontFamily: 'Roboto Medium',
    fontSize: 14,
    color: '#757575',
  },
  
  textForm: {
    fontFamily: 'Roboto Medium',
    fontSize: 12,
    color: '#f7a800'
  },

  boxInput: {
    width: 340,
    borderBottomWidth: 0.8,
    backgroundColor: 'transparent',
    borderColor: '#bdbdbd'
  },
  
  textInput: {
    fontSize: 14,
    fontFamily: 'Roboto Regular',
    color: '#bdbdbd'
  }
});

export default styles;
