package pattern.builder;

public class Client {
	public static void main(String[] args) {

		AirShipDirector director = new SxtAirshipDirector(new SxtAirShipBuilder());

		AirShip ship = director.directAirShip();

		System.out.println(ship.getEngine().getName());

		ship.launch();

	}
}
