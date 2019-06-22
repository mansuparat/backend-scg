'use strict'
const Env = use('Env')
const googleMapsClient = require('@google/maps').createClient({
    key: Env.get('GOOGLE_MAP_KEY'),
    Promise: Promise
  });

class ScgController {

    async find_sequence({ response, params }) {
        var array_sequence = ["3", "5", "9" , "15" , "X" , "Y" , "Z"];
        var tmp_array = 0;
        try {
            var result = 0;
            for(var i = 0 ; i < array_sequence.length; i++)
            {
                if(isNaN(parseInt(array_sequence[i])))
                {
                    result = tmp_array + (2*i)
                    tmp_array = result
                    array_sequence[i] = result
                }
                else
                {
                    tmp_array = parseInt(array_sequence[i])
                    array_sequence[i] = parseInt(array_sequence[i])
                }
            }
            return array_sequence;
        } catch (error) {
            return response
                .status(404)
                .send({
                    error: '404 Not Found!',
                    message: error
                })
        }

    }


    async google_map({ response, params }) {
        var searchWord = 'Bangsue area'
        var result = [];
        var latlng = [];
        try {
              await googleMapsClient.geocode({address: searchWord})
                .asPromise()
                .then((response) => {
                    latlng = response.json.results[0].geometry.location
                })
                .catch((err) => {
                    
                  console.log(err);
                });

                await googleMapsClient.placesNearby({location: latlng,rankby: "distance",type: "restaurant"})
                .asPromise()
                .then((response) => {
                    result = response.json.results
                    
                })
                .catch((err) => {
                    
                  console.log(err);
                });

                return result

        } catch (error) {
            return response
                .status(404)
                .send({
                    error: '404 Not Found!',
                    message: error
                })
        }

    }
}

module.exports = ScgController
