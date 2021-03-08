import React, { useState, useEffect, useCallback } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    TextInput,
    Button,
    Dimensions,
    ScrollView
} from "react-native"
import { Item, Picker } from "native-base"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
import { useForm, Controller } from 'react-hook-form';
import * as actions from '../../Redux/Actions/containerActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let { height, width } = Dimensions.get("window")

const ContainerForm = (props) => {
    const [containerData, setContainerData] = useState(null);
    const { register, setValue, getValues, handleSubmit, control, reset, errors } = useForm({
        defaultValues: {
            no_container: '',
            size: '',
            type: 'Dry',
            slot: '',
            row: '',
            tier: ''
        },
        mode: 'onBlur'
    });
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const fetchContainerData = useCallback(async (item) => {
        const containerData = await props.getContainerById(item);
        setContainerData(containerData);
    }, []);

    useEffect(()=>{
        if(props.route.params) {
            props.navigation.setOptions({ title: 'Edit Container' })
            if(!containerData) fetchContainerData(props.route.params.item)
        }else{
            props.navigation.setOptions({ title: 'Add New Container' })
            props.resetContainer()
        }
        register('type')
        setValue('Dry')

        if(containerData){
            setValue('no_container', containerData.no_container);
            setValue('size', containerData.size);
            onChangePicker(containerData.type || 'Dry')
            setValue('slot', containerData.slot);
            setValue('row', containerData.row);
            setValue('tier', containerData.tier);
        }
        
    }, [register, containerData])
  
    const onSubmit = handleSubmit(async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`
            }
        }

        if(containerData) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Updating Container..",
                text2: ""
            });

            axios
            .put(`${baseURL}containers/${containerData.id}`, data, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Container successfuly updated",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Containers");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                })
            })
        } else {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Adding Container..",
                text2: ""
            });

            axios
            .post(`${baseURL}containers`, data, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New Container added",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Containers");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Something went wrong",
                        text2: "Please try again"
                })
            })
        }
    });

    const onChangePicker = val => {
        setValue('type', val)
        forceUpdate()
    };

    if(props.container.loading){
        return (
            <View style={styles.spinner}> 
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.label}>No. Container</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                defaultValue={(props.container.data.no_container || '')}
              />
            )}
            value={(props.container.data.no_container || '')}
            name="no_container"
            rules={{ required: '*No. Container is required' }}
          />
          {errors?.no_container?.type == 'required' && <Text style={{color: 'red'}}>{errors['no_container'].message}</Text>}

        <Text style={styles.label}>Size</Text>
        <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                defaultValue={(props.container.data.size || '').toString()}
                keyboardType={'numeric'}
              />
            )}
            defaultValue={(props.container.data.size || '').toString()}
            name="size"
            rules={{ required: '*Size is required' }}
          />
          {errors?.size?.type == 'required' && <Text style={{color: 'red'}}>{errors['size'].message}</Text>}

        <Text style={styles.label}>Type</Text>
        <Item picker>
            <Picker
                selectedValue={getValues('type')}
                placeholderStyle={{ color: "#007aff"}}
                placeholderIconColor="#007aff"
                onValueChange={(e) => onChangePicker(e)}
            >
                <Picker.Item key={'Dry'} label={'Dry'} value={'Dry'} />
                <Picker.Item key={'Rfr'} label={'Rfr'} value={'Rfr'} />
            </Picker>
        </Item>
        {/* <Controller
            as={
            <Picker>
                <Picker.Item label={'Dry'} value={'Dry'} />
                <Picker.Item label={'Rfr'} value={'Rfr'} />
            </Picker>
            }
            control={control}
            name="type"
            onChange={onChangePicker}
            onChangeName={'onValueChange'}
            valueName={'selectedValue'}
            // defaultValue={(props.container.data.type || '')}
        /> */}
        
        <Text style={styles.label}>Slot</Text>
        <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                defaultValue={(props.container.data.slot || '').toString()}
                keyboardType={'numeric'}
              />
            )}
            defaultValue={(props.container.data.slot || '').toString()}
            name="slot"
            rules={{ required: '*Slot is required' }}
          />
          {errors?.slot?.type == 'required' && <Text style={{color: 'red'}}>{errors['slot'].message}</Text>}

        <Text style={styles.label}>Row</Text>
        <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                defaultValue={(props.container.data.row || '').toString()}
                keyboardType={'numeric'}
              />
            )}
            defaultValue={(props.container.data.row || '').toString()}
            name="row"
            rules={{ required: '*Row is required' }}
          />
          {errors?.row?.type == 'required' && <Text style={{color: 'red'}}>{errors['row'].message}</Text>}

        <Text style={styles.label}>Tier</Text>
        <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                defaultValue={(props.container.data.tier || '').toString()}
                keyboardType={'numeric'}
              />
            )}
            defaultValue={(props.container.data.tier || '').toString()}
            name="tier"
            rules={{ required: '*Tier is required' }}
          />
          {errors?.tier?.type == 'required' && <Text style={{color: 'red'}}>{errors['tier'].message}</Text>}
    
          <View style={styles.button}>
            <Button
              primary
              title="Submit"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        color: 'black',
        margin: 20,
        marginLeft: 0,
      },
      button: {
        marginTop: 40,
        marginBottom: 20,
        color: 'white',
        height: 40,
        borderRadius: 4,
      },
      container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#ebebeb',
      },
      input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 4,
      },
})

const mapStateToProps = (state) => {
    const { container } = state;
    return {
        container: container || {},
    };
};

const mapToDispatchToProps = (dispatch) => bindActionCreators({
    getContainerById: container => actions.getContainerById(container),
    resetContainer: () => dispatch(actions.resetContainer())
}, dispatch)

export default connect(mapStateToProps, mapToDispatchToProps)(ContainerForm);