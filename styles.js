module.exports = require('react-native').StyleSheet.create({
    "containersignin": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center",
        "backgroundColor": "transparent"
    },
    "container": {
        "flex": 1,
        "flexDirection": "column",
        "justifyContent": "flex-start",
        "alignItems": "stretch",
        "backgroundColor": "transparent",
        "margin": 20
    },
    "containerlist": {
        "flex": 4,
        "flexDirection": "row",
        "justifyContent": "center",
        "alignItems": "stretch",
        "backgroundColor": "transparent"
    },
    "welcome": {
        "fontSize": 25,
        "fontFamily": "AvenirNext-UltraLight",
        "textAlign": "center",
        "margin": 20,
        "backgroundColor": "rgba(245, 252, 255,0.1)"
    },
    "welcomecontainer": {"backgroundColor": "rgba(245, 252, 255,0.1)", "borderRadius": 5},
    "instructions": {"textAlign": "center", "fontSize": 15, "fontFamily": "AvenirNext-UltraLight"},
    "backdrop": {"height": 90, "width": 70},
    "rowcontainer": {
        "flex": 1,
        "maxWidth": 340,
        "minWidth": 320,
        "flexDirection": "column",
        "justifyContent": "center",
        "flexWrap": "wrap",
        "borderTopWidth": 1,
        "borderTopColor": "rgba(255,165,0, 0.7)"
    },
    "colcontainer": {
        "flex": 1,
        "flexDirection": "row",
        "justifyContent": "space-between",
        "margin": 2,
        "flexWrap": "wrap"
    },
    "vcol": {"flex": 1, "height": null, "fontFamily": "AvenirNext-Regular", "fontSize": 12, "padding": 5}
});