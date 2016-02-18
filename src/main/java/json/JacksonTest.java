package json;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by hua on 16/2/18.
 */
@JsonSerialize
class MyCls {
    private final int offset;
    private final int size;
    private final Object[] array;

    @JsonCreator
    private MyCls(Object... array) {
        this(array, 0, array.length);
    }
    private MyCls(Object[] array, int offset, int size) {
        this.offset = offset;
        this.size = size;
        this.array = array;
    }
}
public class JacksonTest {
    public static void main(String[] args) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<MyCls> list = Arrays.asList(mapper.readValue("[[\"todos\",{\"from\":0,\"to\":5},\"name\"]]", MyCls.class));
    }
}

