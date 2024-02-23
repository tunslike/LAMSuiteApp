import React, {useState, useEffect} from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  ScrollView,
  View, 
  Alert,
  Dimensions} from 'react-native';
  import { Formik } from 'formik';
  import * as Yup from 'yup';
  import axios from 'axios';
  import { useSelector, useDispatch } from 'react-redux';
  import { updateBankAccountID } from '../../../store/customerSlice';
  import SelectDropdown from 'react-native-select-dropdown';
  import { COLORS, images, FONTS, icons, AppName, APIBaseUrl } from '../../../constants';
  import { InnerHeader, Loader, BiodataTextbox, BankAccountNumberCard } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const bankList = ["Stanbic IBTC Bank", "GTBank", "First Bank"];

  const AccountNumberScheme = Yup.object().shape({
    accountNumber: Yup.string()
      .min(10, 'Account number must be 10 digits')
      .max(10, 'Account number must be 10 digits')
      .matches(/^[0-9]+$/, 'Account number must be numeric')
      .required('Account number is required')
  })


const DisbursementAccount = ({navigation}) => {

  const dispatch = useDispatch();
  const customerID = useSelector((state) => state.customer.customerData.customer_ENTRY_ID);

  const [bankName, setBankName] = useState('');
  const [addAccount, setAddAccount] = useState(false);
  const [activeAccount, setActiveAccount] = useState(0);
  const [accountList, setAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [activeAccountID, setActiveAccountID] = useState('');

  // check selected account
  const setUpdateAccountNumber = (accountID) => {
  
      dispatch(updateBankAccountID(accountID))
  }

    //validate account number
    const checkAccountValue = (values) => {

      if(bankName == '') {
        Alert.alert(AppName.AppName,"Please select bank name!")
        return;
      }
      
      Alert.alert(AppName.AppName, 'Do you want to save account details?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => addCustomerDetails(values)},
      ]);
  
    }

  // function to verify data
  const addCustomerDetails = (values) => {

    //data
    const data = {
      customerID : customerID,
      bankName: bankName,
      "bankID" : "051",
      accountNumber : values.accountNumber,
      "accountName": "Babatunde Jinadu"
    }

    console.log(data);

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'loanService/createAccountDetails',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)
        
        if(response.data.responseCode == 200) {

          setBankName('')
          Alert.alert(AppName.AppName, "Account details has been saved!")
          

        }else{

          Alert.alert('Oops! Unable to process your request, please try again')

        }

      })
      .catch(error => {
        console.log(error);
      });

  }
  // end of function 

