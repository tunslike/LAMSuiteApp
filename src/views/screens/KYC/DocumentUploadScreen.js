import React, {useState, useCallback, useEffect, useContext} from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, Button,
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';
  import DocumentPicker from "react-native-document-picker"
  import { SelectList } from 'react-native-dropdown-select-list'
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { AccountSetupButton, Loader, FormButton,InnerHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener
} from '@rpldy/native-uploady';

const DocumentUploadScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false)


  const Upload = () => {
    
    const [uploadUrl, setUploadUrl] = useState(false);
    const uploadyContext = useContext(UploadyContext);
  
    useItemFinishListener((item) => {
      const response = JSON.parse(item.uploadResponse.data);
      console.log(`item ${item.id} finished uploading, response was: `, response);
      setUploadUrl(response.url);
    });
  
    useItemErrorListener((item) => {
      console.log(`item ${item.id} upload error !!!! `, item);
    });
  
    useItemStartListener((item) => {
      console.log(`item ${item.id} starting to upload,name = ${item.file.name}`);
    });
  
    const pickFile = useCallback(async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
  
        uploadyContext.upload(res);
        
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log("User cancelled the picker, exit any dialogs or menus and move on");
        } else {
          throw err;
        }
      }
    }, [uploadyContext]);
  
    return (
      <View>
        <Button title="Choose File" onPress={pickFile} />
        {uploadUrl && <Image source={{ uri: uploadUrl }} style={styles.uploadedImage} />}
      </View>
    );
  };


  //USE EFFECT
  useEffect(() => {
     
  }, []);

  return (
    <NativeUploady
        destination={{ url: "http://localhost:8082/api/v1/customer/uploadDocuments" }}
    >
    <ScrollView style={styles.container}>

    <InnerHeader onPress={() => navigation.goBack()} title="Upload Documents" />

    {isLoading &&
      <Loader title="Processing your request, please wait..." />
    }

      <View style={styles.whiteBG}> 

      <View style={styles.title}>
      <Text style={styles.titleDesc}>Tap below to upload each of the documents</Text>
    </View>


  <AccountSetupButton 
    label="Proof of Address"
    icon={icons.docUpload}
  />

  <Upload />

  {/**
<AccountSetupButton 
    label="Means of Identification"
    onPress={() => handlePicker(1)}
    icon={icons.docUpload}
/>

<AccountSetupButton 
    label="Work ID Card"
    onPress={() => handlePicker(1)}
    icon={icons.docUpload}
/>

<AccountSetupButton 
    label="Employment Letter"
    onPress={() => handlePicker(1)}
    icon={icons.docUpload}
/>

<AccountSetupButton 
    label="Passport photograph"
    onPress={() => handlePicker(1)}
    icon={icons.docUpload}
/>
 */}

    </View>

    <View style={styles.btnBox}>
    <FormButton label="Save and Continue" />
    </View>

    </ScrollView>
    </NativeUploady>
  )
}

const styles = StyleSheet.create({
  titleDesc: {
    marginLeft: wp(3),
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      width: wp(70),
      lineHeight: wp(5),
      marginBottom: wp(3),
      color: COLORS.primaryRed,
  },
mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.3),
    color: COLORS.primaryBlue,
  },
  title: {
    marginVertical: hp(2)
  },
  btnBox: {
    marginVertical: wp(10)
},
  whiteBG: {
    backgroundColor: COLORS.White,
    padding: wp(4),
    borderRadius: wp(8),
    marginTop: hp(3),
    paddingBottom: wp(8),
    marginHorizontal:wp(4)
  },
  logo: {
    marginTop: hp(10),
    marginHorizontal: wp(4)
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BackgroundGrey
  }
})

export default DocumentUploadScreen