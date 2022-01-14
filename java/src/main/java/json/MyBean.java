package json;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * Jackson example
 */

// means that if we see "foo" or "bar" in JSON, they will be quietly skipped
// regardless of whether POJO has such properties
@JsonIgnoreProperties({ "foo", "bar" })
public class MyBean {
    private String _name;
    private int _code;

    // without annotation, we'd get "theName", but we want "name":
    @JsonProperty("name")
    public String getTheName() { return _name; }

    // note: it is enough to add annotation on just getter OR setter;
    // so we can omit it here
    public void setTheName(String n) { _name = n; }

    // will not be written as JSON; nor assigned from JSON:
    @JsonIgnore
    public String internal;

    // no annotation, public field is read/written normally
    public String external;

    @JsonIgnore
    public void setCode(int c) { _code = c; }

    // note: will also be ignored because setter has annotation!
    public int getCode() { return _code; }
}
