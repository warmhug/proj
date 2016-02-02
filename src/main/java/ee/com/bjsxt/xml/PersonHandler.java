package ee.com.bjsxt.xml;

import java.util.ArrayList;
import java.util.List;

import ee.com.bjsxt.xml.Person;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class PersonHandler extends DefaultHandler {
	private List<Person> persons;
	private Person person;
	private String tag;
	@Override
	public void startDocument() throws SAXException {
		// TODO Auto-generated method stub
		persons =new ArrayList<Person>();
	}
	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		if(null!=qName){
			tag=qName;
		}
		if(null!=qName &&qName.equals("person")){
			person =new Person();
		}
	}

	
	
	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		String str =new String(ch,start,length);
		if(null!=tag &&tag.equals("name")){
			person.setName(str);
		}else if(null!=tag &&tag.equals("age")){
			Integer age = Integer.valueOf(str);
			person.setAge(age);
		}
	}
	
	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		if(qName.equals("person")){
			this.persons.add(person);
		}
		tag =null;
	}
	
	@Override
	public void endDocument() throws SAXException {

	}
	public List<Person> getPersons() {
		return persons;
	}
	public void setPersons(List<Person> persons) {
		this.persons = persons;
	}

}
