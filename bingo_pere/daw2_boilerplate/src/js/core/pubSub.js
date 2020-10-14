/*
 * Publish/Subscribe Pattern
 */
export class PubSub {
    constructor() {
      this.handlers = [];
    }
    
    subscribe(event, handler, context) {
      if (typeof context === 'undefined') { context = handler; }
      this.handlers.push({ event: event, handler: handler.bind(context) });
    }

    unsubscribe(event) {
      console.log(event);

      //lo que hacemos es un splice al index que sea de ese evento.
      this.handlers.splice(this.handlers.findIndex(e => e.event == event),1);
// console.log(this.handlers.findIndex(e => e.event === event));
      // this.handlers.forEach(function(event2,index){
      //   // console.log(event2['event']);
      //   // console.log("EVENT"+ event);
      //   if(event==event2['event']){
      //     console.log("dentro if");
      //     this.handlers.splice(index);
      //     console.log(this.handlers);
      //   }
      // });
      // this.handlers.map(function(event2,index){

      // })
      console.log(this.handlers);
    }
  
    publish(event, args) {
      this.handlers.forEach(topic => {
        if (topic.event === event) {
          topic.handler(args)
        }
      })
    }
  }