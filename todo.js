class Todo{

    static PRIORITY = {
      low: { order: 0, name: 'bassa' ,color: 'green'},
      medium: { order: 1, name: 'media', color: 'yellow' },
      high: { order: 2, name: 'alta', color: 'orange' },
      veryHigh: { order: 3, name: 'molto alta', color: 'red' }
    }
  
    constructor(name, tags = [], creationDate = new Date(), priority = Todo.PRIORITY.low){
      this.name = name;
      this.tags = tags;
      this._creationDate = creationDate.getTime();
      this.priority = priority;
    }
  
    get creationDate(){
      return new Date(this._creationDate);
    }
  
    set creationDate(date){
      this._creationDate = date.getTime();
    }
  
    static fromDbObj(obj){
      const todo = new Todo(obj.name, obj.tags, new Date(obj.creationDate * 1000));
      todo.id = obj.id;
      if (obj.priority === 1) {
        todo.priority = Todo.PRIORITY.medium;
      } else if (obj.priority === 2) {
        todo.priority = Todo.PRIORITY.high;
      } else if (obj.priority === 3) {
        todo.priority = Todo.PRIORITY.veryHigh;
      }
      return todo;
    }
  }