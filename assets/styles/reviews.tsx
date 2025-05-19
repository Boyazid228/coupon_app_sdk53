import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',

    },
    cuponBox:{
        width: "90%",
        margin: "auto",
        marginTop: 0,
        marginBottom: 0,
        height: "auto"
    },
    review_box:{
        margin: 10,
        borderColor: '#adadad',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 5
    },
    review_title_box:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20
    },
    review_title:{
        fontSize: 24,
        marginBottom: 10

    },
    description:{
        marginBottom: 20,
        flexDirection: "row"
    },
    starts:{
    },
    title_box:{
        width: 150
    },
    add_rew:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
        paddingRight: 20
    },
    overlay:{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.64)',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        flexDirection: "column"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "column",
        width: '80%'

    },
    closeButton: {
        fontSize: 12,
        backgroundColor: "#0c6671",
        borderRadius:50,
        padding: 16,
        justifyContent:"center",
        alignItems: "center",
        marginHorizontal: 5,
        marginTop: 20,
        width: "100%",
    },
    modalText: {
        textAlign: 'center',
        color: "#fff"
    },
    input:{
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 50,
    },
    error:{
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    hide:{
        opacity: 0

    },
    show:{
        opacity: 1

    },
    searchButton: {
        fontSize: 12,
        backgroundColor: "#0c6671",
        borderRadius:10,
        padding: 10,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginTop: 20

    },
    searchButtonText:{

        color: "#fff",
        fontSize: 18
    },
    errorBox:{
        backgroundColor: 'rgba(250,63,63,0.31)',
        width: '100%',
        padding: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius:10,
        marginTop: 20,
        marginBottom: 20,
        minHeight: 50,
        justifyContent: "center",
        alignItems: "center"


    },
    errorBoxText:{

    },
    title:{
        textAlign: "center",
        fontSize: 26,
        marginBottom: 10
    },
    sub_title:{
        textAlign: "center",
        fontSize: 18,
        marginBottom: 20
    },
    inputBox:{
        marginTop: 10,
        width: "100%"
    },
    label:{
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "500"
    },
    img:{},
    text:{
        marginTop:5
    },
    close:{
        width: 24,
        height: 24
    },
    header:{
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        gap: 6
    },
    review_score:{
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        gap: 6,
        marginBottom: 20,
        marginTop: 16
    },






});

export default styles;