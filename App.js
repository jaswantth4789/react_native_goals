import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Modal, Pressable, Image, FlatList } from 'react-native';


export default function App() {
  const [currentGoal,setcurrentGoal]=useState('');
  const[listOfGoals,setlistOfGoals]=useState("");
  const [ModalStatus,setModalStatus]=useState(false);
  
  
  const handleText=(text) =>{
    setcurrentGoal(text);
  }

  const handleCancel=()=>{
    setModalStatus(false);
  }

  const handleAdd=()=>{
    setlistOfGoals([...listOfGoals,{text:currentGoal, id: Math.random().toString()}]);
    setcurrentGoal('');
    setModalStatus(false);
  }

  const handleClearGoals=()=>{
    setlistOfGoals([]);
    setModalStatus(false);
  }

  const handleAddGoal=()=>{
    setModalStatus(true);
  }

  const handlePress=(id)=>{
    setlistOfGoals((listOfGoals)=>{
      return listOfGoals.filter((goal)=>goal.id!==id);
    })
  }

  
  return (
    <><View style={styles.appContainer}>
      <Image style={styles.image} source={require('/Users/jaswantthpotluri/Desktop/react native/hello/assets/images/goal.png')} />
      <View style={styles.addButton}>
        <Button title='Add a Goal' onPress={handleAddGoal} />
        <Button title='Clear All' onPress={handleClearGoals} />
      </View>
      {ModalStatus && <Modal animationType='slide'>
        <View style={styles.addGoals}>
          <TextInput style={styles.TextInput} placeholder='enter your goal' onChangeText={handleText} value={currentGoal} />
          <Button title='Add' onPress={handleAdd} />
          <Button title='Cancel' onPress={handleCancel} />
        </View>
      </Modal>}

      <View style={styles.goalsContainer}>
        {listOfGoals.length != 0 && <Text>Your goals are:</Text>}
        
          <FlatList data={listOfGoals}
            renderItem={(goal) => {
              return(
              <Pressable onPress={handlePress.bind(this,goal.item.id)}>
                <View style={styles.goalItem}>
                  <Text>{goal.item.text}</Text>
                </View>
              </Pressable>
              );
            } }
            keyExtractor={(item,index)=>{return item.id}} 
          />

        
    </View><StatusBar style="auto" /></View>
  </>
  );
}

const styles = StyleSheet.create({

  appContainer: {
    flex:1,
    padding:50,
    backgroundColor:'lightblue'
  },
  image: {
    width:'100%',
    height:'30%',
    padding:20
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
    flex:1,
    padding:10,
    flexDirection:'row',
    justifyContent:'center'
  }
});