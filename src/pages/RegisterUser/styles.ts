import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 10,
    backgroundColor: '#fafafa'
  },

  buttonMargin: {
    marginTop: 10
  },
  textSignUp:{   //renomear 
    fontSize: 20,
    color: '#434343',
    //fontFamily: 'Roboto Medium'
  },
  
  boxInput: {
    width: 340,
    borderBottomWidth: 0.8,
    backgroundColor: 'transparent',
    borderColor: '#bdbdbd'
  },
  
  textInput: {
    fontSize: 14,
    //fontFamily: 'Roboto Regular',
    color: '#bdbdbd'
  },

  textButton: {
    fontSize: 12,
    //fontFamily: 'Roboto Regular',
    color: '#434343'
  },

  buttonStyle: {
    width: 232,
    height:40,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#88c9bf',
    justifyContent: 'center',
  }
});

export default styles;