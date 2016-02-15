package pattern.builder;


public interface AirShipBuilder {
	Engine builderEngine();
	OrbitalModule builderOrbitalModule();
	EscapeTower  builderEscapeTower();
}
