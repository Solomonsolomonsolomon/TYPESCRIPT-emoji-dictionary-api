"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testApi = void 0;
const testApi = (req, res) => {
    res.send(`api status:ONLINE.
    You connected with ip ${req.ip} 
    ${new Date()}
    #DOCUMENTATION
    several routes are available
    / -this is test route 
    /emoji -gets all emojis
    /emoji/:_id -get details for a specific emoji by emoji _id
    /random/:number -returns n random emojis where n = number
    /search :POST -D search 
`);
};
exports.testApi = testApi;
//# sourceMappingURL=root.controller.js.map