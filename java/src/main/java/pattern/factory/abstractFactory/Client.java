package pattern.factory.abstractFactory;

public class Client {

	public static void main(String[] args) {
		CarFactory  factory = new LuxuryCarFactory();
		Engine e = factory.createEngine();
		e.run();
		e.start();


	}
}
