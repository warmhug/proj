var $ref = falcor.Model.ref;
var model = new falcor.Model({cache:{
    todos: [
        $ref('todosById[79]'),
        $ref('todosById[99]')
    ],
    todosById: {
        "99": {
            name: 'deliver pizza',
            done: false,
            priority: 4,
            customer: {
                $type: 'atom',
                value: {
                    name: 'Jim Hobart',
                    address: '123 pacifica ave., CA, US'
                },
                // this customer object expires in 30 minutes.
                $expires: -30 * 60 * 1000
            },
            prerequisites: [$ref('todosById[79]')]
        },
        "79": {
            $type: 'error',
            value: 'error retrieving todo from database.'
        }
    }
}});
var log = function(x) { console.log(x); };
model.getValue("todos[1].customer").then(log);
