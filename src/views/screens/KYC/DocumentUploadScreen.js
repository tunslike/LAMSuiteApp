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
  import { AccountSetupButton, Loader, LoaderWindow, FormButton,InnerHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NativeUploady, {
  UploadyContext,
  useItemFinishListener,
  useItemStartListener,
  useItemErrorListener
} from '@rpldy/native-uploady';
import { updatePassportStatus, updateEmpLetterStatus, updateMeansidStatus } from '../../../store/customerSlice';

const DocumentUploadScreen = ({navigation, route}) => {

  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);
  const [loading, setLoading] = useState(false)
  const {doctype, header_desc} = route.params;

  const updateDocumentStatus = (doctype) => {

    switch(doctype) {
      case 'PASSPORT':
        dispatch(updatePassportStatus(1));
      break;
      case 'MEANS_OF_ID':
        dispatch(updateMeansidStatus(1));
      break;
      case 'EMPLOYMENT_LETTER':
        dispatch(updateEmpLetterStatus(1));
      break;
    }
  }

  const Upload = () => {
    
    const [uploadUrl, setUploadUrl] = useState(false);
    const uploadyContext = useContext(UploadyContext);
  
    useItemFinishListener((item) => {
      
        setLoading(false)
        console.log(`item ${item.id} finished uploading, response was: `, item);

        if(item.uploadResponse.data.responseCode == 200) {

          updateDocumentStatus(doctype);
        
          Alert.alert("Finserve", "Document was uploaded successfully!")
          navigation.goBack();

        }else{
          Alert.alert("Finserve", "Unable to process your request, please retry!")
        }

      //setUploadUrl(response.url);
    });
  
    useItemErrorListener((item) => {
      setLoading(false)
      console.log(`item ${item.id} upload error !!!! `, item);

      if(item.file.size > 1048576) {
        Alert.alert("Finserve", "Error: Image or document is too large, please retry!")
      }else{
        Alert.alert("Finserve", "Error: Unable to proceess your request, please try again!")
      }
     
    });
  
    useItemStartListener((item) => {
      console.log(`item ${item.id} starting to upload,name = ${item.file.name}`);
      setLoading(true)
    });
  
    const pickFile = useCallback(async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        }); //3022484699 POLARIS BANK
  
        uploadyContext.upload(res);
        
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log("User cancelled the picker, exit any dialogs or menus and move on");
        } else {
          throw "Unable to upload! File size must be less than 1 MB" + err;
        }
      }
    }, [uploadyContext]);
  
    return (
      <TouchableOpacity
        onPress={pickFile}
      >
        <Image 
          source={images.file_upload_pic} 
          style={{
            height: wp(50), width: wp(50), resizeMode: 'contain', borderRadius: wp(10),
            alignSelf: 'center'
          }}
        />
        <Text style={styles.bottonTxt}>Choose File</Text>
        {uploadUrl && <Image source={{ uri: uploadUrl }} style={styles.uploadedImage} />}
      </TouchableOpacity>
    );
  };

  return (
    <NativeUploady
        sendWithFormData={true}
        destination={{ url: APIBaseUrl.developmentUrl + "/customer/uploadDocuments", params: {"customerID" : customerData.customer_ENTRY_ID}, headers: { "x-doctype": doctype }}}
    >
    <ScrollView style={styles.container}>

    <InnerHeader onPress={() => navigation.goBack()} title={header_desc} />

    <LoaderWindow loading={loading} />

      <View style={styles.whiteBG}> 
        <Text style={styles.titleDesc}>Uploaded file must not be more than 1 MB</Text>
        <Upload />
      </View>

    </ScrollView>
    </NativeUploady>
  )
}

const styles = StyleSheet.create({
  bottonTxt: {
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.5),
      color: COLORS.primaryBlue,
      textAlign: 'center'
  },
  titleDesc: {
    marginLeft: wp(3),
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      lineHeight: wp(5),
      color: COLORS.primaryRed,
      textAlign: 'center'
  },
mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.3),
    color: COLORS.primaryBlue,
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