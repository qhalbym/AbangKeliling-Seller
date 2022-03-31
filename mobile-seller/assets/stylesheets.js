import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const getWidth = (value) => (width * value) / 100;
const getHeight = (value) => (height * value) / 100;

const styles = StyleSheet.create({
  //Home Styles
  container: {
    marginTop: getHeight(8),
    // marginHorizontal: getWidth(2),
    marginBottom: getHeight(1),
    padding: 5,
    height: height,
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  homeHeader: {
    marginTop: getHeight(6),
    flexDirection: "row",
    height: getHeight(10),
    alignItems: "center",
  },
  homeHeaderLeft: {
    flexDirection: "row",
    width: getWidth(40),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  homeHeaderRight: {
    flexDirection: "row",
    width: getWidth(40),
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: getHeight(3),
  },
  homeHeaderIcons: {
    width: getWidth(5),
    height: getHeight(5),
    marginHorizontal: getWidth(2),
  },
  openClosedStatus: {
    backgroundColor: "#ffff",
    borderRadius: 50,
    borderColor: "#000",
    borderWidth: 1,
    alignItems: "center",
  },
  StatusDropDown: {
    width: getWidth(35),
    height: getHeight(5),
  },

  orderContainer: {
    justifyContent: "center",
    paddingTop: getWidth(10),
  },
  orderDetailText: {
    fontSize: getWidth(3),
    marginVertical: getHeight(0.5),
  },
  orderItems: {
    // flexDirection: "row",
    // justifyContent: "center",
    // marginHorizontal: 8,
    marginLeft: 8,

    width: getWidth(80),
    backgroundColor: "#eee",
    // padding: getWidth(2),
    // borderRadius: 5,
  },
  orderItemsComplete: {
    justifyContent: "center",
    marginLeft: 8,
    marginBottom: 5,
    width: getWidth(80),
    backgroundColor: "#eee",
    padding: getWidth(2),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  orderItemsOnGoing: {
    width: getWidth(75),
    backgroundColor: "#eee",
    marginLeft: 9,
    padding: getWidth(2),
    borderRadius: 5,
  },
  navigateMapButton: {
    width: getWidth(70),
    marginVertical: getHeight(5),
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  onGoingContainer: {
    backgroundColor: "#ffffff",
    // alignContent: "center",
    // justifyContent: "center",
  },

  //Auth Styles
  authContainer: {
    marginTop: getHeight(4),
    marginHorizontal: getWidth(2),
    marginBottom: getHeight(1),
    padding: 5,
    height: height,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  authHeading: {},
  authTitle: {
    fontWeight: "bold",
    fontSize: getWidth(10),
  },
  formLabel: {
    marginVertical: getHeight(2),
    fontWeight: "bold",
    fontSize: getWidth(5),
    marginLeft: getWidth(2),
  },
  formContainer: {
    marginTop: getHeight(5),
  },
  authInputForm: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: getWidth(80),
    borderRadius: 5,
    padding: getWidth(2),
    marginTop: 5,
  },
  authButton: {
    width: getWidth(80),
    marginVertical: getHeight(5),
    borderRadius: 5,
  },

  //transaction styles
  buttonSeeOnMap: {
    color: "blue",
  },
  cardContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    width: getWidth(88),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },

  //map styles
  mapContainer: {
    width: width,
    height: getHeight(110),
    backgroundColor: "#0000003F",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: getWidth(10),
  },
  mapModal: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: getWidth(5),
  },
  containerDropDown: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: getWidth(80),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  addProduk: {
    flexDirection: "row",
  },
  headerListProduct: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft:,
  },
  addProdukTitle: {
    marginRight: 170,
  },
  //waiting
  cardwaiting: {
    width: getWidth(85),
    borderColor: "gray",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 6,
  },
  contWaitingSeller: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waitingSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnCancel: {
    width: 70,
    textAlign: "center",
    backgroundColor: "#ffff",
    color: "#ef4444",
    borderColor: "#ef4444",
    borderWidth: 1.5,
    borderRadius: 5,
    fontWeight: "bold",
  },
  btnAccept: {
    width: 70,
    textAlign: "center",
    backgroundColor: "#4f46e5",
    color: "#ffff",
    borderColor: "#4f46e5",
    borderWidth: 1.5,
    borderRadius: 5,
    fontWeight: "bold",
  },
  logout: {
    color: "#64748b",
  },
  imageNoOrder: {
    width: 300,
    height: 300,
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  containerHistory: {
    backgroundColor: "#FFFFFF",
    marginTop: getHeight(8),
    // marginHorizontal: getWidth(2),
    marginBottom: getHeight(7),
    padding: 5,
    height: height,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  containerOngoing: {
    flex: 1,
    justifyContent: "center",
    height: getHeight(50),
    width: getWidth(80),
    marginHorizontal: getWidth(10),
    marginVertical: getWidth(30),
  },
  contTableHead: {
    flexDirection: "row",
  },
  tableHead: {
    marginRight: 20,
  },
  // dataTable: {
  //   fontSize: 1,
  //   // marginRight: 20,
  // },
});

export default styles;
