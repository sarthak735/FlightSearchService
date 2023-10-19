const {FlightRepository, AirplaneRespository} = require('../repository/index');
const {compareTime} = require('../utils/helper');

class FlightService{

    constructor(){
        this.airplaneRepository = new AirplaneRespository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data){
        if(!compareTime(data.arrivalTime, data.departureTime)){
            throw{error: "departure time cannot be greater than arrival time"};
        }
        try {
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data, totalSeats:airplane.capacity})
            return flight;
        } catch (error) {
            console.log("Something went wrong at the service Layer");
            throw{error}
        }
    }
}

module.exports = FlightService;