// function to get the masking the given string
function maskAccount(str, start, end) {
  if (!str || start < 0 || start >= str.length || end < 0 || end > str.length || start >= end) {
     return str;
  }
  const maskLength = end - start;
  const maskedStr = str.substring(0, start) + "*".repeat(maskLength) + str.substring(end);
  return maskedStr;
}

  // function to verify data
  const loanCustomerDetails = () => {

    //data
    const data = {
      "CustomerID" : "f1f694e7-6f21-466d-a108-6a1b63cb8061"
    }

    setIsLoading(true);

      axios.post(APIBaseUrl.developmentUrl + 'loanService/fetchAccountDetails',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8082'
        }
      })
      .then(response => {

        setIsLoading(false)

        setAccountList(response.data)

      })
      .catch(error => {
        console.log(error);
      });

  }
  // end of function 

      //USE EFFECT
      useEffect(() => {

        loanCustomerDetails();
     
      }, []);

  const showAddAccount = () => {
    if(addAccount) {
      setAddAccount(false);
    }else if(!addAccount) {
      setAddAccount(true)
    }
  }

  // toggle add account
  const toggleAddAccount = (account) => {
    setActiveAccount(account)
  }

  return (
    <ScrollView style={{
      flexGrow: 1,
      backgroundColor: COLORS.BackgroundGrey
    }}>


    {isLoading &&
      <Loader title="Processing your request, please wait..." />
    }

    <InnerHeader onPress={() => navigation.goBack()} title="Disbursement Account" />

    <View style={styles.midBody}>
    <View style={{paddingHorizontal: wp(4), paddingVertical: wp(7)}}>
    <Text style={styles.loanSummaryTxt}>Available Accounts</Text>
    {(accountList == '') &&
        <Text style={styles.infotxt}>You do not have any disbursement account setup, create one below</Text>
    }

    {(accountList != '') &&
        <Text style={styles.infotxt}>Select your preferred destination account below</Text>
    }
    
    </View>

    <View style={styles.accountList}>

    {accountList.map((account) => {
      return (
        <BankAccountNumberCard key={account.bank_ACCOUNT_ID}
        onPress={() => setUpdateAccountNumber(account.bank_ACCOUNT_ID)} 
        bankName={account.bank_NAME}
        accountNo={maskAccount(account.account_NUMBER, 2, 7)}
        active={(activeAccount == 1) ? true : null}
    />
      )
    })

    }
  
    </View> 

  
        <TouchableOpacity style={styles.addAccountButton}
          onPress={() => showAddAccount()}
        >
            <Text style={styles.addAcctxt}>Add Bank Account</Text>
            <Image source={icons.add} 
              style={{
                height: wp(2.5), width: wp(2.5), resizeMode: 'contain', tintColor: COLORS.TextColorGrey
              }}
            />
        </TouchableOpacity>


        {(addAccount) && 
        

<Formik
initialValues={{
  accountNumber: ''
}}
validationSchema={AccountNumberScheme}
onSubmit={values => checkAccountValue(values)}
>
{({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
        <View style={styles.addNewBox}>
            <Text style={styles.headertxt}>New Bank Account</Text>
            <View>
            <Text style={styles.dropDowntextLabel}>Bank Name</Text>
            <SelectDropdown 
            data={bankList}
            onSelect={(selectedItem, index) => {
              setBankName(selectedItem);
            }}
            defaultButtonText="Select or Search here"
            dropdownStyle={{
              borderRadius: wp(3),
            }}
            rowTextStyle={{
              fontFamily: FONTS.POPPINS_REGULAR,
              fontSize: wp(3.2),
            }}
            buttonStyle={{
              backgroundColor: COLORS.White,
              borderRadius: wp(3),
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: COLORS.TextBoxBorderGrey,
              width: '100%',
              height: wp(12),
              color: COLORS.sliderDescText
              
            }}
            buttonTextStyle={{
              fontFamily: FONTS.POPPINS_REGULAR,
              fontSize: wp(3.2),
              textAlign: 'left',
              color: COLORS.sliderDescText
            }}
          />

          <View style={{marginTop: wp(3), paddingRight: wp(1)}}>
          <BiodataTextbox 
          label="Bank Account Number"
          full={true}
          onChange={handleChange('accountNumber')}
          value={values.accountNumber}
          maxlength={10}
          /> 
          {errors.accountNumber && 
            <Text style={styles.errorLabel}>{errors.accountNumber}</Text>
          }
        </View>

        <TouchableOpacity
        onPress={handleSubmit}
        style={styles.continueBtn}>
            <Text style={styles.continueBtnTxt}>Add Account</Text>
</TouchableOpacity>   

            </View>

        </View>
)}
</Formik>
        
        
        }
    </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  errorLabel: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.7),
    color: COLORS.primaryRed,
    marginLeft: wp(3.5),
    marginTop: wp(2)
  },

  continueBtnTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.3),
    color: COLORS.White,
  },
  continueBtn: {
    marginTop: wp(7),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: wp(13),
    paddingVertical: wp(3.5),
    borderRadius: wp(4),
    marginBottom: wp(1),
  },

  dropDowntextLabel: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.2),
    color: COLORS.sliderDescText,
    marginLeft: wp(3),
    marginBottom: wp(1)
  },

  headertxt: {
    color: COLORS.primaryRed,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3),
    marginBottom: wp(4),
    marginLeft: wp(2)
  },
  addNewBox: {
    borderTopColor: COLORS.BackgroundGrey,
    borderTopWidth: 1,
    borderBottomColor: COLORS.BackgroundGrey,
    borderStyle: 'solid',
    paddingBottom: wp(4),
    paddingTop: wp(4),
    marginTop: wp(7),
    paddingHorizontal: wp(4)
  },
  addAcctxt: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3)
  },
  addAccountButton: {
    marginTop: wp(3),
    borderColor: COLORS.disablePrimaryBlue,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: wp(4),
    paddingHorizontal: wp(23),
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    columnGap: wp(2)
  },
  infotxt: {
    color: COLORS.TextColorGrey,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    marginTop: wp(0.3)
  },
  loanSummaryTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: '#160B53',
    marginBottom: wp(3)
  },
  midBody: {
    borderRadius: wp(8),
    marginHorizontal: wp(2),
    backgroundColor: COLORS.White,
    marginTop: wp(5),
    paddingBottom: wp(4),
    minHeight: wp(91)
  }
})

export default DisbursementAccount;