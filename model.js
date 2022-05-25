class Todo{

    static PRIORITY = {
      low: { order: 0, name: 'bassa' ,color: 'cadetblue'},
      medium: { order: 1, name: 'media', color: 'rgb(251, 239, 129)'},
      high: { order: 2, name: 'alta', color: 'lightsalmon' },
      veryHigh: { order: 3, name: 'molto alta', color: 'rgb(253, 98, 98)'}
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


    static orderToDoByPriority(t1, t2) {
      return t2.priority.order - t1.priority.order;
    }
  }
  