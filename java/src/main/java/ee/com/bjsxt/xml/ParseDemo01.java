package ee.com.bjsxt.xml;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.SAXException;

public class ParseDemo01 {

	/**
	 * @param args
	 * @throws SAXException 
	 * @throws ParserConfigurationException 
	 * @throws IOException 
	 */
	public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {
		//
		SAXParserFactory factory=SAXParserFactory.newInstance();
		//
		SAXParser parse =factory.newSAXParser();
		//
		//
		PersonHandler handler=new PersonHandler();
		parse.parse(Thread.currentThread().getContextClassLoader()
				.getResourceAsStream("com/bjsxt/xml/person.xml")
				,handler );
		
		List<Person> persons =handler.getPersons();
		for(Person p:persons){
			System.out.println(p.getName()+"-->"+p.getAge());
		}
		
	}

}
