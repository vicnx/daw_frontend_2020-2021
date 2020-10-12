export let pubsub = (function(){
    let events = {};
    let hOP = events.hasOwnProperty;
  
    return {
      subscribe: function(event, listener) {
        // Create the event's object if not yet created
        if(!hOP.call(events, event)) events[event] = [];
  
        // Add the listener to queue
        let index = events[event].push(listener) -1;
  
        // Provide handle back for removal of event
        return {
          remove: function() {
            delete events[event][index];
          }
        };
      },
      publish: function(event, info) {
        // If the event doesn't exist, or there's no listeners in queue, just leave
        if(!hOP.call(events, event)) return;
  
        // Cycle through events queue, fire!
        events[event].forEach(function(item) {
                item(info != undefined ? info : {});
        });
      }
    };
  })();