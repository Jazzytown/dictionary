import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Header } from 'react-native-elements';
 
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '', 
      phonetics: '',
    };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'magenta'}
          centerComponent={{
            text: 'DICTIONARY',
          color:'green',

            style: {
              backgroundColor: 'magenta',
              fontFamily: 'Rockwell',
              fontSize: 21,
            },
          }}
        />
        <Image
          style={{
        
          }}
          source={{
            uri:
              'https://lh3.googleusercontent.com/Ayde1C2VnKTPLtE68B5WdNslzZOPUr-7H0cxC1MCIThsRCAXtHUSU7dNyfRpqidR6Twf=s85',
          }}
        />

        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: "defining",
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.text1}> define </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.word}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    width: '80',
    alignSelf: 'center',
    height: 45,
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 53,
    borderWidth: 4,
    borderColor: 'magenta',
    outline: 'none',
    backgroundColor: 'pink',
  },
  searchButton: {
    width: '1000%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 15,
    borderColor: 'magenta',
    backgroundColor: 'pink',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Rockwell',
    fontSize: 20,
color:'',
  },
});
