import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { authContext } from "../Login/UserContextProvider";

const AccountSettings = () => {
  const { userAuth, updateUserAction } = useContext(authContext);
  const navigation = useNavigation();

  const [active, setActive] = useState("");
  const [isEditProfileMode, setIsEditProfileMode] = useState(false);
  const [isEditPasswordMode, setIsEditPasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const handlePress = (index) => {
    setActive(index);
    if (index == 1) {
      setIsEditProfileMode(false);
    } else {
      setIsEditPasswordMode(false);
    }
  };
  const handleProfileEditPress = () => {
    setIsEditProfileMode(true);
  };
  const handleProfileCancelPress = () => {
    setIsEditProfileMode(false);
  };

  const handlePasswordEditPress = () => {
    setIsEditPasswordMode(true);
  };
  const handlePasswordCancelPress = () => {
    setIsEditPasswordMode(false);
  };
  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumberString;
  };
  const handleInputChange = (field, value) => {
    if (field === "phone") {
      const formattedValue = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [field]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (formData.password != formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (formData.phone.length > 0 && formData.phone.length < 10) {
      alert("Invalid Phone Number");
      return;
    }
    // Perform form submission
    const submit = updateUserAction(formData);
    setIsEditProfileMode(false);
    setIsEditPasswordMode(false);
  };
  const header = (content, index, isActive, sections) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>{sections[index]}</Text>
        <FontAwesomeIcon
          icon={isActive ? faChevronDown : faChevronRight}
          color="#fff"
        />
      </View>
    );
  };
  const content = (content, index, isActive, sections) => {
    return (
      <>
        {index == 0 && (
          <View style={styles.editProfileContainer}>
            <View style={styles.editProfileHeader}>
              <Text style={styles.editProfileHeaderTitle}>
                Personal Details
              </Text>
              <TouchableOpacity
                onPress={handleProfileEditPress}
                style={styles.touchableOpacity}
              >
                <Text style={styles.editProfileHeaderEditButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dataFieldsContainer}>
              <View style={styles.dataFieldContainer}>
                <Text style={styles.dataFieldTitle}>Name</Text>
                {isEditProfileMode ? (
                  <TextInput
                    style={styles.dataFieldInput}
                    placeholder={userAuth?.firstName + " " + userAuth?.lastName}
                    placeholderTextColor={"#888"}
                    keyboardAppearance="dark"
                    value={formData.name}
                    onChangeText={(text) => {
                      handleInputChange("name", text);
                    }}
                  />
                ) : (
                  <Text style={styles.dataFieldText}>
                    {userAuth?.firstName + " " + userAuth?.lastName}
                  </Text>
                )}
              </View>

              <View style={styles.dataFieldContainer}>
                <Text style={styles.dataFieldTitle}>Phone</Text>
                {isEditProfileMode ? (
                  <TextInput
                    style={styles.dataFieldInput}
                    placeholder={userAuth?.phone}
                    placeholderTextColor={"#888"}
                    keyboardAppearance="dark"
                    value={formData.phone}
                    onChangeText={(text) => {
                      handleInputChange("phone", text);
                    }}
                  />
                ) : (
                  <Text style={styles.dataFieldText}>{userAuth?.phone}</Text>
                )}
              </View>
            </View>
            {isEditProfileMode && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={handleProfileCancelPress}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        {index == 1 && (
          <View style={styles.editProfileContainer}>
            <View style={styles.editProfileHeader}>
              <Text style={styles.editProfileHeaderTitle}>Edit Password</Text>
              <TouchableOpacity
                onPress={handlePasswordEditPress}
                style={styles.touchableOpacity}
              >
                <Text style={styles.editProfileHeaderEditButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dataFieldsContainer}>
              <View style={styles.dataFieldContainer}>
                <Text style={styles.dataFieldTitle}>
                  {isEditPasswordMode ? "New Password" : "Password"}
                </Text>
                {isEditPasswordMode ? (
                  <TextInput
                    style={styles.dataFieldInput}
                    placeholder="••••••••"
                    placeholderTextColor={"#888"}
                    keyboardAppearance="dark"
                    value={formData.password}
                    onChangeText={(text) => {
                      handleInputChange("password", text);
                    }}
                  />
                ) : (
                  <Text style={styles.dataFieldText}>••••••••</Text>
                )}
              </View>
              {isEditPasswordMode && (
                <View style={styles.dataFieldContainer}>
                  <Text style={styles.dataFieldTitle}>
                    Confirm New Password
                  </Text>
                  {isEditPasswordMode ? (
                    <TextInput
                      style={styles.dataFieldInput}
                      placeholder="••••••••"
                      placeholderTextColor={"#888"}
                      keyboardAppearance="dark"
                      value={formData.confirmPassword}
                      onChangeText={(text) => {
                        handleInputChange("confirmPassword", text);
                      }}
                    />
                  ) : (
                    <Text style={styles.dataFieldText}>••••••••</Text>
                  )}
                </View>
              )}
            </View>
            {isEditPasswordMode && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={handlePasswordCancelPress}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </>
    );
  };
  return (
    <>
      <Accordion
        activeSections={active}
        sections={["Edit Profile ", "Change Password"]}
        renderHeader={header}
        renderContent={content}
        onChange={handlePress}
        containerStyle={styles.container}
        underlayColor="rgba(25, 25, 25, 1)"
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(25, 25, 25, 1)",
    paddingHorizontal: 20,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  sectionText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },
  editProfileContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(25, 25, 25, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: -1, // This creates the shadow at the bottom
    },
    shadowOpacity: 0.3, // You can adjust the opacity of the shadow if needed
    shadowRadius: 3,

    marginVertical: 1, // Add some margin at the bottom to separate it from other elements
  },
  editProfileHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  editProfileHeaderTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#fff",
  },
  editProfileHeaderEditButtonText: {
    color: "#0466c8",
    fontWeight: "700",
    fontSize: 15,
  },

  dataFieldContainer: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  dataFieldTitle: {
    fontWeight: "700",
    color: "#fff",
    paddingBottom: 5,
    fontSize: 18,
  },
  dataFieldInput: {
    textAlign: "left",
    width: "100%",
    fontWeight: "700",
    backgroundColor: "rgba(25, 25, 25, 1)",
    color: "#fff",

    height: 25,
    paddingHorizontal: 5,
    fontSize: 15,
    borderBottomWidth: 0.5,
    borderColor: "#fff",
  },
  dataFieldText: {
    textAlign: "left",
    width: "100%",
    fontWeight: "700",
    fontSize: 15,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
  },
  saveButtonText: {
    color: "#0466c8",
    fontWeight: "900",
  },
  cancelButtonText: {
    fontWeight: "900",
    color: "#777",
  },
  touchableOpacity: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});
export default AccountSettings;
