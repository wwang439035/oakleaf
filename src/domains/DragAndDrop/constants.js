export const TYPE_BASIC = 'Basic';
export const TYPE_ADVANCED = 'Advanced';

export const ITEM_TYPES = {
    CARD: 'card'
}

export const cardItems = [{
    id: "1001",
    name: "City",
    value: ["San Francisco", "Miami", "Fremont", "San Jose", "San Mateo"].sort(),
    type: TYPE_BASIC
}, {
    id: "1002",
    name: "State",
    value: ["California", "Florida", "New York", "Washington", "Texas"].sort(),
    type: TYPE_BASIC
}, {
    id: "1003",
    name: "Industry",
    value: ["Technology", "Health Care", "Transportation", "Education", "Construction"].sort(),
    type: TYPE_BASIC
}, {
    id: "1004",
    name: "Zipcode",
    value: "",
    type: TYPE_ADVANCED,
    items: [{
        id: "2001",
        name: "Field 1",
        value: ""
    }, {
        id: "2002",
        name: "Field 2",
        value: ""
    }, {
        id: "2003",
        name: "Field 3",
        value: ""
    }]
}, {
    id: "1005",
    name: "Phone",
    value: "",
    type: TYPE_ADVANCED,
    items: [{
        id: "2004",
        name: "Field A",
        value: ""
    }, {
        id: "2005",
        name: "Field B",
        value: ""
    }, {
        id: "2006",
        name: "Field C",
        value: ""
    }]
}];

