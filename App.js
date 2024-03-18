import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Modal, Pressable } from 'react-native';

export default function App() {
  const [currentGoal,setcurrentGoal]=useState('');
  const[listOfGoals,setlistOfGoals]=useState([]);
  const [ModalStatus,setModalStatus]=useState(false);
  
  function handleText(text){
    setcurrentGoal(text);
  }

  function handleCancel(){
    setModalStatus(false);
  }

  function handleAdd(){
    setlistOfGoals([...listOfGoals,currentGoal]);
    setcurrentGoal('');
    setModalStatus(false);
  }

  function handleClearGoals(){
    setlistOfGoals([]);
    setModalStatus(false);
  }

  function handleAddGoal(){
    setModalStatus(true);
  }

  
  return (
    <View style={styles.appContainer}>
      <View style={styles.addButton}>
        <Button title='Add a Goal' onPress={handleAddGoal}/>
        <Button title='Clear All' onPress={handleClearGoals}/>
      </View>
      {ModalStatus && <Modal>
        <View style={styles.addGoals}>
        <TextInput style={styles.TextInput} placeholder='enter your goal' onChangeText={handleText} value={currentGoal}/>
        <Button title='Add' onPress={handleAdd}/>
        <Button title='Cancel' onPress={handleCancel}/>
        </View>
      </Modal>}
    
      <View style={styles.goalsContainer}>
        {listOfGoals.length!=0 && <Text>Your goals are:</Text>}
          <ScrollView>
            {listOfGoals.map((goal) => 
              <View style={styles.goalItem} key={goal}>
                <Text>{goal}</Text>
              </View>)}
          </ScrollView>
      </View>
    
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  appContainer: {
    flex:1,
    padding:50,
    backgroundColor:'lightblue'
  },
  addGoals: {
    flex:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'lightyellow'
  },
  TextInput:{
    borderWidth:1,
    borderColor:'black',
    width:'60%',
    paddingRight:10,
    backgroundColor:'white'
  },
  goalsContainer:{
    flex:2,
  },
  goalItem:{
    borderWidth:2,
    justifyContent:'center',
    backgroundColor:'green',
    color:'white',
    padding:10,
    margin:4,
    borderRadius:8
  
  },
  addButton:{
    padding:100,
    flexDirection:'row',
    justifyContent:'center'
  }
});