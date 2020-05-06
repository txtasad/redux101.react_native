import React from "react";
import {Navigation} from 'react-native-navigation';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Text,
  Dimensions, TextInput, FlatList, StatusBar
} from 'react-native'

import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import {Button, Flex, Provider, WingBlank, Modal,List} from '@ant-design/react-native';


import {TitleOptions} from "../utils/Constants";

import Toast from 'react-native-simple-toast';


import { connect } from 'react-redux';
import { addCat,deleteCat } from '../actions/cats';


const TAG = 'MyDashboard';


const width = Dimensions.get('window').width;
const widths=width-50
const widthHalf=widths/2


class Screen1 extends React.Component {

  constructor(props) {
    super(props)
    console.log("csk->","constructor")
  }

  state = {
    catAddition:false,
    catName:"",catColor:"",catBreed:"",
    refreshing: false,
    sortby:""
  }


  static get options() {
    return Screen1.getDefaultOptions()
  }

  static getDefaultOptions() {
    const options = JSON.parse(JSON.stringify(TitleOptions));
    options.topBar.title.text = 'My Dashboard';
    options.topBar.largeTitle.fontSize = 36;
    return options
  }

  componentDidMount() {
    console.log("csk->","componentDidMount")
  }

  setErrorState() {
    this.setState({
      error: true,
      refreshing: false
    })
  }


  _onRefresh = () => {
    //this.setState({refreshing: true, error: false});
  }



  toggleModal =() => {
        let m = this.state.catAddition
        this.setState({
            catAddition: !m,
        });
    }

  render() {
    StatusBar.setBarStyle('light-content', true);
    const {error} = this.state
    if (error) {
      return (
        <View style={{flexDirection: 'column', flex: 1,justifyContent:'center',alignItems:'center'}}>
          <Text>Something Went Wrong!</Text>
        </View>
      )
    }
    return (

      <Provider locale={enUS}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{marginTop:15,backgroundColor:'#fff'}}>
            {this.renderFilters()}
          </View>
          <ScrollView contentContainerStyle={[styles.scrollViewStyle]}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }>
            <View style={{flexDirection: 'column'}}>

              {this.renderFlatList()}
            </View>
          </ScrollView>
          <WingBlank style={[styles.bottomNav]}>
            <Flex>
              <Flex.Item style={{alignItems: 'center',justifyContent: 'center'}}>
                  <TouchableOpacity onPress={this.toggleModal}>
                <Image source={require("../assets/images/add.png")} style={{tintColor:'#4A90E2',alignItems: 'center',justifyContent: 'center'}}/>
                  </TouchableOpacity>
              </Flex.Item>

              <Flex.Item style={{alignItems: 'center',justifyContent: 'center'}}>
                <TouchableOpacity onPress={()=>{
                    Toast.showWithGravity('Settings!', Toast.SHORT, Toast.BOTTOM)
                  this.showScreen2();
                }}>
                  <Image source={require("../assets/images/settings.png")}/>

                    <Modal
                        popup
                        visible={this.state.catAddition}
                        onClose={() => { console.log(TAG,"onClose") }}
                        animationType="slide-up"
                        afterClose={() => { console.log(TAG,"afterClose") }}
                    >
                        <List renderHeader={() => <View style={{flexDirection:"row",justifyContent:"center"}}><Text>Add a Cat</Text></View>} className="popup-list">
                            <List.Item><Text>Name</Text><TextInput
                                style={{ height: 40, borderColor: '#969BA9', borderWidth: 1 }} placeholder={"Name "} onChangeText={n=>this.state.catName=n}/></List.Item>
                            <List.Item><Text>Color</Text><TextInput
                                style={{ height: 40, borderColor: '#969BA9', borderWidth: 1 }} placeholder={"Color "} onChangeText={c=>this.state.catColor=c}/></List.Item>
                            <List.Item><Text>Breed</Text><TextInput
                                style={{ height: 40, borderColor: '#969BA9', borderWidth: 1 }} placeholder={"Breed "} onChangeText={b=>this.state.catBreed=b}/></List.Item>
                            <List.Item>
                                <Button type="primary" onPress={
                                  ()=>{this.props.add(this.state.catName,this.state.catColor,this.state.catBreed)
                                    this.setState({ catAddition: false })}
                                }>Add</Button>
                            </List.Item>
                        </List>
                    </Modal>

