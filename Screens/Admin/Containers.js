import React, { useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { DataTable } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";

var { height, width } = Dimensions.get("window")

const deleteAlert = (onOk) =>
    Alert.alert(
      "Delete !",
      "Are you sure want to delete ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => onOk() }
      ],
      { cancelable: false }
    );
const Containers = (props) => {

    const [containerList, setContainerList] = useState();
    const [containerFilter, setContainerFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState({});

    useFocusEffect(
        useCallback(
            () => {
                // // Get Token
                // AsyncStorage.getItem("jwt")
                //     .then((res) => {
                //         setToken(res)
                //     })
                //     .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}containers`)
                    .then((res) => {
                        setContainerList(res.data);
                        setContainerFilter(res.data);
                        setSelectedRow({});
                        setLoading(false);
                    })

                return () => {
                    setContainerList();
                    setContainerFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchContainer = (text) => {
        if (text == "") {
            setContainerFilter(containerList)
        }
        setContainerFilter(
            containerList.filter((i) => 
                i.no_container.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const editContainer = () => {
        if(Object.keys(selectedRow).length == 0) return alert('Please select 1 row');
        props.navigation.navigate("ContainerForm", { item: selectedRow})
    }

    const deleteContainer = () => {
        if(Object.keys(selectedRow).length == 0) return alert('Please select 1 row');
        
        deleteAlert(()=>{
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Deleting container..",
                text2: ""
            });

            axios
            .delete(`${baseURL}containers/${selectedRow.id}`, {
                // headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const containers = containerFilter.filter((item) => item.id !== selectedRow.id)
                setContainerFilter(containers);
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Container successfuly deleted",
                    text2: ""
                });
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again"
                });
            });
        });
    }

  return (
    <View style={styles.container}>
        <View>
          <Header searchBar rounded>
              <Item style={{ padding: 5 }}>
                  <Icon name="search" />
                  <Input 
                    placeholder="Search"
                    onChangeText={(text) => searchContainer(text)}
                  />
              </Item>
          </Header>
        </View>

      {loading ? (
          <View style={styles.spinner}> 
              <ActivityIndicator size="large" color="red" />
          </View>
      ) : (
          <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{flex: 3}}>No. Container</DataTable.Title>
                <DataTable.Title>Size</DataTable.Title>
                <DataTable.Title>Type</DataTable.Title>
                <DataTable.Title>Slot</DataTable.Title>
                <DataTable.Title>Row</DataTable.Title>
                <DataTable.Title>Tier</DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{height: '70%'}}>
            {
                (containerFilter || []).map( (item, i) => {
                    return <DataTable.Row style={(selectedRow.id == item.id ? styles.selected : {})} onPress={e=>setSelectedRow(item)} key={item.id}>
                            <DataTable.Cell style={{flex: 3}}>{item.no_container}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>{item.size}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>{item.type}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>{item.slot}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>{item.row}</DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>{item.tier}</DataTable.Cell>
                        </DataTable.Row>
                })
            }
            </ScrollView>
        </DataTable>
      )}

      <View style={styles.footer}>
        <EasyButton style={styles.btnFooter}
            danger
            onPress={() => deleteContainer()}
        >
            <Icon name="trash" size={18} color="white" />
        </EasyButton>
        <EasyButton style={styles.btnFooter}
            secondary
            onPress={() => editContainer()}
        >
            <Icon name="edit" size={18} color="white" />
        </EasyButton>
        <EasyButton style={styles.btnFooter}
            secondary
            onPress={() => props.navigation.navigate("ContainerForm")}
        >
            <Icon name="plus" size={18} color="white" />
        </EasyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        // marginBottom: 160,
        backgroundColor: 'white',
        height: '100%'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    },
    tableCell: {
        padding: 2,
    },
    selected: {
        backgroundColor: '#e6fcff'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        position: 'absolute',
        bottom: 0
    },
    btnFooter: {
        flex: 1,
        alignItems: 'stretch'
    }
})

export default Containers;
