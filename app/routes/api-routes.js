// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    // 4. GET (/api/:user/cluenum) | Return a JSON that specifies "which clue" the user is currently seeking
    app.get("/api/:user/cluenum", function(req, res) {
        // grab userID from the route
        var userID = req.params.user;
        // run orm function to grab the user's database entry which has the current clue they are on. Then returns json.
        orm.findClueNum(userID);
        res.json("something goes here");
    });
                                                    // ================= EXAMPLE =====================
                                                    // {
                                                    //     user_id: 12121313,
                                                    //     next_clue: 3,
                                                    //     next_clue_location: {
                                                    //         lat: 23,
                                                    //         lng: 12    
                                                    //     },
                                                    //     clue_message: "Find me at the club"
                                                    // }

                                                    // Extra logic in here to handle if the next_clue is 999, in which case the user "Wins".
                                                    // =====================================

    // 5. POST (/api/clue_location) | User sends the server their current location + clue_number like the below:
    app.post("/api/clue_location", function(req, res) {
        // runs orm function to check how far the user is from the current goal location.
        orm.checkDist(userClue);
        res.json(userClue);
    });
                                                    // {
                                                    //     clue_num: 3,
                                                    //     user_current_location: {
                                                    //         lat: 41
                                                    //         lng: 21
                                                    //     }
                                                    // } 

                                                    // Server return a JSON that says below (inside route exists the logic to calculate the distance)

                                                    // { 
                                                    //     user_current_location: {
                                                    //         lat: 41
                                                    //         lng: 21
                                                    //     },

                                                    //     clue_location: {
                                                    //         lat: 23,
                                                    //         lng: 12
                                                    //     },

                                                    //     distance: 212
                                                    // }

                                                    // If distance = 20 then change the user table and do some crazy stuff like redirect the user.

                                                // --------------------------

                                                // USERS_TABLE
                                                // USER_ID (FB) | Real Name | CLUE_NUM 
                                                // 1231312     | Ahmed Haque | 1 

                                                // CLUE_LOCATION_TABLE
                                                // CLUE_NUM    | LAT   | LNG   | MESSAGE
                                                // 1           | 23    | 12    | "Find me at the club"

                                                // */  


};