                </TouchableOpacity>
              </Flex.Item>

            </Flex>

          </WingBlank>
        </View>
      </Provider>
    );
  }


  renderFilters=()=>{
    const style=[styles.blockStyle]
    const styleA=[styles.blockStyle,styles.blockActive]
    let na=this.state.sortby==="nameA"?styleA:style;
    let nd=this.state.sortby==="nameD"?styleA:style;
    let ca=this.state.sortby==="colorA"?styleA:style;
    let ba=this.state.sortby==="breedA"?styleA:style;
    console.log("csk->",this.state.sortby,na)
    return(
        <View style={{ width : '100%', flexDirection:'column', backgroundColor: '#fff'}}>
          <View style={{flexDirection:'row',justifyContent:"flex-start",alignItems:"flex-start",marginLeft:18,marginBottom:2}}>
            <Text style={{color:"#969BA9"}}>Sort</Text>
          </View>

          <View style={{flexDirection:'row',justifyContent:"center",marginLeft:5,marginRight:5}}>

            <View style={na}>
              <TouchableOpacity onPress={()=>{
                this.setSortBy("nameA")
              }}>
              <Text style={{color:'#472C44'}}>Name</Text>
              <Text style={{color:'#472C44'}}>Ascending</Text>
              </TouchableOpacity>
              </View>

            <View style={nd}>
              <TouchableOpacity onPress={()=>this.setSortBy("nameD")}>
              <Text style={{color:'#FFC66B'}}>Name</Text>
              <Text style={{color:'#FFC66B'}}>Descending</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection:'row',justifyContent:"center",marginLeft:5,marginRight:5}}>

            <View style={ca}>
              <TouchableOpacity onPress={()=>this.setSortBy("colorA")}>
              <Text style={{color:'#9690DF'}}>Color</Text>
              <Text style={{color:'#9690DF'}}>Ascending</Text>
              </TouchableOpacity>
              </View>
            <View style={ba}>
              <TouchableOpacity onPress={()=>this.setSortBy("breedA")}>
              <Text style={{color:'#FE8999'}}>Breed</Text>
              <Text style={{color:'#FE8999'}}>Ascending</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        )
  }



  renderFlatList(){


    let dataOrders=[]
        if(this.state.sortby==="")
          dataOrders=this.props.cats;
    else if(this.state.sortby==="nameD" && this.props.cats!==[])
      dataOrders=this.props.cats.reverse()
    else
      dataOrders=this.props.cats.sort(this.sortComparison)

    if(dataOrders===null || dataOrders===undefined || dataOrders.length===0) {
      return (

                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{fontSize:20}}>No Cats Available!</Text>
                </View>
      )
    }




    else {
      return (
        <FlatList
            data={dataOrders}
            renderItem={({item,index})=>{
              console.log(TAG, 'item', item);
              return this.tasksCardContent(item,index)
            }}
            keyExtractor={(item)=>item.name}
            style={{paddingTop : 12}}
        >
        </FlatList>
    )}
  }


  tasksCardContent({name,breed,color,key},i) {
    if (name===null || breed===undefined || color===null) {
      return this.getErrorStateForCards()
    }

    return (
        <View style={[styles.cardStyle,{flex:1, flexDirection: 'column',backgroundColor:'#fff'}]}>

         <View style={{flexDirection:'row',flex:1,marginTop:16}}>
            <View style={{flex:0.5,justifyContent:'center',alignItems:'flex-start'}}>
              <Text style={{color:'#969BA9',marginLeft:14,fontSize:14}}>>>> Name</Text>
            </View>
             <View style={{flex:0.2,justifyContent:'center'}}><Text style={{color:'#24A588',fontSize:14,alignItems:'center',justifyContent:'center'}}>Breed</Text></View>
             <View style={{flexDirection:'row',flex:0.3,justifyContent:'space-around',alignItems:'center'}}>

               <Text style={{color:'#4A90E2',fontSize:14,alignItems:'center',justifyContent:'center'}}>Color</Text>
               <TouchableOpacity onPress={
                 ()=>this.props.delete(key)
               }>
                 <Image source={require("../assets/images/delete.png")} style={{width:24,height:24}}/>
               </TouchableOpacity>
             </View>
          </View>


          <View style={{flexDirection:'row',flex:1,marginTop:16,alignContent:'center',alignItems:'center',marginBottom:16}}>

            <View style={{flex:0.5,flexDirection:'column',backgroundColor:'transparent'}}>
              <View style={{flexDirection:'row',justifyContent:'center',marginLeft:14,marginBottom:8}}>
                <Text style={{color:'#31132E',fontSize:14}}> # {name} </Text>
              </View>
            </View>

              <View style={{flex:0.25,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <View style={[styles.redBox]}><Text style={[styles.redBoxText]}>{breed}</Text></View>
              </View>
              <View style={{flex:0.25,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <View style={[styles.grayBox]}><Text style={[styles.grayBoxText]}>{color}</Text></View>
              </View>

          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:1.5,borderWidth:1,borderRadius:1, borderColor:'#D4D5DA80'}}/>

          </View>
    )
  }


  sortComparison=(a,b)=>{
    let valA,valB;
    if(this.state.sortby==="nameA")
    {
      valA=a.name.toLowerCase()
      valB=b.name.toLowerCase()
    }else if(this.state.sortby==="colorA")
    {
      valA=a.color.toLowerCase()
      valB=b.color.toLowerCase()
    }else if(this.state.sortby==="breedA")
    {
      valA=a.breed.toLowerCase()
      valB=b.breed.toLowerCase()
    }

    if (valA < valB) //sort string ascending
      return -1
    if (valA > valB)
      return 1
    return 0
  }

  setSortBy=(key)=>{
    if(this.state.sortby===key){
      this.setState({sortby:""})
    }
    else{
      this.setState({sortby:key})
    }
  }


  showScreen2 = () => {
    console.log(TAG, 'showScreen2')
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.playground.Screen2',
        options: {
          topBar: {
            title: {
              text: "Settings"
            }
          }
        }
      }
    });
  }

  //end
}
const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 18,
    marginBottom: 16,
    height: 100,
    flexDirection: 'row',
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#DCDCDC',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
      android: {
        elevation: 8,
        borderRadius: 16,
        backgroundColor: '#f1f1f1',

      },
    }),

  },
  blockStyle: {
    marginHorizontal: 12,
    marginBottom: 16,
    width:widthHalf,
    flexDirection: 'row',
    justifyContent:"space-around",
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#DCDCDC',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
      android: {
        padding:4,
        elevation: 3,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1CAD0',

      },
    }),

  },
  blockActive:{
    backgroundColor:'#EBECEF',
    borderColor:'#472C44'
  },

  bottomNav:{
    height:70,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 36,

    marginLeft:-1,
    marginRight:-1,
    backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center'
  },
  submit:{
    padding:5,
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FFCCBA',
    marginLeft:17,
    marginRight:17,
    marginBottom: 8
  },
  submitText:{
    color:'#F78765',
    textAlign:'center',
  },
  redBox:{backgroundColor:'#FF5D5D20',padding:4,borderRadius:4,marginLeft:8},
  redBoxText:{color:'#FF5D5D',fontSize:11},
  grayBox:{backgroundColor:'#969BA920',padding:4,borderRadius:4,marginLeft:8},
  grayBoxText:{color:'#969BA9',fontSize:11},
});


const mapStateToProps = (state) => {
  console.log("csk-> state",state);
  return {
    cats: state.catReducer.catList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name,color,breed) => dispatch(addCat(name,color,breed)),
    delete: (cat) => dispatch(deleteCat(cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen1);
