import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 10,
  },

  buttonMargin: {
    marginTop: 10
  },
  iconArrow:{
    width: 24,
    height: 24,
    marginLeft: 16,
    marginTop: 16,
    color: '#434343'
  },
  photo: {
    width: 112,
    height: 112
  },
  nameText: {
    fontSize: 16,
    color: '#434343',
    textAlign: 'center',
  },
  textForm: {
    fontSize: 12,
    color: '#589b9b',
    textAlign: 'center',
    marginTop: 36
    //fontFamily: 'Roboto Regular'
  },
  textOutput: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 8
    //fontFamily: 'Roboto Regular'
  },
  buttonStyle: {
    width: 148,
    height: 40,
    borderRadius: 2,
    color: '#88c9bf',
    marginBottom: 24
  },
  buttonText: {
    //fontFamily: 'Roboto Regular'
    fontSize: 12,
    color: '#757575'
  }
});

export default styles;