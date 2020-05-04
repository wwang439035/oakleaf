export const CARD_TYPES = {
    BASIC: 'basic',
    ADVANCED: 'advanced',
    IN_CONTAINER: 'in_container'
}

export const cardItems = [{
    id: "1001",
    name: "City",
    value: ["San Francisco", "Miami", "Fremont", "San Jose", "San Mateo"].sort(),
    type: CARD_TYPES.BASIC
}, {
    id: "1002",
    name: "State",
    value: ["California", "Florida", "New York", "Washington", "Texas"].sort(),
    type: CARD_TYPES.BASIC
}, {
    id: "1003",
    name: "Industry",
    value: ["Technology", "Health Care", "Transportation", "Education", "Construction"].sort(),
    type: CARD_TYPES.BASIC
}, {
    id: "1004",
    name: "Zipcode",
    value: ["94404", "94507"],
    type: CARD_TYPES.ADVANCED,
    fields: [{
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
    value: "650-123-4567",
    type: CARD_TYPES.ADVANCED,
    fields: [{
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
}, {
    id: "1006",
    name: "Country",
    value: ['USA', 'CHN', 'CAN', 'IND'],
    type: CARD_TYPES.ADVANCED,
    fields: [{
        id: "2005",
        name: "Field I",
        value: ""
    }, {
        id: "2006",
        name: "Field III",
        value: ""
    }, {
        id: "2007",
        name: "Field III",
        value: ""
    }]
}];

